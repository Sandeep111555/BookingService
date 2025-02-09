'use strict';
const {
  Model
} = require('sequelize');
const {BOOKED,INITIATED,PENDING,CANCELLED} = require('../utils/common/enums').BOOKING_STATUS;
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightId: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type:DataTypes.ENUM(BOOKED,INITIATED,PENDING,CANCELLED),
      allowNull: false,
      defaultValue:PENDING
    },
    noOfSeats: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    totalCost: 
    {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};