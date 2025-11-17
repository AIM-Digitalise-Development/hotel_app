import axios from 'axios';

const API_URL = '/api/room-categories';

export const fetchRoomCategories = async (page, searchQuery) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, search: searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching room categories');
  }
};

export const addRoomCategory = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error adding room category');
  }
};

export const updateRoomCategory = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating room category');
  }
};

export const removeRoomCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting room category');
  }
};
