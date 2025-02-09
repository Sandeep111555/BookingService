const {AppError,ValidationError,ServiceError} = require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const axios = require('axios');
const db = require('../models');
const { BookingRepository } = require('../repositories');
const bookingRepository = new BookingRepository();
async function createBooking(data){
    const transaction = await db.sequelize.transaction();
    try{
            const flight = await axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);
            if(!flight.data){
                throw new AppError('Flight not found',StatusCodes.NOT_FOUND);
            }
            const flightData = flight.data.data;
            if(flightData.seats<data.noOfSeats){
                throw new AppError('Not enough seats available',StatusCodes.BAD_REQUEST);
            }
            data.totalCost = flightData.price * data.noOfSeats;
            const booking = await bookingRepository.create(data,{transaction});
            await axios.patch(`http://localhost:3000/api/v1/flights/${data.flightId}`,{seats:data.noOfSeats});
            await transaction.commit();
            return booking;
        }
    catch(err){
        await transaction.rollback();
        if(err.name==="SequelizeValidationError"){
            throw new ValidationError(err);
        }
        throw new ServiceError("There was an error creating the booking",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {createBooking};