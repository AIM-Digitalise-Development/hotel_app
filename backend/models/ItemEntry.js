import mongoose from 'mongoose';

const itemEntrySchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Amenities', 'Room Service', 'Minibar', 'Extras'], // Add any other categories as needed
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

const ItemEntry = mongoose.model('ItemEntry', itemEntrySchema);

export default ItemEntry;
