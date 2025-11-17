import { useEffect, useState } from 'react';
import { fetchRoomCategories, deleteRoomCategory } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RoomCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust this based on your needs

  const navigate = useNavigate(); // Use useNavigate for navigation

  // Fetch categories with pagination
  const loadCategories = async () => {
    try {
      const { data } = await fetchRoomCategories(currentPage, itemsPerPage);
      setCategories(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await deleteRoomCategory(id);
      loadCategories(); // Refresh categories after deletion
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete category');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    navigate('/admin-dashboard/room-category/add'); // Use navigate to go to the add category page
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    loadCategories();
  }, [currentPage]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Room Categories</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>

      {/* Add Category Button */}
      <button
        onClick={handleAddCategory}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Room Category
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            {/* <th className="border border-gray-300 px-4 py-2">Price</th> */}
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category._id}>
              <td className="border border-gray-300 px-4 py-2">{category.name}</td>
              {/* <td className="border border-gray-300 px-4 py-2">${category.price}</td> */}
              <td className="border border-gray-300 px-4 py-2">{category.description}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
        >
          Previous
        </button>
        <span className="text-lg">{`Page ${currentPage}`}</span>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoomCategoryList;
