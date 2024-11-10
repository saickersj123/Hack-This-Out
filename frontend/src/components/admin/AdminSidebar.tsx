import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/scss/admin/AdminSidebar.scss';
import { FaTachometerAlt, FaUsers, FaCogs, FaClipboardList, FaServer } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Dashboard</h2>
      <nav className="sidebar-nav">
        <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaTachometerAlt className="sidebar-icon" />
          Dashboard Home
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaUsers className="sidebar-icon" />
          Users
        </NavLink>
        <NavLink to="/admin/machines" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaServer className="sidebar-icon" />
          Machines
        </NavLink>
        <NavLink to="/admin/contests" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaClipboardList className="sidebar-icon" />
          Contests
        </NavLink>
        <NavLink to="/admin/instances" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FaCogs className="sidebar-icon" />
          Instances
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
