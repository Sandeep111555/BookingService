class ServiceError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "ServiceError";
    this.messageCode = statusCode;
    this.explanation = message; 
  }
}
module.exports = ServiceError;