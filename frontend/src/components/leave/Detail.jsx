import { useEffect, useState } from "react";
import  {useNavigate, useParams}  from "react-router-dom";
import axios from "axios";
import '../../styles/ViewEmployee.css'

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, []);

  const changeStatus = async (id,status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,{status},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate('/admin-dashboard/leaves')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <>
      {leave ? (
        <div className="container">
          <h2 className="title">
            {" "}
            Leave Details
          </h2>
          <div className="details-grid">
            <div className="profile-section">
              <img
                src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                className="profile-image"
                alt="profile"
              />
            </div>
            <div className="info-section">
              <div className="info-item">
                <p className="label">Name:</p>
                <p className="value">{leave.employeeId.userId.name}</p>
              </div>
              <div className="info-item">
                <p className="label">Employee ID:</p>
                <p className="value">{leave.employeeId.employeeId}</p>
              </div>
              <div className="info-item">
                <p className="label">Leave Type:</p>
                <p className="value">
                  {leave.leaveType}
                </p>
              </div>
              <div className="info-item">
                <p className="label">Reason:</p>
                <p className="value">{leave.reason}</p>
              </div>
              <div className="info-item">
                <p className="label">Department:</p>
                <p className="value">{leave.employeeId.department.dep_name}</p>
              </div>
              <div className="info-item">
                <p className="label">Start Date:</p>
                <p className="value">{new Date (leave.startDate).toLocaleDateString()}</p>
              </div>
              <div className="info-item">
                <p className="label">End Date:</p>
                <p className="value">{new Date (leave.endDate).toLocaleDateString()}</p>
              </div>
              <div className="info-item">
                <p className="label">
                  {leave.status === "Pending" ? "Action" : "Status:"}
                 </p>
                 {leave.status === "Pending" ? ( 
                      <div className="flex space-x-2">
                         <button className="px-2 py-0.5 bg-teal-300 hover:bg-teal-400" onClick={() =>changeStatus(leave._id,"Approved") }>Approve</button>
                         <button className="px-2 py-0.5 bg-red-300 hover:bg-red-400"   onClick={() =>changeStatus(leave._id,"Rejected") }>Reject</button>
                      </div>
                   
                   ) :
                   <p className="value">{leave.status}</p>
                 }
              
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ....</div>
      )}
    </>
  );
};

export default Detail;
