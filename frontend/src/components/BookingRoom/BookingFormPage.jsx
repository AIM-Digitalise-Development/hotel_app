import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookingFormPage() {
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    govtIdType: "", 
    govtIdNumber: "",
    country: "",
    state: "",
    pinCode: "",
    roomId: "",
  });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/${id}`
        );
        const data = await response.json();
        setBookingDetails(data);
        setGuests(data.guests || []);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const calculateStayDuration = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut - checkIn;
    return Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
  };

  const handleAddGuest = async () => {
    if (
      !newGuest.fullName ||
      !newGuest.phone ||
      !newGuest.email ||
      !newGuest.address ||
      !newGuest.govtIdType ||
      !newGuest.govtIdNumber ||
      !newGuest.roomId
    ) {
      alert("Please fill in all required guest details.");
      return;
    }
    setGuests((prevGuests) => [...prevGuests, newGuest]);
    setNewGuest({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      govtIdType: "",
      govtIdNumber: "",
      country: "",
      state: "",
      pinCode: "",
      roomId: "",
    });
  };
   
  const handleSaveGuestDetails = async () => {
    try {
      console.log("Saving guests:", guests); 
      console.log("Booking ID:", id);
      const response = await fetch(`http://localhost:5000/api/add-guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: id,
          guests,
        }),
      });
      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error("Failed to save guest details.");
      }

      alert("Guest details saved successfully!");
    } catch (error) {
      console.error("Error saving guest details:", error);
      alert("Failed to save guest details.");
    }
  };

  
  if (!bookingDetails) return <div>Loading...</div>;

  const stayDuration = calculateStayDuration(
    bookingDetails.checkInDate,
    bookingDetails.checkOutDate
  );
  const totalAmount = bookingDetails.rooms.reduce(
    (acc, room) => acc + room.price,
    0
  );

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg flex">
      {/* Booking Details Section */}
      <div className="w-2/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Booking Details
        </h2>
        <div className="space-y-4">
          <p>
            <strong>Booking ID:</strong> {bookingDetails.bookingId}
          </p>
          <p>
            <strong>Booking Name:</strong> {bookingDetails.guestDetails.firstName} {" "}
            {bookingDetails.guestDetails.lastName}
          </p>
          <p>
            <strong>Email:</strong> {bookingDetails.guestDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {bookingDetails.guestDetails.phone}
          </p>
          <p>
            <strong>Check-in Date:</strong> {" "}
            {new Date(bookingDetails.checkInDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Check-out Date:</strong> {" "}
            {new Date(bookingDetails.checkOutDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Stay Duration:</strong> {stayDuration} Days
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{bookingDetails.totalAmountWithGST}
          </p>
        </div>

        {/* Rooms with Guest List */}
        <div className="mt-6 space-y-4">
          {bookingDetails.rooms.map((room, index) => (
            <div
              key={room._id}
              className="border p-4 rounded-lg bg-white shadow-sm"
            >
              <h3 className="font-semibold text-lg">
                Room {index + 1}: {room.roomNumber}
              </h3>
              <div className="mt-4 space-y-2">
                {guests
                  .filter((guest) => guest.roomId === room.roomId._id)
                  .map((guest, guestIndex) => (
                    <div key={guestIndex} className="border-b py-2">
                      <p>
                        <strong>Name:</strong> {guest.fullName}
                      </p>
                      <p>
                        <strong>Email:</strong> {guest.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {guest.phone}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Guest Section */}
      <div className="w-1/3 pl-6">
        <h3 className="text-xl font-semibold mb-4 text-center">Add Guest</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            placeholder="Full Name"
            value={newGuest.fullName}
            onChange={(e) =>
              setNewGuest({ ...newGuest, fullName: e.target.value })
            }
          />
          <input
            type="tel"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            placeholder="Phone Number"
            value={newGuest.phone}
            onChange={(e) =>
              setNewGuest({ ...newGuest, phone: e.target.value })
            }
          />
          <input
            type="email"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            placeholder="Email"
            value={newGuest.email}
            onChange={(e) =>
              setNewGuest({ ...newGuest, email: e.target.value })
            }
          />
          <textarea
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            placeholder="Address"
            value={newGuest.address}
            onChange={(e) =>
              setNewGuest({ ...newGuest, address: e.target.value })
            }
          />
          <select
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            value={newGuest.govtIdType}
            onChange={(e) =>
              setNewGuest({ ...newGuest, govtIdType: e.target.value })
            }
          >
            <option value="" disabled>
              Select Government ID Type
            </option>
            <option value="Aadhaar Card">Aadhaar Card</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Driving License">Driving License</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            placeholder="Government ID Number"
            value={newGuest.govtIdNumber}
            onChange={(e) =>
              setNewGuest({ ...newGuest, govtIdNumber: e.target.value })
            }
          />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            placeholder="Country"
            value={newGuest.country}
            onChange={(e) =>
              setNewGuest({ ...newGuest, country: e.target.value })
            }
          />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            placeholder="State"
            value={newGuest.state}
            onChange={(e) =>
              setNewGuest({ ...newGuest, state: e.target.value })
            }
          />
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            placeholder="Pin Code"
            value={newGuest.pinCode}
            onChange={(e) =>
              setNewGuest({ ...newGuest, pinCode: e.target.value })
            }
          />
          <select
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            value={newGuest.roomId}
            onChange={(e) =>
              setNewGuest({ ...newGuest, roomId: e.target.value })
            }
          >
            <option value="" disabled>
              Select Room
            </option>
            {bookingDetails.rooms.map((room) => (
              <option key={room.roomId._id} value={room.roomId._id}>
                Room {room.roomId.roomNumber}
              </option>
            ))}
          </select>

          <button
            onClick={() => handleAddGuest(newGuest.roomId)}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            + Add Guest
          </button>
          
        </div>
        <button
          onClick={handleSaveGuestDetails}
          className="bg-green-500 text-white py-2 px-4 rounded-md w-full mt-6"
        >
          Save All Guests
        </button>
      </div>
    </div>
  );
}

export default BookingFormPage;
