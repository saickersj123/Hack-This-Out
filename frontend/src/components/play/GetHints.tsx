import React, { useState, useEffect } from 'react';
import { getUsedHintsInContest, getHintInContest } from '../../api/axiosContest';
import { getUsedHints, getMachineHints } from '../../api/axiosMachine';
import LoadingIcon from '../public/LoadingIcon';

/**
 * Props interface for GetHints component.
 */
interface GetHintsProps {
  machineId: string;
  playType: 'machine' | 'contest';
  contestId?: string; // Optional, required only for contest mode
  disabled?: boolean; // Optional, to disable the component
}

/**
 * Interface representing the hint data.
 */
interface Hint {
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
const GetHints: React.FC<GetHintsProps> = ({ machineId, playType, contestId, disabled = false }) => {
  const [hints, setHints] = useState<Hint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [remainingHints, setRemainingHints] = useState<number>(0);

  /**
   * Fetch used hints and progress for contest mode.
   */
  const fetchUsedHintsInContestMode = async () => {
    try {
      if (!contestId) {
        throw new Error('Contest ID is missing.');
      }

      const response = await getUsedHintsInContest(contestId, machineId);

      if (response && response.usedHints) {
        setHints(response.usedHints.map((hintContent: string) => ({ content: hintContent })));
        setHintsUsed(response.hintsUsed);
        setRemainingHints(response.remainingHints);
      } else {
        setHints([]);
        setHintsUsed(0);
        setRemainingHints(0);
      }
    } catch (err: any) {
      console.error('Error fetching used hints in contest:', err);
      setError({ msg: err.message || 'Failed to fetch used hints in contest.' });
    }
  };

  /**
   * Fetch used hints and progress for machine mode.
   */
  const fetchUsedHintsMachineMode = async () => {
    try {
      const response = await getUsedHints(machineId);

      if (response && response.usedHints) {
        setHints(response.usedHints.map((hintContent: string) => ({ content: hintContent })));
        setHintsUsed(response.hintsUsed);
        setRemainingHints(response.remainingHints);
      } else {
        setHints([]);
        setHintsUsed(0);
        setRemainingHints(0);
      }
    } catch (err: any) {
      console.error('Error fetching used hints:', err);
      setError({ msg: 'Failed to fetch used hints.' });
    }
  };

  /**
   * Fetch a single hint based on play type and append it to the hints list.
   */
  const fetchHint = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (playType === 'machine') {
        response = await getMachineHints(machineId);
      } else if (playType === 'contest') {
        if (!contestId) {
          throw new Error('Contest ID is missing for contest mode.');
        }
        response = await getHintInContest(contestId, machineId);
      }

      if (response?.hint) {
        setHints(prevHints => [...prevHints, { content: response.hint }]);
        setHintsUsed(response.hintsUsed);
        setRemainingHints(response.remainingHints);
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (err: any) {
      console.error('Error fetching hint:', err);
      setError({ msg: err.msg || 'Failed to fetch hint.' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch used hints on component mount or when machine/playType changes.
   */
  useEffect(() => {
    if (playType === 'contest') {
      fetchUsedHintsInContestMode();
    } else if (playType === 'machine') {
      fetchUsedHintsMachineMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machineId, playType, contestId]);

  return (
    <div className="get-hints-container">
      <h3>Hints</h3>
      {loading && <LoadingIcon />}
      {error && <div className="error-message">{error.msg}</div>}
      {!loading && !error && hintsUsed > 0 && (
        <div className="used-hints">
          <h4>Used Hints ({hintsUsed})</h4>
          <ul className="hints-list">
            {hints.map((hint, index) => (
              <li key={index}>{hint.content}</li>
            ))}
          </ul>
        </div>
      )}
      {!loading && !error && remainingHints > 0 && (
        <div className="remaining-hints">
          <h4>Remaining Hints ({remainingHints})</h4>
        </div>
      )}
      {!loading && !error && hintsUsed === 0 && <p>No hints used yet.</p>}
      <button
        onClick={fetchHint}
        disabled={loading || remainingHints === 0 || disabled}
        className="get-hints-button"
      >
        {loading
          ? <LoadingIcon />
          : remainingHints === 0
          ? 'No More Hints'
          : disabled
          ? 'Disabled'
          : 'Get Hint'}
      </button>
    </div>
  );
};

export default GetHints;