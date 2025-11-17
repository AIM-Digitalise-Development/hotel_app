import mongoose from 'mongoose';
const guestSchema = new mongoose.Schema(
    {
      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
      },
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      govtIdType: { 
        type: String, 
        enum: ['Aadhaar Card', 'Driving License', 'Voter ID', 'Passport', 'Other'],
        required: true 
      }, 
      govtIdNumber: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
      roomId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'RoomEntry', 
        required: true 
      },
    },
    { timestamps: true }
  );
  
  const Guest = mongoose.model('Guest', guestSchema);
  
  export default Guest;
  