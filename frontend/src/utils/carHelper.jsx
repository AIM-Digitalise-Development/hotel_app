// src/utils/carHelpers.js

import axios from 'axios';

export const fetchCarEntries = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/car-entries');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching car entries:', error);
    return [];
  }
};

export const addCarEntry = async (carData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/car-entry', carData);
    return response.data;
  } catch (error) {
    console.error('Error adding car entry:', error);
    throw error;
  }
};
