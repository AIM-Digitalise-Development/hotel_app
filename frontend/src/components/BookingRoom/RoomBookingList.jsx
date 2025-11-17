import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaBed } from "react-icons/fa";

const RoomEntryList = () => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "roomNumber",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomsPerPage] = useState(5); // Number of rooms per page

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rooms");
        console.log("Fetched rooms:", res.data); // Log response data
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching room entries:", error);
      }
    };
    fetchRooms();
  }, []);

  // Search functionality
  const filteredRooms = rooms.filter(
    (room) =>
      room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.floorNumber.toString().includes(searchQuery) ||
      room.bedSize.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.price.toString().includes(searchQuery)
  );

  // Sorting functionality
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination functionality
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = sortedRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const totalPages = Math.ceil(sortedRooms.length / roomsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleRoomSelection = (roomId) => {
    setSelectedRooms((prevSelectedRooms) => {
      if (prevSelectedRooms.includes(roomId)) {
        return prevSelectedRooms.filter((id) => id !== roomId);
      }
      return [...prevSelectedRooms, roomId];
    });
  };

  const handleSelectAll = () => {
    if (selectedRooms.length === currentRooms.length) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms(currentRooms.map((room) => room._id));
    }
  };
  const handleDelete = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`http://localhost:5000/api/rooms/${roomId}`);
        setRooms((prevRooms) =>
          prevRooms.filter((room) => room._id !== roomId)
        );
        alert("Room deleted successfully.");
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Failed to delete room. Please try again.");
      }
    }
  };

  return (
    <div
      style={{ maxWidth: "1115px" }}
      className="mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Rooms List</h2>
      <div className="mb-4 flex justify-between items-center">
        <Link
          to="/admin-dashboard/book-room"
          className="inline-block bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800"
        >
          Add New Room Booking
        </Link>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">
              <input
                type="checkbox"
                checked={selectedRooms.length === currentRooms.length}
                onChange={handleSelectAll}
              />
            </th>
            <th
              className="px-4 py-2 border-b text-left cursor-pointer"
              onClick={() => handleSort("roomNumber")}
            >
              Room Number
            </th>
            <th
              className="px-4 py-2 border-b text-left cursor-pointer"
              onClick={() => handleSort("floorNumber")}
            >
              Floor Number
            </th>
            <th
              className="px-4 py-2 border-b text-left cursor-pointer"
              onClick={() => handleSort("category.name")}
            >
              Category
            </th>
            <th
              className="px-4 py-2 border-b text-left cursor-pointer"
              onClick={() => handleSort("bedSize")}
            >
              Bed Type
            </th>

            <th
              className="px-4 py-2 border-b text-left cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price
            </th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-8 py-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRooms.map((room, index) => (
            <tr
              key={room._id}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`} // Alternating row colors
            >
              <td className="px-4 py-2 border-b">
                <input
                  type="checkbox"
                  checked={selectedRooms.includes(room._id)}
                  onChange={() => handleRoomSelection(room._id)}
                />
              </td>
              <td className="px-4 py-2 border-b">{room.roomNumber}</td>
              <td className="px-4 py-2 border-b">{room.floorNumber}</td>
              <td className="px-4 py-2 border-b">{room.category.name}</td>
              <td className="px-4 py-2 border-b">{room.bedSize}</td>
              <td className="px-4 py-2 border-b">₹{room.price}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`px-3 py-1 rounded-full ${
                    room.status === "Booked"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {room.status}
                </span>
              </td>
              <td className="px-4 py-2 border-b flex items-center space-x-2">
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-yellow-600">
                  <FaEdit size={10} />
                </button>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  <FaTrashAlt size={10} />
                </button>
                <Link
                  to={{
                    pathname: "/admin-dashboard/book-room",
                    state: { rooms, selectedRooms },
                  }}
                >
                  <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
                    <FaBed size={20} />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoomEntryList;
