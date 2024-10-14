// frontend/src/components/DeleteInstanceButton.jsx
import React, { useState } from 'react';
import { deleteInstance } from '../../api/axiosInstance';

const DeleteInstanceButton = ({ instanceId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this instance?');
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await deleteInstance(instanceId);
      alert('Instance deleted successfully.');
      onDelete(instanceId);
    } catch (error) {
      console.error('Error deleting instance:', error);
      alert(error.msg || 'Failed to delete instance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete Instance'}
    </button>
  );
};

export default DeleteInstanceButton;