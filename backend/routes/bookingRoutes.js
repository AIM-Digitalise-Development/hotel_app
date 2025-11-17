import express from 'express';
import { createBooking, getAllBookings, getBookingById } from '../controllers/bookingController.js';

const router = express.Router();

// Route for creating a new booking
router.post('/create', createBooking);

// Route for getting all bookings
router.get('/', getAllBookings);

// Route for getting a specific booking by ID
router.get('/:id', getBookingById);

export default router;
