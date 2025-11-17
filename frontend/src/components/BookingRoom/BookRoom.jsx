import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const RoomBookingForm = () => {
  const { roomId } = useParams(); // Get roomId from the URL
  const location = useLocation(); // Use location to get state
  const { roomDetails } = location.state || {}; // Get room details from state

  const [customers, setCustomers] = useState([
    { name: "", phone: "", email: "", address: "", govtIdProof: [] },
  ]); // Allow multiple customers
  const [selectedRoom, setSelectedRoom] = useState(roomDetails || null); // Set initial selectedRoom from state
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!roomDetails && roomId) {
      console.log("Fetching room details from backend...");
      axios
        .get(`https://hotel-app-kx38.onrender.com/api/rooms/${roomId}`)
        .then((response) => {
          setSelectedRoom(response.data);
          console.log("Fetched room details:", response.data.room);
        })
        .catch((error) => console.error("Error fetching room details:", error));
    }
  }, [roomDetails, roomId]);

  useEffect(() => {
    // Fetch available services when the component loads
    axios
      .get("/api/services")
      .then((response) => {
        setServicesList(response.data.services || []);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      setTotalAmount(selectedRoom.price); // Initialize total amount based on room price
    }
  }, [selectedRoom]);

  const handleCustomerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCustomers = [...customers];
    updatedCustomers[index][name] = value;
    setCustomers(updatedCustomers);
  };

  const handleFileChange = (index, e) => {
    const files = Array.from(e.target.files);
    const updatedCustomers = [...customers];
    updatedCustomers[index].govtIdProof = files;
    setCustomers(updatedCustomers);
  };

  const addCustomer = () => {
    setCustomers([
      ...customers,
      { name: "", phone: "", email: "", address: "", govtIdProof: [] },
    ]);
  };

  const handleServiceChange = (serviceId) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(serviceId)
        ? prevServices.filter((service) => service !== serviceId)
        : [...prevServices, serviceId]
    );
  };

  useEffect(() => {
    const selectedServicesDetails = servicesList.filter((service) =>
      selectedServices.includes(service._id)
    );
    const serviceTotal = selectedServicesDetails.reduce(
      (sum, service) => sum + service.price,
      0
    );
    setTotalAmount(
      selectedRoom ? selectedRoom.price + serviceTotal : serviceTotal
    );
  }, [selectedServices, selectedRoom, servicesList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomId", selectedRoom._id);
    formData.append("checkInDate", new Date());
    formData.append("checkOutDate", new Date());
    formData.append("services", JSON.stringify(selectedServices));
    formData.append("totalAmount", totalAmount);

    // Append customer data
    customers.forEach((customer, index) => {
      formData.append(`customer[${index}][name]`, customer.name);
      formData.append(`customer[${index}][phone]`, customer.phone);
      formData.append(`customer[${index}][email]`, customer.email);
      formData.append(`customer[${index}][address]`, customer.address);
      customer.govtIdProof.forEach((file, fileIndex) => {
        formData.append(`customer[${index}][govtIdProof][${fileIndex}]`, file);
      });
    });

    axios
      .post("https://hotel-app-kx38.onrender.com/api/book-room", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Booking successful", response.data);
        // Redirect or show success
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
        alert("Booking failed. Please try again.");
      });
  };

  console.log("Selected Room Data:", selectedRoom);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Room Booking</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Room Details */}
        {selectedRoom && (
          <div className="room-details space-y-4">
            <h3 className="text-lg font-semibold">Room Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Room Number */}
              <div>
                <label className="block font-medium">Room Number</label>
                <input
                  type="text"
                  value={selectedRoom?.roomNumber || ""}
                  readOnly
                  className="p-2 border rounded-md"
                  placeholder="Room Number"
                />
              </div>

              {/* Floor Number */}
              <div>
                <label className="block font-medium">Floor Number</label>
                <input
                  type="text"
                  value={selectedRoom?.floorNumber || ""}
                  readOnly
                  className="p-2 border rounded-md"
                  placeholder="Floor Number"
                />
              </div>

              {/* Bed Size */}
              <div>
                <label className="block font-medium">Bed Size</label>
                <input
                  type="text"
                  value={selectedRoom?.bedSize || ""}
                  readOnly
                  className="p-2 border rounded-md"
                  placeholder="Bed Size"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-medium">Category</label>
                <input
                  type="text"
                  value={selectedRoom?.category?.name || ""}
                  readOnly
                  className="p-2 border rounded-md"
                  placeholder="Category"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block font-medium">Price</label>
                <input
                  type="text"
                  value={selectedRoom?.price ? `₹${selectedRoom.price}` : ""}
                  readOnly
                  className="p-2 border rounded-md"
                  placeholder="Price"
                />
              </div>
            </div>
          </div>
        )}

        {/* Customer Details */}
        <div className="customer-details space-y-4">
          <h3 className="text-lg font-semibold">Customer Details</h3>
          {customers.map((customer, index) => (
            <div key={index} className="border p-4 rounded-md space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={(e) => handleCustomerChange(index, e)}
                  className="p-2 border rounded-md"
                  placeholder="Customer Name"
                />
                <input
                  type="text"
                  name="phone"
                  value={customer.phone}
                  onChange={(e) => handleCustomerChange(index, e)}
                  className="p-2 border rounded-md"
                  placeholder="Phone Number"
                />
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={(e) => handleCustomerChange(index, e)}
                  className="p-2 border rounded-md"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="address"
                  value={customer.address}
                  onChange={(e) => handleCustomerChange(index, e)}
                  className="p-2 border rounded-md"
                  placeholder="Address"
                />
                {/* ID Proof Section */}
                <div className="id-proof-section space-y-4">
                  <h3 className="text-lg font-semibold">ID Proofs</h3>

                  {/* Aadhaar */}
                  <div className="aadhaar-input grid grid-cols-2 gap-4 items-center">
                    <label className="block font-medium">Aadhaar</label>
                    <div className="flex items-center space-x-2">
                      {/* Aadhaar Number Inputs */}
                      <input
                        type="text"
                        maxLength="4"
                        className="p-2 border rounded-md w-16 text-center"
                        placeholder="XXXX"
                      />
                      <input
                        type="text"
                        maxLength="4"
                        className="p-2 border rounded-md w-16 text-center"
                        placeholder="XXXX"
                      />
                      <input
                        type="text"
                        maxLength="4"
                        className="p-2 border rounded-md w-16 text-center"
                        placeholder="XXXX"
                      />

                      {/* Upload Icon */}
                      <label className="cursor-pointer text-blue-500">
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(index, "aadhaar", e)
                          }
                        />
                        <AttachFileIcon
                          style={{ fontSize: "24px", color: "#007BFF" }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Driving License */}
                  <div className="driving-license-input grid grid-cols-2 gap-4 items-center">
                    <label className="block font-medium">Driving License</label>
                    <div className="flex items-center space-x-2">
                      {/* Driving License Number Input */}
                      <input
                        type="text"
                        className="p-2 border rounded-md w-full"
                        placeholder="Driving License N"
                        onChange={(e) =>
                          handleCustomerChange(index, "drivingLicense", e)
                        }
                      />

                      {/* Upload Icon */}
                      <label className="cursor-pointer text-blue-500">
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(index, "drivingLicense", e)
                          }
                        />
                        <AttachFileIcon
                          style={{ fontSize: "24px", color: "#007BFF" }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Passport */}
                  <div className="passport-input grid grid-cols-2 gap-4 items-center">
                    <label className="block font-medium">Passport</label>
                    <div className="flex items-center space-x-2">
                      {/* Passport Number Input */}
                      <input
                        type="text"
                        className="p-2 border rounded-md w-full"
                        placeholder="Passport Number"
                        onChange={(e) =>
                          handleCustomerChange(index, "passport", e)
                        }
                      />

                      {/* Upload Icon */}
                      <label className="cursor-pointer text-blue-500">
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(index, "passport", e)
                          }
                        />
                        <AttachFileIcon
                          style={{ fontSize: "24px", color: "#007BFF" }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addCustomer}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            + Add Another Customer
          </button>
        </div>

        {/* Additional Services */}
        <div className="services space-y-4">
          <h3 className="text-lg font-semibold">Additional Services</h3>
          {servicesList.map((service) => (
            <label key={service._id} className="block">
              <input
                type="checkbox"
                value={service._id}
                checked={selectedServices.includes(service._id)}
                onChange={() => handleServiceChange(service._id)}
                className="mr-2"
              />
              {service.name} - ${service.price}
            </label>
          ))}
        </div>

        {/* Total Amount */}
        <div className="total-amount">
          <h3 className="text-lg font-semibold">
            Total Amount: ${totalAmount}
          </h3>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 w-full"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default RoomBookingForm;
