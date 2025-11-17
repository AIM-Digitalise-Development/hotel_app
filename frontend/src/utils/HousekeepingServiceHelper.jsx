import axios from "axios";

const BASE_URL = "https://hotel-app-kx38.onrender.com/api";

// Fetch all housekeeping service entries
export const getHousekeepingServiceEntries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/housekeeping-services`);
    return response.data;
  } catch (error) {
    console.error("Error fetching housekeeping services:", error);
    throw error;
  }
};

// Add a new housekeeping service entry
export const addHousekeepingServiceEntry = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/housekeeping-service`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding housekeeping service:", error);
    throw error;
  }
};
