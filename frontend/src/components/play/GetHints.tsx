import React, { useState, useEffect } from 'react';
import { getMachineHints, getHintInContest } from '../../api/axiosInstance';

/**
 * Props interface for GetHints component.
 */
interface GetHintsProps {
  machineId: string;
  playType: 'machine' | 'contest';
  contestId?: string; // Optional, required only for contest mode
}

/**
 * Interface representing the hint data.
 */
interface Hint {
  id: string;
  content: string;
}

/**
 * Interface representing an error message.
 */
interface ErrorMessage {
  msg: string;
}

/**
 * Component to fetch and display hints for a machine or contest.
 */
const GetHints: React.FC<GetHintsProps> = ({ machineId, playType, contestId }) => {
  const [hints, setHints] = useState<Hint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorMessage | null>(null);

  /**
   * Fetch hints based on play type.
   */
  const fetchHints = async () => {
    setLoading(true);
    setError(null);
    try {
      let fetchedHints: Hint[] = [];
      if (playType === 'machine') {
        const response = await getMachineHints(machineId);
        fetchedHints = response.hints;
      } else if (playType === 'contest') {
        if (!contestId) {
          throw new Error('Contest ID is missing for contest mode.');
        }
        const response = await getHintInContest(contestId, machineId);
        fetchedHints = response.hints;
      }
      setHints(fetchedHints);
    } catch (err: any) {
      console.error('Error fetching hints:', err);
      setError({ msg: err.msg || 'Failed to fetch hints.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machineId, playType, contestId]);

  return (
    <div className="get-hints-container">
      <h3>Hints</h3>
      {loading && <p>Loading hints...</p>}
      {error && <div className="error-message">{error.msg}</div>}
      {!loading && !error && hints.length === 0 && <p>No hints available.</p>}
      {!loading && !error && hints.length > 0 && (
        <ul className="hints-list">
          {hints.map((hint) => (
            <li key={hint.id}>{hint.content}</li>
          ))}
        </ul>
      )}
      <button onClick={fetchHints} disabled={loading} className="refresh-hints-button">
        {loading ? 'Refreshing...' : 'Refresh Hints'}
      </button>
    </div>
  );
};

export default GetHints;
