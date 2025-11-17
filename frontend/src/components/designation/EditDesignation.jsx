import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDesignation = () => {
  const { id } = useParams(); // Get the ID from the route
  const [designation, setDesignation] = useState({
    des_name: "",
    description: "",
    department_id: "",
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  // Fetch designation details and departments
  useEffect(() => {
    const fetchDesignationDetails = async () => {
      try {
        const response = await axios.get(`https://hotel-app-kx38.onrender.com/api/designation/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setDesignation(response.data.designation);
        }
      } catch (error) {
        console.error("Error fetching designation details:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get("https://hotel-app-kx38.onrender.com/api/departments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setDepartments(response.data.departments);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDesignationDetails();
    fetchDepartments();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDesignation({ ...designation, [name]: value });
  };

  // Submit the updated designation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://hotel-app-kx38.onrender.com/api/designation/${id}`, designation, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        navigate("/admin-dashboard/designations");
      }
    } catch (error) {
      console.error("Error updating designation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Designation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Designation Name */}
          <div>
            <label htmlFor="des_name" className="block text-gray-700 font-semibold mb-2">
              Designation Name
            </label>
            <input
              type="text"
              id="des_name"
              name="des_name"
              value={designation.des_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Department Dropdown */}
          <div>
            <label htmlFor="department_id" className="block text-gray-700 font-semibold mb-2">
              Department
            </label>
            <select
              id="department_id"
              name="department_id"
              value={designation.department_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.dept_name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={designation.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Update Designation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDesignation;
