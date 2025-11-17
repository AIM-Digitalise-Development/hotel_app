import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const DesignationList = () => {
  const [designations, setDesignations] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [totalPages, setTotalPages] = useState(1); // For total pages
  const [itemsPerPage] = useState(5); // Number of items per page
  const navigate = useNavigate();


  const fetchDesignations = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/designations`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("hellooo22222222",response.data.designations);
      
      if (response.data.success) {
        setDesignations(response.data.designations);
        setTotalPages(response.data.totalPages); // Assuming totalPages is sent from the backend
      }
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  // Fetch designations with pagination and search
  useEffect(() => {
   
    fetchDesignations();
  }, [currentPage, searchTerm]);

  const handleView = (id) => {
    navigate(`/admin-dashboard/designations/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin-dashboard/designations/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this designation?")) {
      try {
        await axios.delete(`http://localhost:5000/api/designations/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDesignations(designations.filter((designation) => designation.id !== id));
      } catch (error) {
        console.error("Error deleting designation:", error);
      }
    }
  };

  // Handle pagination change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Designation List</h2>

        {/* Search Box */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search designations..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-1/3"
          />
          <button
            onClick={() => navigate("/admin-dashboard/designations/add")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Designation
          </button>
        </div>

        {/* Table of Designations */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Designation Name</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {designations.length > 0 ? (
             designations.map((designation, index) => (
              <tr key={designation._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td> {/* Index starts from 0, so add 1 */}
                <td className="border border-gray-300 px-4 py-2">{designation.des_name}</td>
                <td className="border border-gray-300 px-4 py-2">{designation.department_id.dep_name}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center items-center space-x-4">
                  {/* <button
                    onClick={() => handleView(designation._id)}
                    className="text-blue-500 hover:text-blue-600"
                    title="View"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button> */}
                  <button
                    onClick={() => handleEdit(designation._id)}
                    className="text-green-500 hover:text-green-600"
                    title="Edit"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(designation._id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No designations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mx-1"
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mx-1"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignationList;
