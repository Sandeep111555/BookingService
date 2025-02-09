const {AppError,ValidationError,ServiceError} = require('../utils/errors');
const {ServerConfig} = require('../config')
const { StatusCodes } = require('http-status-codes');
const axios = require('axios');
const db = require('../models');
const { BookingRepository } = require('../repositories');
const serverConfig = require('../config/server-config');
const { Enums } = require('../utils/common');
const bookingRepository = new BookingRepository();
async function createBooking(data){
    const transaction = await db.sequelize.transaction();
    try{
            const flight = await axios.get(`${serverConfig.FLIGHT_SERVICE_PATH}/api/v1/flights/${data.flightId}`);
            if(!flight.data){
                throw new AppError('Flight not found',StatusCodes.NOT_FOUND);
            }
            const flightData = flight.data.data;
            if(flightData.seats<data.noOfSeats){
                throw new AppError('Not enough seats available',StatusCodes.BAD_REQUEST);
            }
            data.totalCost = flightData.price * data.noOfSeats;
            const booking = await bookingRepository.create(data,{transaction});
            await axios.patch(`${serverConfig.FLIGHT_SERVICE_PATH}/api/v1/flights/${data.flightId}`,{seats:data.noOfSeats});
            data.status = Enums.BOOKING_STATUS.BOOKED;
            const newBooking = await bookingRepository.updateBooking(booking.id,data,{transaction});
            await transaction.commit();
            return newBooking;
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