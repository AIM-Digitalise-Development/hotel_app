// controllers/roomCategoryController.js
import RoomCategory from '../models/RoomCategory.js';

// Create a new room category
export const createRoomCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = await RoomCategory.create({ name, description });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all room categories
export const getAllRoomCategories = async (req, res) => {
  try {
    const categories = await RoomCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single room category by ID
export const getRoomCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await RoomCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Room Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a room category
export const updateRoomCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await RoomCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Room Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a room category
export const deleteRoomCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await RoomCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Room Category not found' });
    }
    res.status(200).json({ message: 'Room Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
