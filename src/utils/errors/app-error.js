class AppError extends Error{
    constructor(message,statusCode,name='AppError'){
        super(message);
        this.name = name;
        this.messageCode = statusCode;
        this.explanation = message;
    }
}
module.exports = AppError;