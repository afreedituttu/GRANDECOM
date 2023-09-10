const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DATABASE CONNECTED');
}).catch((err)=>{
    return console.log(err);
})

module.exports = mongoose;