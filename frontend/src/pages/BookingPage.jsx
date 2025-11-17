import { useState, useEffect } from "react";
import axios from "axios";
import RoomDisplay from "../components/BookingRoom/RoomDisplay";

function BookingPage() {
    const [rooms, setRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
  
    useEffect(() => {
        const fetchRooms = async () => {
          try {
            const res = await axios.get("http://localhost:5000/api/rooms");
            setRooms(res.data); 
          } catch (error) {
            console.error("Error fetching rooms:", error);
          }
        };
        fetchRooms();
      }, []);

      const handleRoomSelection = (roomId) => {
        setSelectedRooms((prev) =>
          prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
        );
      };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <RoomDisplay
        rooms={rooms}
        selectedRooms={selectedRooms}
        onRoomClick={handleRoomSelection}
      />
    </div>
  );
}

export default BookingPage;