import React, { useState } from 'react';
import { startInstance } from '../../api/axiosInstance';

/**
 * Props interface for StartInstanceButton component.
 */
interface StartInstanceButtonProps {
  machineId: string;
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
const StartInstanceButton: React.FC<StartInstanceButtonProps> = ({ machineId }) => {
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handles the instance start action.
   */
  const handleStart = async () => {
    setLoading(true);
    try {
      const response: StartInstanceResponse = await startInstance(machineId);
      alert(response.msg || 'Instance started successfully.');
    } catch (error: any) {
      console.error('Error starting instance:', error);
      alert(error.msg || 'Failed to start instance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleStart} disabled={loading} className="start-instance-button">
      {loading ? 'Starting...' : 'Start Instance'}
    </button>
  );
};

export default StartInstanceButton;