import  { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { columns, DesignationButtons } from "./DesignationHelper";
import axios from "axios";

const ListDesignation = () => {
  const [designations, setDesignations] = useState([]);

  const fetchDesignations = async () => {
    try {
      console.log("helllll");
      
      const response = await axios.get("https://hotel-app-kx38.onrender.com/api/designation", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const data = response.data.designations.map((designation, index) => ({
          ...designation,
          sno: index + 1,
          action: <DesignationButtons Id={designation._id} onDesignationDelete={fetchDesignations} />,
        }));
        setDesignations(data);
      }
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Designation List</h2>
        <DataTable columns={columns} data={designations} pagination />
      </div>
    </div>
  );
};

export default ListDesignation;
