const { StatusCodes } = require("http-status-codes");
const {ErrorResponse} = require('../utils/common');
const validateBooking = (req, res, next) => {
    const {flightId,userId,noOfSeats} = req.body;
    if(!flightId || !userId || !noOfSeats){
        ErrorResponse.message = "FlightId, userId and noOfSeats are required";
        return res.status(StatusCodes.BAD_REQUEST).json({ErrorResponse});
    }
    next();
}
module.exports = {validateBooking};