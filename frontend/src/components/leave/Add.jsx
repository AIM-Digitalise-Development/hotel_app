import { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AddLeave.css";

const Add = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
    leaveType: "",
    startDate: "",
    startHalf: "",
    endDate: "",
    endHalf: "",
    reason: "",
    supportingDocument: null, // To store the uploaded file
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLeave((prevState) => ({ ...prevState, supportingDocument: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(leave).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value); // Log all form data
      }

      const response = await axios.post(
        `https://hotel-app-kx38.onrender.com/api/leave/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           
          },
        }
      );

      if (response.data.success) {
        
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="header">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Leave Type</label>
          <select
            name="leaveType"
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>
        <div className="grid">
          <div className="form-group">
            <label className="label">From Date</label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">From Half</label>
            <select
              name="startHalf"
              onChange={handleChange}
              className="select"
              required
            >
              <option value="">Select</option>
              <option value="FH">First Half</option>
              <option value="SH">Second Half</option>
            </select>
          </div>
        </div>
        <div className="grid">
          <div className="form-group">
            <label className="label">To Date</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">To Half</label>
            <select
              name="endHalf"
              onChange={handleChange}
              className="select"
              required
            >
              <option value="">Select</option>
              <option value="FH">First Half</option>
              <option value="SH">Second Half</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="label">Description</label>
          <textarea
            name="reason"
            placeholder="Reason for leave"
            onChange={handleChange}
            className="textarea"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label className="label">Supporting Documents (Optional)</label>
          <input
            type="file"
            name="supportingDocument"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <button type="submit" className="button">
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default Add;
