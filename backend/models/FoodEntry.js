import mongoose from 'mongoose';

const foodEntrySchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: [true, 'Food name is required'], 
      unique: true, 
      trim: true, 
    },
    category: {
      type: String,
      enum: ['Indian', 'Chinese', 'Continental'], 
      required: [true, 'Category is required'], 
    },
    subcategory: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Beverages', 'Desserts'], 
      required: [true, 'SubCategory is required'], 
    },
    price: {
      type: Number,
      required: [true, 'Price is required'], 
      min: [0, 'Price must be a positive number'], 
    },
    isAvailable: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);

export default FoodEntry;
