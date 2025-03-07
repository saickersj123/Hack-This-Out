import React, { useState, FormEvent } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { submitFlagMachine } from '../../api/axiosMachine';
import { submitFlagForContest } from '../../api/axiosContest';
import { submitFlagInstance } from '../../api/axiosInstance';
import '../../assets/scss/play/SubmitFlagForm.scss';
import { LuFlag } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import MachineCompleteModal from '../../components/modal/MachineCompleteModal';
import { usePlayContext } from '../../contexts/PlayContext';

/**
 * Props interface for SubmitFlagForm component.
 */
interface SubmitFlagFormProps {
  machineId: string;
  playType: 'machine' | 'contest';
  contestId?: string; // Optional, required only for contest mode
  onFlagSuccess: () => void; // Updated to accept expEarned
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
  expEarned?: number; // Added expEarned to handle the response
}

/**
 * Component for submitting a flag for a machine or contest.
 */
const SubmitFlagForm: React.FC<SubmitFlagFormProps> = ({ machineId, playType, contestId, onFlagSuccess }) => {
  const navigate: NavigateFunction = useNavigate();
  const [flag, setFlag] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const [showMachineCompleteModal, setShowMachineCompleteModal] = useState(false);
  const [machineExpEarned, setMachineExpEarned] = useState<number>(0);
  const { instanceStatus, setInstanceStatus, setSubmitStatus, setDownloadStatus } = usePlayContext();
  const disabled = instanceStatus !== 'running';

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
        if (response.expEarned) {
          onFlagSuccess();
          setMachineExpEarned(response.expEarned);
        }

        // Flag submission successful, show modal instead of navigate
        setShowMachineCompleteModal(true);
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
        if (response.expEarned) {
          onFlagSuccess(); 
        }
      }
    } catch (error: any) {
      // Handle different error structures
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || [{ msg: error.response.data.msg || 'An error occurred.' }]);
      } else {
        setErrors([{ msg: error.msg || error }]);
      }
    }

    setSubmitStatus('flag-success');
  };


  const resetPlayContext = () => {
    setInstanceStatus(null);
    setDownloadStatus('idle');
    setSubmitStatus('flag');
  }

  return (
    <div className="submit-flag-form">
      <div className='upper-text'>
        <LuFlag size={40} color="white" />
        <h2>Submit Flag</h2>
      </div>
      {message && <p className="message"></p>}
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} className="error-text">{error.msg}</p>
          ))}
        </div>
      )}
      <form className="flag-form" onSubmit={handleSubmitFlag}>
        <input
          className={`flag-input ${disabled ? "disabled" : ""} ${errors.length ? "error shake-error" : ""}`}
          id="flag"
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="Enter flag here"
          required
          disabled={disabled}
        />
        <button
          type="submit"
          className={`submit-flag-button ${disabled ? "disabled" : ""}`}
          disabled={disabled}
        >
          {disabled ? <CiLock size={40} color="#ccc" /> : 'Submit Flag'}
        </button>
      </form>

      {/* Modal */}
      {showMachineCompleteModal && (
        <MachineCompleteModal onClose={() => {
          setShowMachineCompleteModal(false);
          navigate(`/play`);
          resetPlayContext();
        }}
        expEarned={machineExpEarned}
        />
      )}
    </div>
  );
};

export default SubmitFlagForm;