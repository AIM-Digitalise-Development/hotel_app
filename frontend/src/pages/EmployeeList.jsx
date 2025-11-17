import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchEmployees, deleteEmployee } from '../services/api';
import '../styles/EmployeeList.css';

const EmployeeList = ({ onEdit }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch the employee data
  const fetchData = async () => {
    const query = `search=${search}&page=${currentPage}`;
    const data = await fetchEmployees(query);
    setEmployees(data);
  };

  useEffect(() => {
    fetchData();
  }, [search, currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee(id);
      fetchData();
    }
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Employee List</h1>
      <input 
        type="text" 
        placeholder="Search..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="border p-2 mb-4" 
      />
      
      <table className="employee-table">
        <thead>
          <tr>
            <th>Si No</th>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Email</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id}>
              <td>{(currentPage - 1) * 10 + index + 1}</td> {/* Serial Number */}
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.department}</td> 
              <td>{emp.email}</td>
              <td>
                <button 
                  onClick={() => onEdit(emp)} 
                  className="bg-yellow-500 px-2 py-1 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(emp._id)} 
                  className="bg-red-500 px-2 py-1 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

EmployeeList.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default EmployeeList;
