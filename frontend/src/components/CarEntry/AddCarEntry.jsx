// src/pages/AddCarEntry.jsx
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCarEntry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carName: '',
    category: '',
    price: '',
    availability: 'Available',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/car-entry', formData);
      alert('Car Entry Added Successfully!');
      navigate('/admin-dashboard/car-entries');
    } catch (error) {
      console.error(error);
      alert('Failed to add Car Entry');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-5">Add Car Entry</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Car Name</label>
          <input
            type="text"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="" disabled>Select Category</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Minivan">Minivan</option>
            <option value="Convertible">Convertible</option>
            <option value="Luxury">Luxury</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Car Entry
        </button>
      </form>
    </div>
  );
};

export default AddCarEntry;
