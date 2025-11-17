import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    roomType: { type: String, required: true },
    numPersons: { type: Number, required: true },
    price: { type: Number, required: true },
    roomStatus: { type: String, default: 'Available', enum: ['Available', 'Unavailable'] },
    bookingStatus: { type: String, default: 'Not Booked', enum: ['Not Booked', 'Booked'] },
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;
