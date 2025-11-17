import { useEffect, useState } from "react";
import  {useParams}  from "react-router-dom";
import axios from "axios";
import '../../styles/ViewEmployee.css'

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="container">
          <h2 className="title">
            {" "}
            Employee Details
          </h2>
          <div className="details-grid">
            <div className="profile-section">
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                className="profile-image"
                alt="profile"
              />
            </div>
            <div className="info-section">
              <div className="info-item">
                <p className="label">Name:</p>
                <p className="value">{employee.userId.name}</p>
              </div>
              <div className="info-item">
                <p className="label">Employee ID:</p>
                <p className="value">{employee.employeeId}</p>
              </div>
              <div className="info-item">
                <p className="label">Date of Birth:</p>
                <p className="value">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="info-item">
                <p className="label">Gender:</p>
                <p className="value">{employee.gender}</p>
              </div>
              <div className="info-item">
                <p className="label">Department:</p>
                <p className="value">{employee.department.dep_name}</p>
              </div>
              <div className="info-item">
                <p className="label">Marital Status:</p>
                <p className="value">{employee.maritalStatus}</p>
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

export default View;
