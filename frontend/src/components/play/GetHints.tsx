import React, { useState } from 'react';
import { getMachineHints } from '../../api/axiosInstance';

/**
 * Props interface for GetHints component.
 */
interface GetHintsProps {
  machineId: string;
}

/**
 * Component to fetch and display hints for a machine.
 */
const GetHints: React.FC<GetHintsProps> = ({ machineId }) => {
  const [hint, setHint] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles fetching hints from the API.
   */
  const handleGetHints = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMachineHints(machineId);
      setHint(response.hint);
      alert('Hints fetched successfully.');
    } catch (error: any) {
      console.error('Error fetching hints:', error);
      setError(error.msg || 'Failed to fetch hints.');
      alert(error.msg || 'Failed to fetch hints.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="get-hints-container">
      <button onClick={handleGetHints} disabled={loading}>
        {loading ? 'Fetching Hints...' : 'Get Hints'}
      </button>
      {error && <div className="error-message">{error}</div>}
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
