import React, { useState } from 'react';
import { deleteMachine } from '../../api/axiosInstance';

interface DeleteMachineButtonProps {
  machineId: string;
  onDelete: (machineId: string) => void;
}

const DeleteMachineButton: React.FC<DeleteMachineButtonProps> = ({ machineId, onDelete }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (): Promise<void> => {
    const confirmDelete = window.confirm('Are you sure you want to delete this machine?');
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await deleteMachine(machineId);
      alert('Machine deleted successfully.');
      onDelete(machineId);
    } catch (error: any) {
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