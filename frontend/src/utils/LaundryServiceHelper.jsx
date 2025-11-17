import axios from "axios";

const API_URL = "http://localhost:5000/api/laundry-service";

export const addLaundryServiceEntry = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error adding laundry service entry:", error);
    throw error;
  }
};

export const getLaundryServiceEntries = async (currentPage, searchQuery) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page: currentPage, search: searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching laundry service entries:", error);
    throw error;
  }
};
