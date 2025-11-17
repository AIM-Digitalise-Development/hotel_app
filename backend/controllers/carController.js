// controllers/carController.js

import CarEntry from '../models/CarEntry.js';

// Create a new car entry
export const createCarEntry = async (req, res) => {
  try {
    const { carName, category, price, availability, description } = req.body;

    const newCarEntry = new CarEntry({
      carName,
      category,
      price,
      availability,
      description,
    });

    await newCarEntry.save();
    res.status(201).json({ success: true, message: 'Car entry created successfully!', car: newCarEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all car entries
export const getAllCarEntries = async (req, res) => {
  try {
    const cars = await CarEntry.find();
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a car entry by ID
export const updateCarEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { carName, category, price, availability, description } = req.body;

    const updatedCarEntry = await CarEntry.findByIdAndUpdate(
      id,
      { carName, category, price, availability, description },
      { new: true }
    );

    if (!updatedCarEntry) {
      return res.status(404).json({ success: false, message: 'Car entry not found' });
    }

    res.status(200).json({ success: true, message: 'Car entry updated successfully!', car: updatedCarEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a car entry by ID
export const deleteCarEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCarEntry = await CarEntry.findByIdAndDelete(id);

    if (!deletedCarEntry) {
      return res.status(404).json({ success: false, message: 'Car entry not found' });
    }

    res.status(200).json({ success: true, message: 'Car entry deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
