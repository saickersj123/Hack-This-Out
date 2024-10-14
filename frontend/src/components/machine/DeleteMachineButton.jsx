import React, { useState } from 'react';
import { deleteMachine } from '../../api/axiosInstance';

const DeleteMachineButton = ({ machineId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this machine?');
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await deleteMachine(machineId);
      alert('Machine deleted successfully.');
      if (onDelete) onDelete(machineId);
    } catch (error) {
      console.error('Error deleting machine:', error);
      alert(error.msg || 'Failed to delete machine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteMachineButton;