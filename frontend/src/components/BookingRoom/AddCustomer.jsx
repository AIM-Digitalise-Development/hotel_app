import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddCustomer = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    govt_id_type: "",
    govt_id_number: "",
    govt_id_file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post("https://hotel-app-kx38.onrender.com/api/customers", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Customer added successfully!");
      console.log("Response:", response.data);

      // Navigate to customer list page after successful addition
      navigate("/admin-dashboard/customers"); // Redirect to the customer list page
    } catch (error) {
      console.error("Error adding customer:", error.response?.data || error.message);
      alert("Error adding customer!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Enquiry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Customer Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Email (Optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Govt ID Type</label>
          <select
            name="govt_id_type"
            value={formData.govt_id_type}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2"
          >
            <option value="">Select</option>
            <option value="Aadhar Card">Aadhar Card</option>
            <option value="Voter ID">Voter ID</option>
            <option value="Driving License">Driving License</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Govt ID Number</label>
          <input
            type="text"
            name="govt_id_number"
            value={formData.govt_id_number}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Govt ID File</label>
          <input
            type="file"
            name="govt_id_file"
            onChange={handleChange}
            required
            className="w-full border px-3 py-2"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
