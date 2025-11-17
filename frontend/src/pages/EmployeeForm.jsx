import { useState, useEffect } from 'react';
import { addEmployee, updateEmployee } from '../services/api';
import '../styles/EmployeeForm.css'

const EmployeeForm = ({ onSuccess, editingEmployee = null, onClose }) => {
  const [employee, setEmployee] = useState({
    name: editingEmployee?.name || '',
    role: editingEmployee?.role || '',
    department: editingEmployee?.department || '',
    email: editingEmployee?.email || '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        // Update employee data
        await updateEmployee(editingEmployee._id, employee);
        setMessage('Employee updated successfully!');
      } else {
        // Add new employee
        await addEmployee(employee);
        setMessage('Employee added successfully!');
      }
      setTimeout(() => {
        onSuccess(); // Notify parent component to refresh data
        onClose();   // Close form
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl mb-4">{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} required className="block mb-2 p-2 border" />
      <input type="text" name="role" placeholder="Role" value={employee.role} onChange={handleChange} required className="block mb-2 p-2 border" />
      <input type="text" name="department" placeholder="Department" value={employee.department} onChange={handleChange} required className="block mb-2 p-2 border" />
      <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} required className="block mb-2 p-2 border" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingEmployee ? 'Update' : 'Save'}</button>
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </form>
  );
};

export default EmployeeForm;
