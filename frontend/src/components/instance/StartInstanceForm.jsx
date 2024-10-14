// frontend/src/components/StartInstanceForm.jsx
import React, { useState } from 'react';
import { startInstance } from '../../api/axiosInstance';

const StartInstanceForm = () => {
  const [machineId, setMachineId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStart = async (e) => {
    e.preventDefault();
    if (!machineId) {
      alert('Please select a machine type.');
      return;
    }

    setLoading(true);
    try {
      const response = await startInstance(machineId);
      alert(`Instance started successfully. Instance ID: ${response.instanceId}`);
      // Optionally, refresh the instance list or redirect
    } catch (error) {
      console.error('Error starting instance:', error);
      alert(error.msg || 'Failed to start instance.');
    } finally {
      setLoading(false);
      setMachineId('');
    }
  };

  return (
    <form onSubmit={handleStart}>
      <h2>Start a New Instance</h2>
      <div>
        <label htmlFor="machineId">Select Machine Type:</label>
        <input
          type="text"
          id="machineId"
          value={machineId}
          onChange={(e) => setMachineId(e.target.value)}
          placeholder="Enter Machine ID"
          required
        />
        {/* Alternatively, use a dropdown if machine options are available */}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Starting...' : 'Start Instance'}
      </button>
    </form>
  );
};

export default StartInstanceForm;

