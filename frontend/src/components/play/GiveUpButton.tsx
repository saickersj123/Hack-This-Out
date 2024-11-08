import React, { useState } from 'react';
import GiveUpModal from '../modal/GiveUpModal';

interface GiveUpButtonProps {
  machineId: string;
  contestId?: string;
  machineName: string;
  mode: "machine" | "contest";
  disabled?: boolean; // Added optional disabled prop
}

const GiveUpButton: React.FC<GiveUpButtonProps> = ({ machineId, contestId, machineName, mode, disabled = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (disabled) return; // Prevent opening modal if disabled
    setIsModalOpen(true);
  };

  return (
    <>
      <button 
        onClick={handleClick} 
        className="give-up-button"
        disabled={disabled} // Disable button when disabled
        style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }} // Optional: Visual feedback
      >
        Give Up
      </button>

      <GiveUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        machineId={machineId}
        contestId={contestId}
        machineName={machineName}
        mode={mode}
      />
    </>
  );
};

export default GiveUpButton;