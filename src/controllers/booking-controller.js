const BookingService = require('../services/booking-service');
const { StatusCodes } = require('http-status-codes');
const SuccessResponse = require('../utils/common/success-response');
async function createBooking(req,res){
    try{
        console.log(req.body);
        const booking = await BookingService.createBooking(req.body);
        SuccessResponse.data=booking;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message});
    }
}
module.exports = {createBooking};