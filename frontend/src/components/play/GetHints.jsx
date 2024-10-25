import React from 'react';
import { getHint, getHintInContest } from '../../api/axiosInstance';

const UseHints = ({ machineId, mode }) => {
  const handleUseHint = async () => {
    try {
      if (mode === 'contest') {
        await getHintInContest(machineId, machineId); // Correct parameter mapping
      } else {
        await getHint(machineId);
      }
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
