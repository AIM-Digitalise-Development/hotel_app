import { useEffect, useState } from "react";
import { fetchFoodEntries } from "../../utils/FoodHelper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; 

const FoodList = () => {
  const [foodEntries, setFoodEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0); 
  const entriesPerPage = 10; 
  const navigate = useNavigate();

  useEffect(() => {
    const getFoodEntries = async () => {
      setLoading(true); 
      try {
        const data = await fetchFoodEntries(currentPage, entriesPerPage, searchQuery);
        console.log("Fetched Data:", data);  
        if (data && Array.isArray(data.data)) {
          setFoodEntries(data.data); 
          setTotalEntries(data.data); 
        } else {
          throw new Error("Data is not in the expected format.");
        }
      } catch (error) {
        toast.error("Failed to fetch food entries");
      } finally {
        setLoading(false); 
      }
    };

    getFoodEntries();
  }, [currentPage, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    
    navigate(`/admin-dashboard/edit-food/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      toast.success("Food entry deleted successfully!");
      setFoodEntries(foodEntries.filter((entry) => entry._id !== id));
    } catch (error) {
      toast.error("Failed to delete food entry");
    }
  };

  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  return (
    <div className="container mx-auto my-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Food Entries</h2>

      {/* Search Box */}
      <input
        type="text"
        className="p-2 mb-4 border border-gray-300 rounded"
        placeholder="Search food entries..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Add Food Entry Button */}
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/admin-dashboard/add-food")}
      >
        Add Food Entry
      </button>

      {loading ? (
        <div className="text-center text-lg py-4">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                
                <th className="px-4 py-2 border-b border-gray-300 text-left">Category</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Subcategory</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Food Name</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Price</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Availability</th>
                <th className="px-4 py-2 border-b border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodEntries.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 border-t border-gray-300 text-gray-500"
                  >
                    No food entries found
                  </td>
                </tr>
              ) : (
                foodEntries.map((entry) => (
                  <tr key={entry._id} className="hover:bg-gray-50">
                   
                    <td className="px-4 py-2 border-b border-gray-300">{entry.category}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{entry.subcategory}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{entry.foodName}</td>
                    <td className="px-4 py-2 border-b border-gray-300">₹{entry.price.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {entry.isAvailable ? "Available" : "Not Available"}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      <button
                        onClick={() => handleEdit(entry._id)}
                        className="text-blue-500 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 bg-gray-300 text-gray-500 rounded"
            >
              Previous
            </button>
            <span className="mx-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-300 text-gray-500 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodList;
