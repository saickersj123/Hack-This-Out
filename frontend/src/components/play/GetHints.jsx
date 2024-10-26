import React from 'react';
import { getMachineHints } from '../../api/axiosInstance';

const UseHints = ({ machineId }) => {
  const handleUseHint = async () => {
    try {
        await getMachineHints(machineId);
      alert('Hint used successfully.');
      // Optionally refresh machine data or hints display
    } catch (error) {
      console.error('Error using hint:', error);
      alert(error.msg || 'Failed to use hint.');
    }
  };

  return (
    <button onClick={handleUseHint}>
      Use Hint
    </button>
  );
};

export default UseHints;
