import 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding } from 'react-icons/fa';
import '../../styles/AdminSidebar.css'; 
import { useAuth } from '../../context/authContext';

const Sidebar = () => {
  const {user} = useAuth()
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Employee Management</h3>
      </div>
      <div className="sidebar-nav">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }>
          <FaUsers />
          <span>My Profile</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }>
          <FaBuilding />
          <span>Salary</span>
        </NavLink>
        <NavLink to="/employee-dashboard/setting" className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }>
          <FaBuilding />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
