import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Room.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const navigate = useNavigate();

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        if (Array.isArray(response.data)) {
          setRooms(response.data);
          setFilteredRooms(response.data);
        } else {
          console.error('API response is not an array');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredRooms(
      rooms.filter((room) =>
        Object.values(room).some((val) =>
          String(val).toLowerCase().includes(value)
        )
      )
    );
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle edit action
  const handleEdit = (room) => {
    setSelectedRoom(room);
    navigate('/add-room', { state: { room } }); // Navigate to room form with selected room data
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/rooms/${id}`);
      const updatedRooms = rooms.filter((room) => room._id !== id);
      setRooms(updatedRooms);
      setFilteredRooms(updatedRooms);
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  // Handle pagination
  const handlePageChange = (page) => setCurrentPage(page);

  // Paginate filtered rooms
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="room-list-container">
      <div className="room-search-box-container">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          className="room-search-box"
        />
        <div className="add-room-btn-container">
          <button
            className="add-room-btn"
            onClick={() => navigate('/admin-dashboard/add-room')}
          >
            Add Room
          </button>
        </div>
      </div>
      <div className="room-table-container">
        <table className="room-table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>No. of Persons</th>
              <th>Price</th>
              <th>Room Status</th>
              <th>Booking Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRooms.length > 0 ? (
              paginatedRooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomType}</td>
                  <td>{room.numPersons}</td>
                  <td>{room.price}</td>
                  <td>{room.roomStatus ? 'Available' : 'Unavailable'}</td>
                  <td>{room.bookingStatus ? 'Booked' : 'Not Booked'}</td>
                  <td>
                    <button onClick={() => handleEdit(room)}>Edit</button>
                    <button onClick={() => handleDelete(room._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="room-pagination">
          {Array.from(
            { length: Math.ceil(filteredRooms.length / rowsPerPage) },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomList;
