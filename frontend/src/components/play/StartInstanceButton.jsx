import React, { useState } from 'react';
import { startInstance } from '../../api/axiosInstance';

const StartInstanceButton = ({ machineId }) => {
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      await startInstance(machineId);
      alert('Instance started successfully.');
    } catch (error) {
      console.error('Error starting instance:', error);
      alert(error.msg || 'Failed to start instance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleStart} disabled={loading}>
      {loading ? 'Starting...' : 'Start Instance'}
    </button>
  );
};

export default StartInstanceButton;