class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.name = 'AppError';
        this.messageCode = statusCode;
        this.explanation = message;
    }
}
module.exports = AppError;