// models/CarEntry.js

import mongoose from 'mongoose';

const carEntrySchema = new mongoose.Schema(
  {
    carName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Sedan', 'SUV', 'Minivan', 'Convertible', 'Luxury', 'Others'],
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
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const CarEntry = mongoose.model('CarEntry', carEntrySchema);

export default CarEntry;
