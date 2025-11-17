// src/utils/ItemEntryHelper.jsx
import axios from "axios";

// Create item entry
export const createItemEntry = async (itemData) => {
  try {
    const response = await axios.post("https://hotel-app-kx38.onrender.com/api/item-entry", itemData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Get all item entries with search query and pagination
export const getItemEntries = async (page, itemsPerPage, searchQuery) => {
  try {
    const response = await axios.get(`https://hotel-app-kx38.onrender.com/api/item-entries`, {
      params: { page, itemsPerPage, searchQuery },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
