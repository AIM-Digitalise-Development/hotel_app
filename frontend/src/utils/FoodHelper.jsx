import axios from 'axios';
import { toast } from 'react-toastify';

// Base API instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Full backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});


// Function to fetch all food entries
export const fetchFoodEntries = async (currentPage, entriesPerPage, searchQuery) => {
  try {
    const response = await api.get("/foods", {
      params: {
        page: currentPage,
        limit: entriesPerPage,
        search: searchQuery,
      },
    });
    console.log("API Response:", response.data);
    return response.data; // Ensure that the API returns an object with foodEntries and totalEntries
  } catch (error) {
    console.error("Error fetching food entries:", error);
    throw error;
  }
};

// Function to add a new food entry
export const addFoodEntry = async (foodName, category, subcategory, price, isAvailable = true) => {
  try {
    const response = await api.post("/foods", {
      foodName,
      category,
      subcategory,
      price,
      isAvailable,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to add food entry!");
    throw error;
  }
};


// Function to delete a food entry
export const deleteFoodEntry = async (id) => {
  try {
    await api.delete(`/foods/${id}`); // Matches the `router.delete('/foods/:id', ...)`
    toast.success('Food entry deleted successfully!');
  } catch (error) {
    handleApiError(error, 'Failed to delete food entry!');
    throw error;
  }
};

// Centralized error handler
const handleApiError = (error, defaultMessage) => {
  const message =
    error.response?.data?.message || error.message || defaultMessage;
  toast.error(message);
};
