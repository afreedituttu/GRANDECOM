class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message); // calls the parent constructor ( Error(message) )
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;