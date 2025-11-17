import  { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const {id} = useParams()
    const [department,setDepartment] = useState([])
    const [depLoading,setDepLoading] = useState(false)
    const navigate = useNavigate()

    useEffect (() => {
        const fetchDepartments = async () => {
            setDepLoading(true)
               try{
                 const response = await axios.get(`https://hotel-app-kx38.onrender.com/api/department/${id}`,{
                   headers: {
                     Authorization : `Bearer ${localStorage.getItem('token')}`,
                   },
                 });
                 if(response.data.success){
                   setDepartment(response.data.department)
                 }
   
               }catch(error){
                 if(error.response && !error.response.data.success){
                   alert(error.response.data.error)
               }
               } finally{
                 setDepLoading(false)
               }
        };
        fetchDepartments();
     },[]);


     const handleChange = (e) => {
        const {name,value} = e.target;
        setDepartment({...department, [name] : value});

    };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{ 
        const response = await axios.put(`https://hotel-app-kx38.onrender.com/api/department/${id}`,department,{
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.data.success){
              navigate("/admin-dashboard/departments")
        }

    }catch(error){
        if(error.response && !error.response.data.success){
            alert(error.response.data.error)
        }

    }
  }

  return (
    <>{depLoading ? <div>Loading...</div> : 
    <div className="add-department-container">
    <h2 className="add-department-title">Edit Department</h2>
    <form onSubmit={handleSubmit} className="add-department-form">
      <div>
        <label htmlFor="dep_name">Department Name</label>
        <input type="text" name="dep_name" 
         onChange={handleChange}
         value={department.dep_name}
         placeholder="Department Name" required/>
      </div>

      <div className="mt-3">
        <label htmlFor="description">Description</label>
        <textarea name="description" placeholder="Description"
         onChange={handleChange} 
         value={department.description}
         rows="4"/>
      </div>
      <button type="submit" className="add-department-button">Edit Department</button>
    </form>
  </div>
  }</>
  )
}

export default EditDepartment