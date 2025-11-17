import "react";
import "../../styles/ListLeave.css";
import { useEffect,useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { LeaveButtons,columns } from "../../utils/LeaveHelper";
import '../../styles/LeaveHelper.css'
import moment from 'moment';

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("https://hotel-app-kx38.onrender.com/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          // des_name: emp.designation?.des_name || "Not Assigned",
          // designation: leave.employeeId.designation.designationName, 
          days: moment(leave.endDate).diff(moment(leave.startDate), 'days'),
          status: leave.status,
          supportingDocument: leave.supportingDocument, 
          applyDate:leave.appliedAt,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  
  const filterByInput = (e) => {
    const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
   setFilteredLeaves(data)
  }
  const filterByButton = (status) => {
    const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()))
   setFilteredLeaves(data)
  }

  return (
    <>
    {filteredLeaves ? (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Emp Id"
          className="px-4 py-0.5 border"
          onChange={filterByInput}
        />
        <div className="space-x-3">
          <button className="status-btn" onClick={() => filterByButton("Pending")}>Pending</button>
          <button className="status-btn" onClick={() => filterByButton("Approved")}>Approved</button>
          <button className="status-btn" onClick={() => filterByButton("Rejected")}>Rejected</button>
        </div>
      </div>
     
     <div className="mt-3">
     <DataTable columns={columns} data={filteredLeaves} pagination/>
     </div>

    </div>
  ) : (
  <div>Loading...</div>
  )}
  </>
  );
};

export default Table;
