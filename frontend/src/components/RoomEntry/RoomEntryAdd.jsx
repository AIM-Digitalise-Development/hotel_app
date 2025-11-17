import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Image upload handler
const handleImageUpload = (setImages) => (e) => {
  const files = e.target.files;
  console.log("Selected images:", files); 
  setImages([...files]);
};

const RoomEntryAdd = () => {
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [bedSize, setBedSize] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch room categories from the backend
  useEffect(() => {
    const fetchRoomCategories = async () => {
      try {
        const res = await axios.get('https://hotel-app-kx38.onrender.com/api/room-categories');
        console.log('Fetched categories:', res.data); 
        console.log('API Response:', res); // Log the full response
        
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.error('Expected an array of categories, but got:', res.data);
          setCategories([]); // Default to an empty array if the response is not as expected
        }
      } catch (error) {
        console.error('Error fetching categories', error);
        setCategories([]); // Default to an empty array if there is an error
      }
    };

    fetchRoomCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!roomNumber || !floorNumber || !bedSize || !category || !price || images.length === 0) {
      alert('Please fill in all fields and upload at least one image.');
      return;
    }
    
    console.log('FormData Images:', images);
    // Create a new FormData object to handle file uploads
    const formData = new FormData();
    formData.append('roomNumber', roomNumber);
    console.log('Room Number:', roomNumber);

    formData.append('floorNumber', floorNumber);
    console.log('Floor Number:', floorNumber);
    formData.append('bedSize', bedSize);
    console.log('Bed Size:', bedSize);
    formData.append('category', category);
    console.log('Category:', category);
    formData.append('price', price);
    console.log('Price:', price);
    // Append each image file
    images.forEach((image) => {
      formData.append('images', image);
      console.log('Appending image:', image);
    });

    try {
    
      await axios.post('https://hotel-app-kx38.onrender.com/api/rooms/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Room added successfully');
      navigate('/admin-dashboard/room-entries');
    } catch (error) {
      console.error('Error adding room entry:', error);
      alert('Error adding room. Please try again.');
    }
  };

  // Handle price change
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setPrice(value);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Room Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="Floor Number"
          value={floorNumber}
          onChange={(e) => setFloorNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Bed Size"
          value={bedSize}
          onChange={(e) => setBedSize(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload(setImages)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={handlePriceChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Add Room Entry
        </button>
      </form>
    </div>
  );
};

export default RoomEntryAdd;
