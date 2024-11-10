import React, { useState, FormEvent } from 'react';
import { submitFlagMachine } from '../../api/axiosMachine';
import { submitFlagForContest } from '../../api/axiosContest';
import { submitFlagInstance } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

/**
 * Props interface for SubmitFlagForm component.
 */
interface SubmitFlagFormProps {
  machineId: string;
  playType: 'machine' | 'contest';
  contestId?: string; // Optional, required only for contest mode
  disabled?: boolean; // Added optional disabled prop
}

/**
 * Interface representing an error message.
 */
interface ErrorMessage {
  msg: string;
}

/**
 * Interface representing API response.
 * Adjust according to your actual API response structure.
 */
interface SubmitFlagResponse {
  msg?: string;
  errors?: ErrorMessage[];
}

/**
 * Component for submitting a flag for a machine or contest.
 */
const SubmitFlagForm: React.FC<SubmitFlagFormProps> = ({ machineId, playType, contestId, disabled = false }) => {
  const [flag, setFlag] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const navigate = useNavigate();

  /**
   * Handles the flag submission form.
   * @param e - The form event.
   */
  const handleSubmitFlag = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (disabled) return; // Prevent submission if disabled

    setErrors([]);
    setMessage('');

    // Validate that machineId and flag are present
    if (!machineId) {
      setErrors([{ msg: 'Machine ID is missing.' }]);
      return;
    }

    if (playType === 'contest' && !contestId) {
      setErrors([{ msg: 'Contest ID is missing for contest mode.' }]);
      return;
    }

    if (!flag.trim()) {
      setErrors([{ msg: 'Flag cannot be empty.' }]);
      return;
    }

    try {
      let response: SubmitFlagResponse;

      if (playType === 'machine') {
        const instanceResponse = await submitFlagInstance(machineId, flag);
        if (instanceResponse.message === "ERROR") {
          setErrors([{ msg: instanceResponse.cause }]);
          return;
        } else {
          response = await submitFlagMachine(machineId, flag);
          if (response.msg === "ERROR") {
            setErrors([{ msg: response.msg || 'An error occurred.' }]);
            return;
          }
        }
        setMessage(response.msg || instanceResponse.msg || 'Flag submitted successfully!');
        navigate(`/machine/${machineId}/complete`);
      } else if (playType === 'contest') {
        if (!contestId) {
          setErrors([{ msg: 'Contest ID is required for contest mode.' }]);
          return;
        }
        const instanceResponse = await submitFlagInstance(machineId, flag);
        if (instanceResponse.message === "ERROR") {
          setErrors([{ msg: instanceResponse.cause }]);
          return;
        } else {
          response = await submitFlagForContest(contestId, machineId, flag);
        }
        setMessage(response.msg || instanceResponse.msg || 'Flag submitted successfully for contest!');
        navigate(`/contest/${contestId}/complete`);
      }
    } catch (error: any) {
      // Handle different error structures
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || [{ msg: error.response.data.msg || 'An error occurred.' }]);
      } else {
        setErrors([{ msg: error.msg || error }]);
      }
    }
  };

  return (
    <div className="submit-flag-form">
      <h3>Submit Flag</h3>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} className="error">
              {error.msg}
            </p>
          ))}
        </div>
      )}
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmitFlag}>
        <div className="flag-input-group">
          <label htmlFor="flag">Flag:</label>
          <input
            id="flag"
            type="text"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            placeholder="Enter flag here"
            required
            disabled={disabled} // Disable input when disabled
          />
        </div>
        <button
          type="submit"
          className="submit-flag-button"
          disabled={disabled} // Disable button when disabled
        >
          {disabled ? 'Disabled' : 'Submit Flag'}
        </button>
      </form>
    </div>
  );
};

export default SubmitFlagForm;