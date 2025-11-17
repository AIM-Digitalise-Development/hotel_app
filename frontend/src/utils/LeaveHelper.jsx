import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "Apply Date",
    selector: (row) => moment(row.applyDate).format('YYYY-MM-DD'), // Format as per your requirement
    width: "150px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "120px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "170px",
  },
//   {
//     name: "Designation",
//     selector: (row) => row.employeeId?.designation?.designationName, 
//     width: "150px"
//   },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "140px",
  },
//   {
//     name: "Leave Duration",
//     selector: (row) => {
//         if (row.leaveDuration === "FD") {
//             return "Full Day";
//         } else if (row.leaveDuration === "FH") {
//             return "First Half";
//         } else if (row.leaveDuration === "SH") {
//             return "Second Half";
//         }
//     },
//     width: "120px"
// },
 
  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
  },
  {
    name: "Supporting Document",  // New column for supporting document
    cell: (row) => (
      row.supportingDocument ? (
        <a
          href={`https://hotel-app-kx38.onrender.com/${row.supportingDocument}`}  // Adjust the URL as per your backend setup
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-file-alt" style={{ cursor: "pointer", fontSize: "18px" }}></i>  {/* Example icon */}
        </a>
      ) : (
        <span>No Document</span>
      )
    ),
    width: "150px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "120px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <button
      className="leave-button"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  );
};
