// src/components/itemEntry/ListItemEntry.jsx
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItemEntries } from "../../utils/ItemEntryHelper";
import { toast } from "react-toastify";

const ListItemEntry = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchItemEntries();
  }, [page]);

  const fetchItemEntries = async () => {
    try {
      const response = await getItemEntries(page, itemsPerPage, searchQuery);
      if (response.success) {
        setItems(response.data);
      }
    } catch (error) {
      toast.error("Error fetching items");
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to page 1 when search changes
  };

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Item Entries</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search items..."
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full"
      />

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Availability</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{item.itemName}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">{item.availability}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500">Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={() => handlePagination(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md mr-2"
        >
          Prev
        </button>
        <button
          onClick={() => handlePagination(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Next
        </button>
      </div>

      <div className="mt-6">
        <Link to="/admin-dashboard/item-entry/add" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add Item Entry
        </Link>
      </div>
    </div>
  );
};

export default ListItemEntry;
