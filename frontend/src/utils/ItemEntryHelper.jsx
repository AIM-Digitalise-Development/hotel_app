// src/utils/ItemEntryHelper.jsx
import axios from "axios";

// Create item entry
export const createItemEntry = async (itemData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/item-entry", itemData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Get all item entries with search query and pagination
export const getItemEntries = async (page, itemsPerPage, searchQuery) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/item-entries`, {
      params: { page, itemsPerPage, searchQuery },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
