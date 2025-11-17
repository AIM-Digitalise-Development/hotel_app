import mongoose from 'mongoose';
import RoomEntry from './RoomEntry.js'

const bookingSchema = new mongoose.Schema({
  bookingId: { 
    type: String, 
    unique: true, 
    default: () => 'BID' + Date.now().toString(36) + Math.floor(Math.random() * 1000) 
  },
  guestDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  rooms: [
    {
      roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomEntry', required: true },
      price: { type: Number },
      days: { type: Number, required: true },
      totalAmount: { type: Number, required: true }
    }
  ],
  status: {
    type: String,
    enum: ['Booked','Available'],
    default: 'Booked'
  }, 
  totalAmount: { type: Number, required: true },
  gstAmount: { type: Number, required: true },
  totalAmountWithGST: { type: Number, required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
