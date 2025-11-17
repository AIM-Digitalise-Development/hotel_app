import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
// import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  const { user } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <div className="admin-navbar bg-light-blue p-4 flex justify-between items-center shadow-md">
      {/* Welcome Text */}
      {/* <div>
      <Link to="/admin-dashboard" className="text-white font-bold text-lg">
          Welcome {user.name}
        </Link>
      </div> */}

      {/* Centered Navigation Buttons */}
      <div className="flex gap-1 items-center justify-center flex-grow">
        {/* Employee Master */}
        <div className="relative">
          <FontAwesomeIcon
            icon={faHouse}
            className="text-gray-600 text-xl cursor-pointer hover:text-gray-500"
            onClick={() => (window.location.href = "/admin-dashboard")}
            title="Go to Dashboard"
          />
        </div>
        <div className="relative">
          <button
            className="nav-button rounded-full px-4 py-1 bg-gray-600 text-white hover:bg-gray-500 focus:outline-none"
            onClick={() => toggleDropdown("employeeMaster")}
          >
            Employee Master
          </button>
          {activeDropdown === "employeeMaster" && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-gray-700 rounded shadow-lg">
              <a
                href="/admin-dashboard/departments"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Department
              </a>
              <a
                href="/admin-dashboard/designations"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Designation
              </a>
              <a
                href="/admin-dashboard/employees"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Employee
              </a>
              <a
                href="/admin-dashboard/leaves"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Leave
              </a>
              {/* <a
                href="/admin-dashboard/attendance"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Attendance
              </a> */}
              <a
                href="/admin-dashboard/salary/add"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Salary
              </a>
            </div>
          )}
        </div>

        {/* Room Master */}
        <div className="relative">
          <button
            className="nav-button rounded-full px-4 py-1 bg-gray-600 text-white hover:bg-gray-500 focus:outline-none"
            onClick={() => toggleDropdown("roomMaster")}
          >
            Room Master
          </button>
          {activeDropdown === "roomMaster" && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-gray-700 rounded shadow-lg">
              <a
                href="/admin-dashboard/room-category"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Room Category
              </a>
              <a
                href="/admin-dashboard/room-entries"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Room Entry
              </a>
              <a
                href="/admin-dashboard/food-list"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Food Entry
              </a>
              <a
                href="/admin-dashboard/laundry-service"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Laundry Service
              </a>
              <a
                href="/admin-dashboard/item-entry"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Item Entry
              </a>
              <a
                href="/admin-dashboard/car-entries"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Car Entry
              </a>
              <a
                href="/admin-dashboard/housekeeping"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Housekeeping
              </a>
              {/* <a
                href="/admin-dashboard/other-entry"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Other Entry
              </a> */}
            </div>
          )}
        </div>

        {/* Booking Room */}
        <div className="relative">
          <button
            className="nav-button rounded-full px-4 py-1 bg-gray-600 text-white hover:bg-gray-500 focus:outline-none"
            onClick={() => toggleDropdown("bookingRoom")}
          >
            Room Booking
          </button>
          {activeDropdown === "bookingRoom" && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-gray-700 rounded shadow-lg">
              <a
                href="/admin-dashboard/room-bookings"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Rooms
              </a>
              <a href="/admin-dashboard/homepage" className="block px-4 py-2 hover:bg-gray-200">Date Search</a>
              <a href="/admin-dashboard/booking" className="block px-4 py-2 hover:bg-gray-200">Room Display</a>
              <a href="/admin-dashboard/bookings-list" className="block px-4 py-2 hover:bg-gray-200">Bookings</a>
              {/* <a href="/admin-dashboard/customers" className="block px-4 py-2 hover:bg-gray-200">Enquiry Form</a> */}
            </div>
          )}
        </div>

        {/* Reports */}
        <div className="relative">
          <button
            className="nav-button rounded-full px-4 py-1 bg-gray-600 text-white hover:bg-gray-500 focus:outline-none"
            onClick={() => toggleDropdown("reports")}
          >
            Reports
          </button>
          {activeDropdown === "reports" && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-gray-700 rounded shadow-lg">
              <a
                href="/admin-dashboard/booking-reports"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Booking Reports
              </a>
              <a
                href="/admin-dashboard/revenue-reports"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Revenue Reports
              </a>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="relative">
          <button
            className="nav-button rounded-full px-6 py-1 bg-gray-600 text-white hover:bg-gray-500 focus:outline-none"
            onClick={() => (window.location.href = "/admin-dashboard/accessRole")}
          >
            Access Management
          </button>
        </div>
      </div>

      {/* Logout Button */}
      {/* <div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md transform hover:scale-105 transition-all" onClick={logout}>
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default AdminNavbar;
