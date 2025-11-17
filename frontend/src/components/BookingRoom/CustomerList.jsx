import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const CustomerList = () => {
  const navigate = useNavigate(); 
  const [customers, setCustomers] = useState([]);
  

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://hotel-app-kx38.onrender.com/api/customers"); 
        console.log("API Response:", response.data); 
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []); 

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`https://hotel-app-kx38.onrender.com/api/customers/${id}`);
        alert("Customer deleted successfully.");
        setCustomers(customers.filter((customer) => customer._id !== id)); // Update list without the deleted customer
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete the customer.");
      }
    }
  };

  // Handle Edit
  const handleEdit = (id) => {
    navigate(`/admin-dashboard/customers/edit/${id}`); // Redirect to the Edit Customer page
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Customer Enquiry List</h2>
        <Link
          to="/admin-dashboard/customers/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Enquiry Form
        </Link>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-6 py-2 w-1/12">SI No</th>
            <th className="border px-6 py-2 w-1/6">Customer ID</th>
            <th className="border px-6 py-2 w-1/6">Customer Name</th>
            <th className="border px-6 py-2 w-1/6">Phone No</th>
            <th className="border px-6 py-2 w-1/6">Mail ID</th>
            <th className="border px-6 py-2 w-1/4">Address</th>
            <th className="border px-6 py-2 w-1/6">Govt ID Type</th>
            <th className="border px-6 py-2 w-1/6">Govt ID Number</th>
            <th className="border px-6 py-2 w-1/6">Govt ID File</th>
            <th className="border px-6 py-2 w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(customers) &&
            customers.map((customer, index) => (
              <tr key={customer._id}>
                <td className="border px-6 py-2">{index + 1}</td>
                <td className="border px-6 py-2">{customer.customerID}</td>
                <td className="border px-6 py-2">{customer.name}</td>
                <td className="border px-6 py-2">{customer.phone}</td>
                <td className="border px-6 py-2">{customer.email || "N/A"}</td>
                <td className="border px-6 py-2">{customer.address}</td>
                <td className="border px-6 py-2">{customer.govt_id_type}</td>
                <td className="border px-6 py-2">{customer.govt_id_number}</td>
                <td className="border px-6 py-2">
                  <a
                    href={`https://hotel-app-kx38.onrender.com/${customer.govt_id_file}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View File
                  </a>
                </td>
                <td className="border px-6 py-2">
                  <button
                    onClick={() => handleEdit(customer._id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;