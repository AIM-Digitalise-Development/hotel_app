import ItemEntry from '../models/ItemEntry.js';

// Create a new item entry
export const createItemEntry = async (req, res) => {
  try {
    const { itemName, category, price, availability, description } = req.body;

    const newItem = new ItemEntry({
      itemName,
      category,
      price,
      availability,
      description,
    });

    await newItem.save();
    res.status(201).json({
      success: true,
      message: 'Item Entry created successfully',
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all item entries
export const getAllItemEntries = async (req, res) => {
  try {
    const items = await ItemEntry.find();
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an item entry by ID
export const updateItemEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const item = await ItemEntry.findByIdAndUpdate(id, updatedData, { new: true });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item entry not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Item Entry updated successfully',
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an item entry by ID
export const deleteItemEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await ItemEntry.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Item entry not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Item Entry deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
