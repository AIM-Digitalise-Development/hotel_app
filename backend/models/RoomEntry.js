import mongoose from 'mongoose';

const roomEntrySchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    floorNumber: {
      type: Number,
      required: true,
      min: [1, 'Floor number must be at least 1'],
    },
    bedSize: {
      type: String,
      required: true,
      enum: ['Single', 'Double', 'King', 'Queen', 'Twin'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RoomCategory',
      required: true,
    },

    // Cloudinary secure URLs[](https://res.cloudinary.com/...)
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0 && arr.every(url => typeof url === 'string' && url.startsWith('https://res.cloudinary.com'));
        },
        message: 'At least one valid Cloudinary image URL is required.',
      },
    },

    // Store Cloudinary public_id for easy deletion when updating/deleting room
    imagePublicIds: {
      type: [String],
      default: [],
      // No validation needed here — Cloudinary generates these
    },

    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    status: {
      type: String,
      enum: ['Available', 'Booked', 'Maintenance', 'Cleaning'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

// Optional: Index for faster queries
roomEntrySchema.index({ roomNumber: 1 });
roomEntrySchema.index({ category: 1 });
roomEntrySchema.index({ status: 1 });

const RoomEntry = mongoose.model('RoomEntry', roomEntrySchema);

export default RoomEntry;