import "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import "../../styles/AddEmployee.css";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };

    const fetchDesignations = async () => {
      try {
        const response = await axios.get(
          "https://hotel-app-kx38.onrender.com/api/designations",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDesignations(response.data.designations);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    getDepartments();
    fetchDesignations();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    // console.log("Updated formData:", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "https://hotel-app-kx38.onrender.com/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Insert Name"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Insert Email"
              required
            />
          </div>
          <div>
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="Employee ID"
              required
            />
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              placeholder="DOB"
              required
            />
          </div>
          <div>
            <label>Date of Joining</label>
            <input
              type="date"
              name="date_of_joining"
              onChange={handleChange}
              placeholder="Joining Date"
              required
            />
          </div>
          <div>
            <label>Gender</label>
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              placeholder="Marital Status"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div>
            <label>Designation</label>
            <select name="designation" onChange={handleChange} required>
              <option value="">Select Designation</option>
              {designations.map((des) => (
                <option key={des._id} value={des._id}>
                  {des.des_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Department</label>
            <select name="department" onChange={handleChange} required>
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Salary"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="******"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label>Role</label>
            <select name="role" onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div>
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              placeholder="Upload Image"
              accept="image/*"
            />
          </div>
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default Add;
