import axios from 'axios';

const BASE_URL = 'https://hotel-app-kx38.onrender.com/api'; // Adjust this if needed

// Fetch all employees
export const fetchEmployees = async (query = "") => {
  const response = await fetch(`${BASE_URL}/employees?${query}`);
  const data = await response.json();
  return data;
};

// Add a new employee
export const addEmployee = async (employeeData) => {
  const response = await fetch(`${BASE_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });
  return await response.json();
};

// Update an existing employee
export const updateEmployee = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
};

// Delete an employee
export const deleteEmployee = async (id) => {
  await fetch(`${BASE_URL}/employees/${id}`, {
    method: 'DELETE',
  });
};

// Fetch all customers
export const fetchCustomers = async () => {
  const response = await fetch(`${BASE_URL}/customers`);
  const data = await response.json();
  return data;
};

// Add a new customer
export const addCustomer = async (customerData) => {
    try {
      const response = await fetch(`${BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
  
      const data = await response.json();
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add customer');
      }
  
      return data; // Return the data (optional, depending on what you want)
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error; // Rethrow the error to be handled in the submit function
    }
  };


export const deleteCustomer = async (id) => {
    const response = await fetch(`${BASE_URL}/customers/${id}`, {
      method: 'DELETE',
    });
    return response;
  };
  

  //Room Category 
 // Room Category API call
export const fetchRoomCategories = () => axios.get(`${BASE_URL}/room-categories`);

// Call the function and log the response
fetchRoomCategories()
  .then(response => {
    console.log('Room categories:', response.data);
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
export const createRoomCategory = (data) => axios.post(`${BASE_URL}/room-categories`, data);
export const updateRoomCategory = (id, data) =>
  axios.put(`${BASE_URL}/room-categories/${id}`, data);
export const deleteRoomCategory = (id) =>
  axios.delete(`${BASE_URL}/room-categories/${id}`);