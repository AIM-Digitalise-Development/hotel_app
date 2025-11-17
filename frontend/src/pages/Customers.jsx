import { useState } from 'react';
import { addCustomer } from '../services/api'; // Assuming you have an API call to save the customer
import { useNavigate } from 'react-router-dom'; // For navigation to the customer list page
import '../styles/Customers.css';
import { toast } from 'react-toastify'; // Importing toast
import 'react-toastify/dist/ReactToastify.css';

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    aadhaarCard: '',
    bookingDetails: {
      roomType: '',
      checkIn: '',
      checkOut: '',
    },
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookingDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      bookingDetails: {
        ...prevData.bookingDetails,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCustomer(customerData);
  
      // Check if the response includes data that indicates success
      if (response && response._id) { // Assuming that the customer object has an _id field on success
        toast.success('Customer added successfully!');
        navigate('/customer-list'); // Navigate to the customer list page
      } else {
        throw new Error('Error: Failed to add customer');
      }
    } catch (err) {
      console.error('Error saving customer:', err);
      toast.error(`Error saving customer: ${err.message}`);
    }
  };

  return (
    <div className="customers-container">
  <h3>Add Customer</h3>
  <form className="customer-form" onSubmit={handleSubmit}>
    <div>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={customerData.name}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={customerData.email}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label>Phone:</label>
      <input
        type="text"
        name="phone"
        value={customerData.phone}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label>Aadhaar Card:</label>
      <input
        type="text"
        name="aadhaarCard"
        value={customerData.aadhaarCard}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label>Room Type:</label>
      <input
        type="text"
        name="roomType"
        value={customerData.bookingDetails.roomType}
        onChange={handleBookingDetailsChange}
        required
      />
    </div>
    <div>
      <label>Check-In Date:</label>
      <input
        type="date"
        name="checkIn"
        value={customerData.bookingDetails.checkIn}
        onChange={handleBookingDetailsChange}
        required
      />
    </div>
    <div>
      <label>Check-Out Date:</label>
      <input
        type="date"
        name="checkOut"
        value={customerData.bookingDetails.checkOut}
        onChange={handleBookingDetailsChange}
        required
      />
    </div>

    <button type="submit">Save Customer</button>
  </form>

  <button onClick={() => navigate('/customer-list')} className="view-list-btn">
    View Customer List
  </button>
</div>

  );
};

export default AddCustomer;
