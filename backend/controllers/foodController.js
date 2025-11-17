import FoodEntry from "../models/FoodEntry.js";
import validator from 'validator';

// Get all food entries
const getAllFoodEntries = async (req, res) => {
  try {
    const foodEntries = await FoodEntry.find().lean(); // Fetch all food entries
    res.status(200).json({ success: true, data: foodEntries }); // Standardized response structure
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch food entries', error: error.message });
  }
};

// Add a new food entry
const addFoodEntry = async (req, res) => {
  const { foodName, category,subcategory, price, isAvailable } = req.body;
  
  if (!foodName || !category || price === undefined) {
    return res.status(400).json({ success: false, message: 'Food name, category, and price are required' });
  }

  try {
    // Sanitize foodName and description
    const sanitizedFoodName = validator.escape(foodName.trim());
    // const sanitizedDescription = description ? validator.escape(description.trim()) : null;

    // Check for duplicate food name
    const existingFood = await FoodEntry.findOne({ foodName: sanitizedFoodName });
    if (existingFood) {
      return res.status(409).json({ success: false, message: 'Food item already exists' });
    }

    // Create and save new food entry
    const newFoodEntry = await FoodEntry.create({
      foodName: sanitizedFoodName,
      category,
      subcategory,
      price,
      isAvailable: isAvailable ?? true,
    });

    res.status(201).json({ success: true, message: 'Food entry created successfully', data: newFoodEntry });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Failed to create food entry', error: error.message });
  }
};

// In your controllers file
const getFoodEntryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the food entry by ID
    const foodEntry = await FoodEntry.findById(id).lean();

    if (!foodEntry) {
      return res.status(404).json({ success: false, message: 'Food entry not found' });
    }

    res.status(200).json({ success: true, data: foodEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch food entry', error: error.message });
  }
};


// Delete a food entry by ID
const deleteFoodEntry = async (req, res) => {
  const { id } = req.params; // Get the food entry ID from the URL parameters

  try {
    // Find and delete the food entry by ID
    const deletedFoodEntry = await FoodEntry.findByIdAndDelete(id);

    if (!deletedFoodEntry) {
      return res.status(404).json({ success: false, message: 'Food entry not found' });
    }

    res.status(200).json({ success: true, message: 'Food entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete food entry', error: error.message });
  }
};

export { getAllFoodEntries, getFoodEntryById,addFoodEntry, deleteFoodEntry };
