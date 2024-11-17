import React, { useState } from 'react';
import { startInstance } from '../../api/axiosInstance';
import LoadingIcon from '../public/LoadingIcon';
/**
 * Props interface for StartInstanceButton component.
 */
interface StartInstanceButtonProps {
  machineId: string;
  onInstanceStarted: () => void;
}

/**
 * Interface representing API response.
 * Adjust according to your actual API response structure.
 */
interface StartInstanceResponse {
  msg?: string;
  // Add other response properties if needed
}

/**
 * Component to start an instance for a machine.
 */
const StartInstanceButton: React.FC<StartInstanceButtonProps> = ({ machineId, onInstanceStarted }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the instance start action.
   */
  const handleStartInstance = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: StartInstanceResponse = await startInstance(machineId);
      console.log('Instance started successfully:', response);
      onInstanceStarted();
    } catch (err: any) {
      console.error('Error starting instance:', err);
      setError(err.msg || 'Failed to start instance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="start-instance-button-container">
      <button
        onClick={handleStartInstance}
        disabled={loading}
        className="start-instance-button"
      >
        {loading ? <LoadingIcon /> : 'Start Instance'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default StartInstanceButton;