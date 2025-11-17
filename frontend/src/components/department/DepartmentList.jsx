import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';
import '../../styles/ListDepartment.css'

const DepartmentList = () => {
  const [departments,setDepartments] = useState([]);
  const [depLoading,setDepLoading] = useState(false);
  const [filteredDepartments,setFilteredDepartments] = useState([])

  const onDepartmentDelete = () => {
    fetchDepartments()
    // const data = departments.filter((dep) => dep._id !== id);
    // setFilteredDepartments(data);
  
    // Update the filtered list based on the updated state
    // setFilteredDepartments((prevFiltered) =>
    //   prevFiltered.filter((dep) => dep._id !== id)
    // );
  };
  
  const fetchDepartments = async () => {
    console.log("hello")
    setDepLoading(true);
       try{
         const response = await axios.get('http://localhost:5000/api/department',{
           headers: {
             Authorization : `Bearer ${localStorage.getItem('token')}`,
           },
         });
         console.log("hellllloooo",response)
         if(response.data.success){
              console.log("hi")
              let sno = 1;
              console.log("aaa",response.data.data)
              const data = await response.data.data.map((dep) =>({
                 _id: dep._id,
                 sno: sno++,
                 dep_name: dep.dep_name,
                 action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>),
               }
              
              ));
              console.log("aaaa");
              console.log("hii",data);
              setDepartments(data);
              setFilteredDepartments(data)
         }

       }catch(error){
         if(error.response && !error.response.data.success){
           alert(error.response.data.error)
       }
       } finally{
         setDepLoading(false)
       }
};
  
  useEffect (() => {
    
     fetchDepartments();
  },[]);

   const filterDepartments = (e) => {
      const records = departments.filter((dep) => 
        dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()) )
     setFilteredDepartments(records)

   }

  return (
     <>{depLoading ? <div className="loading">Loading ...</div> : 
    <div className='container'>
      <div className='text-center'>
        <h3 className='title'>Manage Departments</h3>
      </div>
      <div className='flex-container'>
        <input type='text' placeholder='Search By Dep Name' className='search-input' onChange={filterDepartments}/>
        <Link to="/admin-dashboard/add-department" className='add-button'>Add New Department</Link>
      </div>
      <div className="table-container">
           <DataTable
           columns = {columns} data={filteredDepartments} pagination/>
      </div>
    </div>
    }</>
  );
};

export default DepartmentList