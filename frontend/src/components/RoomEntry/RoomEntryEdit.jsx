import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Image upload handler
const handleImageUpload = (setImages) => (e) => {
  const files = e.target.files;
  console.log("Selected images:", files);
  setImages([...files]);
};

const RoomEntryEdit = () => {
  const { roomId } = useParams(); // Get room ID from URL
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [bedSize, setBedSize] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch room categories from the backend
  useEffect(() => {
    const fetchRoomCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/room-categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchRoomCategories();
  }, []);

  // Fetch room details for editing
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/${roomId}`);
        const room = res.data;
        setRoomNumber(room.roomNumber);
        setFloorNumber(room.floorNumber);
        setBedSize(room.bedSize);
        setCategory(room.category._id); // Assuming category is an object with an _id field
        setPrice(room.price);
        // Note: Images won't be fetched here as they may need special handling
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!roomNumber || !floorNumber || !bedSize || !category || !price) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a new FormData object to handle file uploads
    const formData = new FormData();
    formData.append("roomNumber", roomNumber);
    formData.append("floorNumber", floorNumber);
    formData.append("bedSize", bedSize);
    formData.append("category", category);
    formData.append("price", price);

    // Append each image file
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await axios.put(`http://localhost:5000/api/rooms/edit/${roomId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Room updated successfully.");
      navigate("/admin-dashboard/room-entries");
    } catch (error) {
      console.error("Error updating room entry:", error);
      alert("Error updating room. Please try again.");
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
      <h2 className="text-2xl font-bold mb-4">Edit Room Entry</h2>
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
          Update Room Entry
        </button>
      </form>
    </div>
  );
};

export default RoomEntryEdit;
