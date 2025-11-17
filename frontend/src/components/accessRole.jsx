import { useState } from "react";
import { Switch } from "@mui/material"; 
import { FaUser } from "react-icons/fa";

const AccessManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      view: true,
      edit: false,
      delete: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      view: true,
      edit: true,
      delete: false,
    },
  ]);

  const handleSwitchChange = (id, permission) => (event) => {
    setEmployees((prevState) =>
      prevState.map((employee) =>
        employee.id === id
          ? { ...employee, [permission]: event.target.checked }
          : employee
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Access Management</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Employee Name</th>
            <th className="border px-4 py-2">View</th>
            <th className="border px-4 py-2">Edit</th>
            <th className="border px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border px-4 py-2 flex items-center">
                <FaUser className="mr-2" />
                {employee.name}
              </td>
              <td className="border px-4 py-2 text-center">
                <Switch
                  checked={employee.view}
                  onChange={handleSwitchChange(employee.id, "view")}
                  inputProps={{ "aria-label": "view permission" }}
                />
              </td>
              <td className="border px-4 py-2 text-center">
                <Switch
                  checked={employee.edit}
                  onChange={handleSwitchChange(employee.id, "edit")}
                  inputProps={{ "aria-label": "edit permission" }}
                />
              </td>
              <td className="border px-4 py-2 text-center">
                <Switch
                  checked={employee.delete}
                  onChange={handleSwitchChange(employee.id, "delete")}
                  inputProps={{ "aria-label": "delete permission" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccessManagement;
