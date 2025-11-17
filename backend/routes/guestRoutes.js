import express from 'express';
import { addGuest, getGuestsByBookingId } from '../controllers/guestController.js';

const router = express.Router();

// Route to add a guest to a booking
router.post('/add-guest', addGuest);

// Route to get all guests for a specific booking
router.get('/guests/:bookingId', getGuestsByBookingId);

export default router;
