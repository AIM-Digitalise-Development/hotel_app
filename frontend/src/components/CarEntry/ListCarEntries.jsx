// src/pages/ListCarEntries.jsx
import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListCarEntries = () => {
  const navigate = useNavigate();
  const [carEntries, setCarEntries] = useState([]);

  useEffect(() => {
    const fetchCarEntries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/car-entries');
        setCarEntries(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCarEntries();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Car Entries</h1>
        <button
          onClick={() => navigate('/admin-dashboard/add-car-entry')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Car Entry
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Car Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Availability</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {carEntries.map((car) => (
            <tr key={car._id}>
              <td className="border px-4 py-2">{car.carName}</td>
              <td className="border px-4 py-2">{car.category}</td>
              <td className="border px-4 py-2">{car.price}</td>
              <td className="border px-4 py-2">{car.availability}</td>
              <td className="border px-4 py-2">{car.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCarEntries;
