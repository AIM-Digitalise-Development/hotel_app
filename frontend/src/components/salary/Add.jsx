import 'react'
import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { getEmployees } from '../../utils/EmployeeHelper'
import '../../styles/AddSalary.css'


const Add = () => {
    const [salary,setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    });
    const [departments,setDepartments] = useState(null);
    const [employees,setEmployees] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        const getDepartments = async () => {
        const departments = await fetchDepartments();
        setDepartments(departments);
       };
        getDepartments();

    }, []);

    const handleChange = (e) => {
        const {name,value} = e.target;
      
        setSalary((prevData) => ({...prevData, [name]: value}));
  }


    const handleSubmit =async (e) => {
        e.preventDefault();
        

        try{ 
            const response = await axios.post(`https://hotel-app-kx38.onrender.com/api/salary/add`,salary,{
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

   const handleDepartment = async (e) => { 
        const emps = await getEmployees(e.target.value)
        setEmployees(emps)
    }

  return (
    <>{departments  ? (
    <div className='add-employee-container'>
        <h2>Add Salary</h2>
        <form onSubmit={handleSubmit}>
            <div className='grid'>
            <div>
                    <label >Department</label>
                    <select name='department' onChange={handleDepartment}  required>
                        <option value="">Select Department</option>
                       {departments.map((dep) => (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>                        
                       ))}
                    </select>
                </div>
                {/* Employee */}
            <div >
                    <label >Employee</label>
                    <select name='employeeId' onChange={handleChange} required>
                        <option value="">Select Employee</option>
                       {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>{emp.employeeId}</option>                        
                       ))}
                    </select>
                </div>

                <div>
                    <label >Basic Salary</label>
                    <input type='number' name='basicSalary' onChange={handleChange} placeholder='Basic Salary' required />
                </div>

                <div>
                    <label >Allowances</label>
                    <input type='number' name='allowances' onChange={handleChange}  placeholder='Allowances'  required />
                </div>
                <div>
                    <label >Deductions</label>
                    <input type='number' name='deductions' onChange={handleChange}  placeholder='Deductions'  required />
                </div>
                <div>
                    <label >Pay Date</label>
                    <input type='date' name='payDate' onChange={handleChange}  placeholder='Pay Date'  required />
                </div>

             

            </div>
            <button type='submit'>Add Salary

            </button>
        </form>

    </div>
    ) : <div>Loading...</div>}</>
  )
}

export default Add;