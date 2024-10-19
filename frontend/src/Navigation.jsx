import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assumes you have an AuthContext

const Navigation = () => {
  const { user } = useAuth();

  return (
    <nav>
      <Link to="/Main">Home</Link>
      <Link to="/Machines">Machines</Link>
      <Link to="/Contest">Contest</Link>
      {user && user.role === 'admin' && (
        <Link to="/MachineManagement">Machine Management</Link>
      )}
      {/* Add Logout and other links as needed */}
    </nav>
  );
};

export default Navigation;