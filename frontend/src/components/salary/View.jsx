import  { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import '../../styles/SalaryView.css'
import { useAuth } from "../../context/authContext";

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;
  const {user} = useAuth()

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`https://hotel-app-kx38.onrender.com/api/salary/${id}/${user.role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
        if(error.response && !error.response.data.success){
            alert(error.message)
        }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (q) => {
    const filteredRecords = salaries.filter((leave) =>
      leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="container">
          <div className="text-center">
            <h2 className="heading">Salary History</h2>
          </div>
          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search by Emp ID"
              className="input"
              onChange={filterSalaries}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="table">
              <thead >
                <tr>
                  <th >S.No</th>
                  <th >Emp ID</th>
                  <th >Salary</th>
                  <th >Allowance</th>
                  <th >Deduction</th>
                  <th >Total</th>
                  <th >Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr
                    key={salary._id}
                   
                  >
                    <td >{sno++}</td>
                    <td >{salary.employeeId.employeeId}</td>
                    <td >{salary.basicSalary}</td>
                    <td >{salary.allowances}</td>
                    <td >{salary.deductions}</td>
                    <td >{salary.netSalary}</td>
                    <td >
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Records</div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
