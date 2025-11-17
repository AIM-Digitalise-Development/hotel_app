import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BookingsDetailList() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5); // Adjust per page as needed
  const [sortConfig, setSortConfig] = useState(null);

  // Fetch bookings data from your API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log("Fetching bookings...");
        const response = await fetch("http://localhost:5000/api/bookings");
        const data = await response.json();
        console.log("Fetched bookings:", data);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Function to calculate the number of days between check-in and check-out
  const calculateDays = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDifference = checkOut - checkIn;
    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
    return daysDifference;
  };

  // Sort bookings
  const sortBookings = (key) => {
    let sortedBookings = [...bookings];
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      sortedBookings.reverse();
      setSortConfig({ key, direction: "desc" });
    } else {
      sortedBookings.sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      setSortConfig({ key, direction: "asc" });
    }
    setBookings(sortedBookings);
  };

  // Filter bookings based on search
  const filteredBookings = bookings.filter((booking) =>
    booking.bookingId.toLowerCase().includes(search.toLowerCase()) ||
    `${booking.guestDetails.firstName} ${booking.guestDetails.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (bookingId) => {
    // Logic to handle editing the booking
    console.log("Edit booking with ID:", bookingId);
  };

  const handleDelete = (bookingId) => {
    // Logic to handle deleting the booking
    console.log("Delete booking with ID:", bookingId);
    // You can also call your API to delete the booking here
  };

  const handleCheckInClick = (bookingId) => {
    navigate(`/admin-dashboard/booking/${bookingId}`);  // Navigate to the booking form page
  };
  return (
    <div className="max-w-7xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Bookings</h2>

      {/* Search Box */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Search by Booking ID or Guest Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table of Bookings */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th
                className="px-2 py-2 text-left cursor-pointer"
                onClick={() => sortBookings("bookingId")}
              >
                Booking ID
              </th>
              <th
                className="px-2 py-2 text-left cursor-pointer"
                onClick={() => sortBookings("guestDetails.firstName")}
              >
                Booking Name
              </th>
              <th className="px-2 py-2 text-left">Email</th>
              <th className="px-2 py-2 text-left">Phone</th>
              <th className="px-2 py-2 text-left">Rooms</th>
              <th className="px-2 py-2 text-left">Check-in Date</th>
              <th className="px-2 py-2 text-left">Check-out Date</th>
              <th className="px-2 py-2 text-left">Stay Duration</th>
              <th className="px-2 py-2 text-left">Total Amount</th>
              <th className="px-2 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length > 0 ? (
              currentBookings.map((booking, index) => {
                const guestDetails = booking.guestDetails || {}; // Default to empty object if guestDetails is undefined
                const rooms = booking.rooms || []; // Default to empty array if rooms is undefined
                const checkInDate = booking.checkInDate; // Assuming checkInDate is available
                const checkOutDate = booking.checkOutDate; // Assuming checkOutDate is available
                const totalDays = checkInDate && checkOutDate ? calculateDays(checkInDate, checkOutDate) : 0; // Calculate total days

                return (
                  <tr
                    key={booking._id}
                    className={`text-gray-700 ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}
                  >
                    <td className="px-2 py-2">{booking.bookingId}</td>
                    <td className="px-2 py-2">
                      {guestDetails.firstName} {guestDetails.lastName}
                    </td>
                    <td className="px-2 py-2">{guestDetails.email}</td>
                    <td className="px-2 py-2">{guestDetails.phone}</td>
                    <td className="px-2 py-2">
                      {rooms.length > 0 ? (
                        rooms.map((room) => (
                          <div key={room.roomId._id}>Room {room.roomId.roomNumber}</div>
                        ))
                      ) : (
                        <div>No rooms available</div>
                      )}
                    </td>
                    <td className="px-2 py-2">
                    <button 
                      onClick={() => handleCheckInClick(booking._id)} 
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full"
                    >
                      {new Date(checkInDate).toLocaleDateString()}
                    </button>
                    </td>
                    <td className="px-2 py-2">
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full">
                        {new Date(checkOutDate).toLocaleDateString()}
                      </button>
                    </td>
                    <td className="px-2 py-2">{totalDays} Days</td>
                    <td className="px-2 py-2">₹{booking.totalAmountWithGST}</td>
                    <td className="px-2 py-2 flex gap-2 justify-start">
                      <button
                        onClick={() => handleEdit(booking._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="px-2 py-2 text-center text-gray-500"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredBookings.length / bookingsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BookingsDetailList;
