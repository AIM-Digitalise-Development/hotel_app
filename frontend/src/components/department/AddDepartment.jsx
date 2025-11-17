import axios from "axios";
import "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/AddDepartment.css'


const AddDepartment = () => {
    const [department,setDepartment] = useState({
        dep_name: '',
        description: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name,value} = e.target;
        setDepartment({...department, [name] : value});

    };
    
    const handleSubmit = async (e)  => {
        e.preventDefault()
        try{ 
            const response = await axios.post('https://hotel-app-kx38.onrender.com/api/department/add',department,{
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
    <div className="add-department-container">
      <h2 className="add-department-title">Add Department</h2>
      <form onSubmit={handleSubmit} className="add-department-form">
        <div>
          <label htmlFor="dep_name">Department Name</label>
          <input type="text" name="dep_name" 
           onChange={handleChange}
           placeholder="Department Name" required/>
        </div>

        <div className="mt-3">
          <label htmlFor="description">Description</label>
          <textarea name="description" placeholder="Description"
           onChange={handleChange} rows="4"/>
        </div>
        <button type="submit" className="add-department-button">Add Department</button>
      </form>
    </div>
  );
};

export default AddDepartment;
