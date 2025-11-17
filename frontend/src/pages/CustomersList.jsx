import { useState, useEffect } from 'react';
import { fetchCustomers, deleteCustomer } from '../services/api';
import ReactPaginate from "react-paginate";
import '../styles/CustomersList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getCustomers = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    getCustomers();
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const customersPerPage = 5;
  const offset = currentPage * customersPerPage;
  const paginatedCustomers = customers.slice(offset, offset + customersPerPage);

  const handleDelete = async (id) => {
    try {
      const response = await deleteCustomer(id);
      if (response.status === 200) {
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer._id !== id)
        );
      }
    } catch (err) {
      console.error('Error deleting customer:', err);
    }
  };

  // Filter customers based on search query
  const filteredCustomers = paginatedCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="customer-list-container">
      <h3>Customer List</h3>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box"
      />

      <ul>
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer, index) => (
            <li key={customer._id} className="customer-item">
              <span>{index + 1}. {customer.name}</span> <br />
              <span>Email: {customer.email}</span> <br />
              <span>Phone: {customer.phone}</span> <br />
              <span>Aadhaar Card: {customer.aadhaarCard}</span> <br />
              <span>Room Type: {customer.bookingDetails.roomType}</span> <br />
              <span>Check-In: {new Date(customer.bookingDetails.checkIn).toLocaleDateString()}</span> <br />
              <span>Check-Out: {new Date(customer.bookingDetails.checkOut).toLocaleDateString()}</span>
              <button onClick={() => handleDelete(customer._id)} className="delete-btn">Delete</button>
            </li>
          ))
        ) : (
          <p>No customers found</p>
        )}
      </ul>

      {/* Pagination */}
      {filteredCustomers.length > 0 && (
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(customers.length / customersPerPage)}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      )}
    </div>
  );
};

export default CustomerList;
