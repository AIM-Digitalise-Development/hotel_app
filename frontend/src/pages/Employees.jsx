import { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import { fetchEmployees } from '../services/api';

const Employees = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

  // Fetch employees from the API
  const fetchEmployeeData = async () => {
    const data = await fetchEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  // Handle the edit
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // Handle successful save (either add or update)
  const handleSuccess = () => {
    setShowForm(false);
    setEditingEmployee(null);
    fetchEmployeeData(); // Re-fetch employee list after update or add
  };

  return (
    <div className="p-4">
      {!showForm ? (
        <>
          <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">Add Employee</button>
          <EmployeeList employees={employees} onEdit={handleEdit} />
        </>
      ) : (
        <EmployeeForm onSuccess={handleSuccess} editingEmployee={editingEmployee} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Employees;
