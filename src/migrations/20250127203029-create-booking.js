'use strict';

const { all } = require('express/lib/application');
const {BOOKED,INITIATED,PENDING,CANCELLED} = require('../utils/common/enums').BOOKING_STATUS;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(BOOKED,INITIATED,PENDING,CANCELLED),
        allowNull: false,
        defaultValue: INITIATED
      },
      noOfSeats: {
        type: Sequelize.INTEGER
      },
      totalCost: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};