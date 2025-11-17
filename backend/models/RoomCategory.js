// models/RoomCategory.js
import mongoose from 'mongoose';

const roomCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // price: {
    //   type: Number,
    //   required: true,
    //   min: 0,
    // },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const RoomCategory = mongoose.model('RoomCategory', roomCategorySchema);

export default RoomCategory;
