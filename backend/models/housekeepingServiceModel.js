// models/housekeepingServiceModel.js
import mongoose from 'mongoose';

const housekeepingServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      enum: ['Available', 'Unavailable'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

const HousekeepingService = mongoose.model('HousekeepingService', housekeepingServiceSchema);

export default HousekeepingService;
