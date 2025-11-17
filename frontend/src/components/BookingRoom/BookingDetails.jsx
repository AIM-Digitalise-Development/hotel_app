import { useLocation, useNavigate } from "react-router-dom";
import  { useState } from "react";

function BookingDetails() {
  const { state } = useLocation();
  const { selectedRooms = [], from, to } = state || {};
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");

  const handlePayment = async () => {
    try {
      const guestDetails = {
        firstName: document.querySelector("input[placeholder='First Name']").value,
        lastName: document.querySelector("input[placeholder='Last Name']").value,
        phone: document.querySelector("input[placeholder='Phone Number']").value,
        email: document.querySelector("input[placeholder='Email']").value,
        address: document.querySelector("textarea[placeholder='Address']").value,
      };      
      
  
      if (!guestDetails.firstName || !guestDetails.lastName || !guestDetails.phone || !guestDetails.email || !guestDetails.address) {
        alert("Please fill all guest details.");
        return;
      }
      
  
      const bookingDetails = {
        guestDetails,
        checkInDate: from,
        checkOutDate: to,
        selectedRooms: selectedRooms.map((room) => ({
          roomId: room._id,
          price: room.price,
        })),
      };
      
      console.log('Booking details:', bookingDetails); 

      const response = await fetch("http://localhost:5000/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSuccessMessage(data.message); // Or data.message if success is in message
          setTimeout(() => {
            navigate("/admin-dashboard/bookings-list");
          }, 2000);
        } else {
          alert(data.error || "Booking failed on the server.");
        }
      }
       else {
        const errorData = await response.json(); // Parse JSON error
        alert(errorData.error || "Failed to book the rooms.");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      alert("An error occurred while booking the rooms.");
    }
  };
  
  

  const calculateDays = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const fromTime = new Date(fromDate).getTime();
      const toTime = new Date(toDate).getTime();
      const differenceInTime = toTime - fromTime;
      return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    }
    return 1; // Default to 1 if dates are not specified
  };

  const numberOfDays = calculateDays(from, to);

  const calculateTotalAmount = () => {
    return selectedRooms.reduce((total, room) => {
      const roomPrice = room.price || 0;
      const days = numberOfDays || 1; 
      return total + roomPrice * days;
    }, 0);
  };

  const totalAmount = calculateTotalAmount();

  const gstRate = 0.18; // 18% GST
  const gstAmount = totalAmount * gstRate;
  const totalAmountWithGST = totalAmount + gstAmount;

  return (
    <div className="max-w-5xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Booking Details
      </h2>

      {/* Success Message */}
      {successMessage && (
        <div className="text-center mb-6 text-green-600 font-bold">
          {successMessage}
        </div>
      )}

      {/* Dates Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-gray-700">
          <strong>CheckIn Date:</strong> {from || "Not specified"}
        </p>
        <p className="text-gray-700">
          <strong>CheckOut Date:</strong> {to || "Not specified"}
        </p>
        <p className="text-gray-700">
          <strong>No of Days:</strong> {numberOfDays}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Selected Rooms Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            You have selected!
          </h3>
          <ul className="list-none text-gray-700">
            {selectedRooms.map((room, index) => (
              <li
                key={room._id || index}
                className="flex items-center mb-6 p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
              >
                {/* Room Category and Number */}
                <div className="flex-shrink-0 text-lg text-gray-800 font-medium">
                  <span>{room.category?.name || "Unknown Category"} -</span>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-900">
                    Room {room.roomNumber || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600">₹{room.price || 0}</p>
                  <p className="text-sm text-gray-600">
                    Total for {numberOfDays} day(s): ₹{(room.price || 0) * numberOfDays}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-t-2 border-gray-300" />
          <p className="mt-4 text-lg font-bold text-gray-800">
            Total Amount: ₹{totalAmount}
          </p>

          {/* GST and Total Amount with GST */}
          <div className="mt-4">
            <p className="text-lg text-gray-800">
              GST (18%): ₹{gstAmount.toFixed(2)}
            </p>
            <p className="text-lg font-bold text-gray-800">
              Total Amount (with GST): ₹{totalAmountWithGST.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Guest Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Guest Details
          </h3>
          <form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              required
            />
            <textarea
              placeholder="Address"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              rows="3"
              required
            ></textarea>
            <button
              type="button"
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
