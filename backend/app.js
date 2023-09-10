const express = require('express');
const ErrorHandler = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({
        path:'./backend/config/.env'
    })
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(logger('dev'));
app.use("/", express.static("uploads"));

//import routes
const user = require('./controllers/user');

app.use('/api/v2/user', user);

// app.use(fileUpload({useTempFiles: true}))
// file for error handling
app.use(ErrorHandler);

module.exports = app;