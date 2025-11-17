import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RoomDisplay() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomBookingStatus, setRoomBookingStatus] = useState({});
  const navigate = useNavigate();

  // Fetch the booking data for overlapping check-in/check-out dates
  const fetchBookingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings");
      const bookings = response.data;
      const updatedRoomStatus = {};
  
      rooms.forEach((room) => {
        console.log("Checking availability for room:", room.roomNumber);
  
        // Convert the selected dates (from and to) to Date objects without the time part
        const selectedFromDate = new Date(from);
        const selectedToDate = new Date(to);
        selectedFromDate.setHours(0, 0, 0, 0); // Set to midnight to ignore time
        selectedToDate.setHours(0, 0, 0, 0); // Set to midnight to ignore time
  
        const isBooked = bookings.some((booking) => {
          // Check if roomId is an object and extract the ID if necessary
          const bookingRoomId = booking.rooms[0].roomId._id || booking.rooms[0].roomId;
  
          console.log(`Room ID: ${room._id}, Booking Room ID: ${bookingRoomId}`);
          console.log(`Selected dates: ${selectedFromDate} - ${selectedToDate}`);
          console.log(`Booking dates: ${booking.checkInDate} - ${booking.checkOutDate}`);
  
          const checkInDate = new Date(booking.checkInDate);
          const checkOutDate = new Date(booking.checkOutDate);
          checkInDate.setHours(0, 0, 0, 0); // Set to midnight to ignore time
          checkOutDate.setHours(0, 0, 0, 0); // Set to midnight to ignore time
  
          // Overlap check (room ID + date range)
          const dateOverlaps =
            selectedFromDate < checkOutDate && selectedToDate > checkInDate;
  
          console.log(
            `Room ${room.roomNumber} overlaps with booking ${booking.bookingId}? ${dateOverlaps}`
          );
  
          // Ensure both room ID and date overlap are checked
          return room._id === bookingRoomId && dateOverlaps;
        });
  
        updatedRoomStatus[room._id] = isBooked ? "Booked" : "Available";
        console.log(`Room ${room.roomNumber} is ${updatedRoomStatus[room._id]}`);
      });
  
      setRoomBookingStatus(updatedRoomStatus);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };
  

  // Fetch the available rooms based on the selected dates
  const fetchRooms = async () => {
    if (!from || !to) return;

    try {
      console.log("Fetching rooms with check-in date:", from, "and check-out date:", to);
      const response = await axios.get("http://localhost:5000/api/rooms", {
        params: { checkInDate: from, checkOutDate: to },
      });
      console.log("Fetched rooms:", response.data);
      setRooms(response.data); // Set the available rooms
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Handle the search button click to fetch rooms and booking status
  const handleDateSearch = (e) => {
    e.preventDefault();
    console.log("Search dates:", { from, to });
    fetchRooms(); // Fetch rooms when "Search" is clicked
  };

  // Handle room click to select or deselect rooms
  const handleRoomClick = (room) => {
    console.log("Room clicked:", room.roomNumber);
    setSelectedRooms((prevSelected) => {
      const isSelected = prevSelected.some((selected) => selected._id === room._id);
      console.log(`Room ${room.roomNumber} is ${isSelected ? "already" : "not"} selected`);
      return isSelected
        ? prevSelected.filter((selected) => selected._id !== room._id)
        : [...prevSelected, room];
    });
  };

  // Handle submission and navigate to the confirmation page
  const handleSubmit = () => {
    const totalAmount = selectedRooms.reduce((sum, room) => sum + (room.price || 0), 0);
    console.log("Total amount for selected rooms:", totalAmount);
    navigate("/admin-dashboard/confirmation", {
      state: { selectedRooms, totalAmount, from, to },
    });
  };

  // Group rooms by their categories for better display
  const groupedRooms = rooms.reduce((acc, room) => {
    const category = room.category?.name || 'Uncategorized'; // fallback for missing category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(room);
    return acc;
  }, {});

  // Use useEffect to fetch booking data after rooms are loaded
  useEffect(() => {
    if (rooms.length > 0) {
      fetchBookingData(); // Fetch booking data only after rooms are fetched
    }
  }, [rooms, from, to]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <form onSubmit={handleDateSearch} className="mb-6">
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

      <h2 className="text-lg font-semibold mb-4">Select Rooms</h2>
      {Object.keys(groupedRooms).map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {groupedRooms[category].map((room) => (
              <div
                key={room._id}
                className={`w-full p-2 text-xs border rounded cursor-pointer text-center ${
                  roomBookingStatus[room._id] === "Booked"
                    ? "bg-gray-300 cursor-not-allowed"
                    : selectedRooms.some((selected) => selected._id === room._id)
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => handleRoomClick(room)}
              >
                <div>{room.roomNumber}</div>
                <div>{room.bedSize}</div>
                <div>₹{room.price}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}

export default RoomDisplay;
