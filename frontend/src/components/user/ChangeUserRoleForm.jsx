import React, { useState } from 'react';
import { changeUserRole } from '../../api/axiosInstance';

const ChangeUserRoleForm = () => {
  const [userId, setUserId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await changeUserRole(userId, adminPassword);
      alert(data.msg);
      setUserId('');
      setAdminPassword('');
    } catch (error) {
      console.error('Error changing user role:', error);
      alert(error.msg || 'Failed to change user role.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Change User Role to Admin</h2>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="adminPassword">Admin Password:</label>
        <input
          type="password"
          id="adminPassword"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Changing...' : 'Change to Admin'}
      </button>
    </form>
  );
};

export default ChangeUserRoleForm;