import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  aadhaarCard: { type: String, required: true, unique: true },
  bookingDetails: {
    roomType: String,
    checkIn: Date,
    checkOut: Date,
  },
});

export default mongoose.model("Customer", customerSchema);
