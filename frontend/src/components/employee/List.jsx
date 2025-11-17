import "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { columns,EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import '../../styles/ListEmployee.css'




const List = () => {
    const [employees,setEmployees] = useState([]);
    const [empLoading,setEmpLoading] = useState(false);
    const [filteredEmployees,setFilteredEmployees] = useState([])

    useEffect (() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
               try{
                 const response = await axios.get('https://hotel-app-kx38.onrender.com/api/employee',{
                   headers: {
                     Authorization : `Bearer ${localStorage.getItem('token')}`,
                   },
                 });
                 if(response.data.success){
                      let sno = 1;
                      const data = await response.data.employees.map((emp) =>({
                         _id: emp._id,
                         sno: sno++,
                         dep_name: emp.department.dep_name,
                         des_name: emp.designation?.des_name || "Not Assigned",
                         name: emp.userId.name,
                         dob: new Date(emp.dob).toLocaleDateString(),
                         date_of_joining: new Date(emp.date_of_joining).toLocaleDateString(),
                         profileImage: <img width={40} className="rounded-full" src={`https://hotel-app-kx38.onrender.com/${emp.userId.profileImage}`} />,
                         action: (<EmployeeButtons Id={emp._id} />),
                       }
                      ));
                      setEmployees(data);
                      setFilteredEmployees(data)
                 }
   
               }catch(error){
                 if(error.response && !error.response.data.success){
                   alert(error.response.data.error)
               }
               } finally{
                setEmpLoading(false)
               }
        };
        fetchEmployees();
     },[]);

     const handleFilter = (e) => {
       const records = employees.filter((emp) => (
        emp.name.toLowerCase().includes(e.target.value.toLowerCase())

       ))
       setFilteredEmployees(records)
      }

  return (
    <div className="list-container">
      <div className="header">
        <h3 className="title">Manage Employees</h3>
      </div>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="search-input"
          onChange={handleFilter}
       
        />
        <Link to="/admin-dashboard/add-employee" 
        className="add-button">
          Add New Employee
        </Link>
      </div>
      <div>
        <DataTable
          title="Employee List"
          columns={columns}
          data={filteredEmployees}
          pagination
          progressPending={empLoading}
          persistTableHead
          progressComponent={<h2>Loading...</h2>}
        />
      </div>
    </div>
  );
};

export default List;
