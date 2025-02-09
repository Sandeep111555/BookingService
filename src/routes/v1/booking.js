const express = require('express');
const { BookingController } = require('../../controllers');
const { BookingMiddleware } = require('../../middlewares');
router = express.Router();
router.post('/',BookingMiddleware.validateBooking, BookingController.createBooking);
module.exports = router;