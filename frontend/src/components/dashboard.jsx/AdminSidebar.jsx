import 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import '../../styles/AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Hotel Management System</h3>
      </div>
      <div className="sidebar-nav">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        {/* Employee Master Dropdown */}
        <div className="dropdown">
          <NavLink to="#" className="nav-link">
            <FaUsers />
            <span>Employee Master</span>
          </NavLink>
          <div className="dropdown-content">
            <NavLink
              to="/admin-dashboard/departments"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Department</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/designations"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Designation</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/employees"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaUsers />
              <span>Employee</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/leaves"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaCalendarAlt />
              <span>Leave</span>
            </NavLink>
            
            <NavLink
              to="/admin-dashboard/attendance"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaCalendarAlt />
              <span>Attendance</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/salary/add"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Salary</span>
            </NavLink>
          </div>
        </div>

        {/* Room Master Dropdown */}
        <div className="dropdown">
          <NavLink to="#" className="nav-link">
            <FaBuilding />
            <span>Room Master</span>
          </NavLink>
          <div className="dropdown-content">
            <NavLink
              to="/admin-dashboard/room-category"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Room Category</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/room-entry"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Room Entry</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/food-entry"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Food Entry</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/laundry-service"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Laundry Service</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/item-entry"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Item Entry</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/car-entry"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Car Entry</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/housekeeping"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Housekeeping</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/other-entry"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <FaBuilding />
              <span>Other Entry</span>
            </NavLink>
          </div>
        </div>

        <NavLink to="/admin-dashboard/setting" className="nav-link">
          <FaBuilding />
          <span>Settings</span>
        </NavLink>

        <NavLink
          to="rooms"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaBuilding />
          <span>Rooms</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
