import {useState,useEffect} from 'react'
import { Link ,useParams} from 'react-router-dom';
import '../../styles/ListLeave.css'
import axios from 'axios';
import { useAuth } from '../../context/authContext';


const List = () => {
   
   
    const [leaves,setLeaves] = useState(null);
    let sno = 1;
    const {id} = useParams()
    const {user} = useAuth()

    const fetchLeaves = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/leave/${id}/${user.role}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
         
          if (response.data.success) {
            setLeaves(response.data.leaves);
            
          }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.message)
            }
        }
      };
    
      useEffect(() => {
        fetchLeaves();
      }, []);

      if(!leaves){
        return <div>Loading ...</div>
      }
    
  return (
    <div className='p-6'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leaves</h3>
    </div>
    <div className='flex justify-between items-center'>
        <input
        type='text'
        placeholder='Search By Dep Name'
        className='px-4 py-0.5 border'/>
        {user.role === "employee" && (
        <Link 
        to="/employee-dashboard/add-leave"
        className="link-button">Add New Leave</Link>
  )}
    </div>
    
    <table className="table">
              <thead >
                <tr>
                  <th >SNo</th>
                  <th >Leave Type</th>
                  <th >From</th>
                  <th >To</th>
                  <th >Description</th>
                  <th >Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr
                    key={leave._id}
                   
                  >
                    <td >{sno++}</td>
                    <td >{leave.leaveType}</td>
                    <td >{new Date(leave.startDate).toLocaleDateString()}</td>
                    {/* <td >{new Date(leave.startDate).toLocaleDateString()}</td> */}
                    <td >{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td >{leave.reason}</td>
                    <td >{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>



    </div>
  )
}

export default List