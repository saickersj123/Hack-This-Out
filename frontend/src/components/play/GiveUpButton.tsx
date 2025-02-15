import React, { useEffect, useState } from 'react';
import GiveUpModal from '../modal/GiveUpModal';
import '../../assets/scss/play/GiveUpButton.scss';
import { usePlayContext } from '../../contexts/PlayContext';
import { CiLock } from 'react-icons/ci';

interface GiveUpButtonProps {
  machineId: string;
  contestId?: string;
  contestName?: string;
  machineName: string;
  mode: "machine" | "contest";
}

const GiveUpButton: React.FC<GiveUpButtonProps> = ({ machineId, contestId, contestName, machineName, mode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { instanceStatus } = usePlayContext();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (mode === 'machine' && instanceStatus !== 'running') return; // Prevent opening modal if not running
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (mode === 'machine') {
      setIsDisabled(instanceStatus !== 'running');
    } else if (mode === 'contest') {
      setIsDisabled(false);
    }
  }, [instanceStatus]);

  return (
    <>
      {mode === 'machine' ? (
        <button
          onClick={handleClick}
        disabled={isDisabled}
        className={`give-up-btn ${isDisabled ? "disabled" : ""}`}
      >
        {isDisabled ? <CiLock size={40} color="#ccc" /> : 'Give up'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="white"
          strokeWidth="3"
          viewBox="0 0 74 74"
          height="34"
          width="34"
        >
          <circle strokeWidth="3" stroke="white" r="35.5" cy="37" cx="37"></circle>
          <path
            fill="black"
            d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
          ></path>
        </svg>
        </button>
      ) : (
        <button
          onClick={handleClick}
          className={`give-up-btn ${isDisabled ? "disabled" : ""}`}
        >
          {isDisabled ? <CiLock size={40} color="#ccc" /> : 'Give up'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="white"
          strokeWidth="3"
          viewBox="0 0 74 74"
          height="34"
          width="34"
        >
          <circle strokeWidth="3" stroke="white" r="35.5" cy="37" cx="37"></circle>
          <path
            fill="black"
            d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
          ></path>
        </svg>
        
        </button>
      )}

      <GiveUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        machineId={machineId}
        contestId={contestId}
        contestName={contestName}
        machineName={machineName}
        mode={mode}
      />
    </>
  );
};

export default GiveUpButton;