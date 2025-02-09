const CrudRepository = require('./crud-repository');
const {Booking} = require('../models');
const {AppError} = require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking);
    }
    async updateBooking(id,data,transaction) {
        try{
            console.log("inside update booking data{}: ",data,"id{}",id);
        const booking = await this.model.findByPk(id, transaction );
        console.log("booking",booking);
        if (!booking) {
            throw new AppError("Booking not found",StatusCodes.INTERNAL_SERVER_ERROR,"RepositoryError");
        }
        if (data.status) {
            booking.status = data.status;
        }
        await booking.save(transaction);
        console.log("booking",booking);
        return booking;
    }
    catch(error){
        console.log(error);
        throw new AppError("Error in updating booking",StatusCodes.INTERNAL_SERVER_ERROR,"RepositioryError");
    }
    }
}
module.exports = BookingRepository;