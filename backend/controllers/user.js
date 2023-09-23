const express = require('express');
const path = require('path');
const router = express.Router()
const upload = require('../utils/multer');
const User = require('../model/user');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwt');

router.post('/create-user', upload.single("file"), async(req, res, next)=>{
    const {name, password, email} = req.body;
    console.log(req.body);
    if(!name || !password || !email){
        return next(new ErrorHandler("Data incomplete"));
    }
    
    const userEmail = await User.findOne({email:email});

    if(userEmail){
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err)=>{
            if(err){
                console.log(err);
                res.status(500).json({message:"Error deleting file"});
            }else{
                res.json({message:"file deleted successfully"});
            }
        })
        return next(new ErrorHandler("User already exist", 400))
    }
    try{
        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        const avatar = fileUrl;

        const user = {
            name:name,
            password:password,
            email:email,
            avatar:avatar
        };

        const activationToken = createActivationToken(user);
        const activationUrl = `http://localhost:3000/activation/${activationToken}`;

        try{
            // await sendMail({
            //     email:user.email,
            //     subject:"Activate Your Account",
            //     message:`Hello ${user.name}, please click on the link to activate your account : ${activationUrl}`
            // })
            res.status(200).json({
                success:true,
                message:`Please check your email - ${user.email} to activate your account, activation url : ${activationUrl}`
            })
        }catch(error){
            return next(new ErrorHandler(error.message, 500));
        }
    }catch(error){
        return next(new ErrorHandler(error.message), 400);
    }
});

const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET,{
        expiresIn:"5m",
    })
}

router.post('/activation', catchAsyncError(async(req, res, next)=>{
    console.log("came");
    try{
        const {activation_token} = req.body;

        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

        if(!newUser){
            return next(new ErrorHandler('Invalid Token', 400));
        }

        const {name, email, password, avatar} = newUser;
        
        const userEmail = await User.findOne({email:email});
        
        if(userEmail){
            return next(new ErrorHandler("User already exist", 400))
        }

        const userM = User({
            name:name,
            email:email,
            password:password,
            avatar:avatar
        })

        const user = await userM.save()
        console.log(userM);
        
        sendToken(user, 200, res)
    }catch(error){
        console.log(error);
        return next(new ErrorHandler("No Token", 404));
    }
}))

router.post('/login-user', catchAsyncError(async(req, res, next)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return next(new ErrorHandler("Please provide the all fields", 400));
        }
        const user = await User.findOne({email:email}).select("+password")

        if(!user){
            return next(new ErrorHandler("User already exist", 400))
        }

        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid){
            return next(new ErrorHandler("Please provide the correct information"), 500);
        }

        sendToken(user, 201, res);
    }catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
}))



module.exports = router