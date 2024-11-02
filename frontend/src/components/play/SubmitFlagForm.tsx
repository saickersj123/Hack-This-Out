import React, { useState, FormEvent } from 'react';
import { submitFlagMachine, submitFlag } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

/**
 * Props interface for SubmitFlagForm component.
 */
interface SubmitFlagFormProps {
  machineId: string;
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
 * Component for submitting a flag for a machine.
 */
const SubmitFlagForm: React.FC<SubmitFlagFormProps> = ({ machineId }) => {
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
    setErrors([]);
    setMessage('');

    // Validate that machineId and flag are present
    if (!machineId) {
      setErrors([{ msg: 'Machine ID is missing.' }]);
      return;
    }

    if (!flag.trim()) {
      setErrors([{ msg: 'Flag cannot be empty.' }]);
      return;
    }

    try {
      const machineResponse: SubmitFlagResponse = await submitFlagMachine(machineId, flag);
      const instanceResponse: SubmitFlagResponse = await submitFlag(machineId, flag);
      setMessage(machineResponse.msg || instanceResponse.msg || 'Flag submitted successfully!');
      navigate(`/machine/${machineId}`);
    } catch (error: any) {
      // Handle different error structures
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || [{ msg: error.response.data.msg || 'An error occurred.' }]);
      } else {
        setErrors([{ msg: 'An unexpected error occurred.' }]);
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
          />
        </div>
        <button type="submit" className="submit-flag-button">
          Submit Flag
        </button>
      </form>
    </div>
  );
};

export default SubmitFlagForm;
