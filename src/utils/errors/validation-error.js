const { StatusCodes } = require('http-status-codes');
class ValidationError extends Error {
  constructor(error) {
    super();
    let explanation = [];
    error.errors.array.forEach(err => {
        explanation.push(err.message);
    });
    this.message = "Not able to validate the data sent in the request";
    this.name = 'ValidationError';
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.explanation = explanation;
  }
}
module.exports = ValidationError;