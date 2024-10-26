import React, { useState } from 'react';
import { getMachineHints } from '../../api/axiosInstance';

const GetHints = ({ machineId }) => {
  const [hint, setHint] = useState('');

  const handleGetHints = async () => {
    try {
        const response = await getMachineHints(machineId);
        setHint(response.hint);
      alert('Hints fetched successfully.');
      // Optionally refresh machine data or hints display
    } catch (error) {
      console.error('Error fetching hints:', error);
      alert(error.msg || 'Failed to fetch hints.');
    }
  };

  return (
    <div>
      <button onClick={handleGetHints}>
        Get Hints
      </button>
      {hint && (
        <div className="hint-display">
          <h3>Hint:</h3>
          <p>{hint}</p>
        </div>
      )}
    </div>
  );
};

export default GetHints;
