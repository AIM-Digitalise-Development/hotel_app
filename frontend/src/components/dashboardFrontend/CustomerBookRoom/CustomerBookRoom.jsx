import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const CustomerBookRoom = () => {
  const navigate = useNavigate(); 
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bookings");
        const data = await response.json();
        setBookings(data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleBookRoomClick = () => {
    navigate("/admin-dashboard/booking"); 
  };
  return (
    <div
      className="p-2 h-[12rem] w-[16rem] border m-3 bg-gradient-to-r from-[#d4dddf] to-[#c4c5c5] rounded-xl transform scale-95"
      style={{
        boxShadow: "14px 8px 8px rgba(0,0,0,0.6)", // Slightly reduced shadow
      }}
    >
      <div className="flex justify-between">
        <div className="text-xl font-mono font-medium">
          CUSTOMERS
          <span>
            <div>BOOK ROOM</div>
          </span>
        </div>
        <input
          className="w-16 h-5 bg-[#6d757b] rounded-md text-white text-xs" // Smaller input
          type="text"
        />
      </div>

      {/* Dynamic Table for Bookings */}
      <table className="border-collapse w-full text-xs"> {/* Smaller font size */}
        <tbody>
          {/* Loop through the bookings and display relevant info */}
          {bookings.slice(0, 2).map((booking) => (
            <tr key={booking.bookingId}>
              <td className="border-b border-gray-600 p-1">{booking.bookingId}</td>
              <td className="border-b border-gray-600 p-1">{booking.guestDetails.firstName} {booking.guestDetails.lastName}</td>
              <td className="border-b border-gray-600 p-1">
                {booking.status === "Booked" ? "Booked" : "Available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between text-white font-semibold">
        <button
          className="p-1 bg-gradient-to-r from-[#5a9cc0] to-[#4c83a0] rounded-2xl w-28 text-xs"
          onClick={handleBookRoomClick} // Trigger the navigation on click
        >
          Book Room
        </button>
        <button className="p-1 bg-gradient-to-r from-[#f97c93] to-[#f16b72] rounded-2xl w-28 text-xs">
          Leave Room
        </button>
      </div>
    </div>
  );
};

export default CustomerBookRoom;