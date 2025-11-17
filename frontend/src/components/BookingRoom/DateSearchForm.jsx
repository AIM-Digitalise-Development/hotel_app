import  { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DateSearchForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rooms, setRooms] = useState([]); 
  const navigate = useNavigate();
  


    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/rooms"); 
          setRooms(response.data); 
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };
      fetchRooms();
    }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin-dashboard/booking", { state: { from, to,rooms  } });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-lg font-semibold mb-4">Search for Available Rooms</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">From</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">To</label>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}

export default DateSearchForm;