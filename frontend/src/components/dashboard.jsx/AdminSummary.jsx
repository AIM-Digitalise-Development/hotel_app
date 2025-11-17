// import 'react'
// import SummaryCard from './SummaryCard'
// import { FaBuilding, FaMoneyBillWave, FaFileAlt, FaHourglassHalf, FaTimesCircle, FaUsers, FaCheckCircle } from 'react-icons/fa'
// import '../../styles/AdminSummary.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios'

// const AdminSummary = () => {
//   const [summary,setSummary] = useState(null)

//   useEffect(() => {
//   const fetchSummary = async () => {
//     try{
//       const summary = await axios.get('https://hotel-app-kx38.onrender.com/api/dashboard/summary',{
//         headers : {
//           "Authorization" : `Bearer ${localStorage.getItem('token')}`
//         }
//       })
//       console.log(summary.data)
//       setSummary(summary.data)
//     }catch(error){
//       if(error.response){
//         alert(error.response.data.error)
//       }
//       console.log(error.message)
      
//     }
//   }
//   fetchSummary()
//   },[])

//   if(!summary){
//     return <div>Loading...</div>
//   }
//   return (
//     <div className="admin-summary">
//           <h3>Dashboard Overview</h3>
//           <div className="summary-grid">
//             <SummaryCard icon={<FaUsers/>} text="Total Employees" number={summary.totalEmployees} color='bg-teal-600' />
//             <SummaryCard icon={<FaBuilding/>} text="Total Departments" number={summary.totalDepartments} color='bg-yellow-600' />
//             <SummaryCard icon={<FaMoneyBillWave/>} text="Monthly Salary" number={summary.totalSalary} color='bg-red-600'/>
//         </div>

//         <div className="leave-details">
//         <h4>Leave Details</h4>
//         <div className="leave-details-grid">
//             <SummaryCard icon={<FaFileAlt/>} text="Leave Applied" number={summary.leaveSummary.appliedFor} color='bg-teal-600' />
//             <SummaryCard icon={<FaCheckCircle/>} text="Leave Approved" number={summary.leaveSummary.approved} color='bg-teal-600' />
//             <SummaryCard icon={<FaHourglassHalf/>} text="Leave Pending" number={summary.leaveSummary.rejected} color='bg-yellow-600'/>
//             <SummaryCard icon={<FaTimesCircle/>} text="Leave Rejected" number={summary.leaveSummary.pending} color='bg-red-600'/>
//             </div>

//         </div>
//     </div>
//   )
// }

// export default AdminSummary