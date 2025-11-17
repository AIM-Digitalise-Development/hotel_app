import 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import '../../styles/AddEmployee.css'
// import Employee from './../../../../backend/models/Employee';


const Edit = () => {
    const [employee,setEmployee] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        salary: 0,
        department: ""
    });
    const [departments,setDepartments] = useState(null);
    const navigate = useNavigate()
    const {id} = useParams()


    
    useEffect(() => {
        const getDepartments = async () => {
        const departments = await fetchDepartments();
        setDepartments(departments);
       };
        getDepartments();

    }, []);



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
                const employee = response.data.employee;
                setEmployee((prev) => ({...prev,name: employee.userId.name, maritalStatus:employee.maritalStatus, designation:employee.designation, salary:employee.salary, department:employee.department}));
              }
            } catch (error) {
              if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
              }
            }
          };
          fetchEmployee();

    }, []);

    const handleChange = (e) => {
        const {name,value} = e.target;
      
        setEmployee((prevData) => ({...prevData, [name]: value}))
  }


    const handleSubmit =async (e) => {
        e.preventDefault();
        

        try{ 
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`,employee,{
                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                  navigate("/admin-dashboard/employees")
            }

        }catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }

        }
    }

  return (
    <>{departments && employee ? (
    <div className='add-employee-container'>
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
            <div className='grid'>
                <div>
                    <label>Name</label>
                    <input type='text' name='name' value={employee.name} onChange={handleChange} placeholder='Insert Name' required />
                </div>
                {/* <div>
                    <label>Email</label>
                    <input type='email' name='email' onChange={handleChange} placeholder='Insert Email'  required />
                </div> */}
                {/* <div>
                    <label>Employee ID</label>
                    <input type='text' name='employeeId'onChange={handleChange}  placeholder='Employee ID' required />
                </div> */}
                {/* <div>
                    <label >Date of Birth</label>
                    <input type='date' name='dob' onChange={handleChange} placeholder='DOB'  required />
                </div> */}
                {/* <div>
                    <label>Gender</label>
                   <select name='gender' onChange={handleChange}  required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                   </select>
                </div> */}
                <div>
                    <label >Marital Status</label>
                    <select name='maritalStatus' onChange={handleChange} value={employee.maritalStatus} placeholder="Marital Status" required>
                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                </div>

                <div>
                    <label >Designation</label>
                    <input type='text' name='designation' onChange={handleChange} value={employee.designation} placeholder='Designation' required />
                </div>

                <div>
                    <label >Salary</label>
                    <input type='number' name='salary' onChange={handleChange} value={employee.salary} placeholder='Salary'  required />
                </div>

                <div className='col-span-2'>
                    <label >Department</label>
                    <select name='department' onChange={handleChange} value={employee.department}  required>
                        <option value="">Select Department</option>
                       {departments.map((dep) => (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>                        
                       ))}
                    </select>
                </div>
               
                {/* <div>
                    <label >Password</label>
                    <input type='password' name='password'  placeholder='******' onChange={handleChange}  required></input>
                </div> */}
                {/* <div>
                    <label >Role</label>
                    <select name='role' onChange={handleChange}  required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>    
                </div> */}
                {/* <div>
                    <label >Upload Image</label>
                    <input type='file' name='image' onChange={handleChange} placeholder='Upload Image' accept='image/*'  />
                </div> */}

            </div>
            <button type='submit'>Edit Employee

            </button>
        </form>

    </div>
    ) : <div>Loading...</div>}</>
  )
}

export default Edit;