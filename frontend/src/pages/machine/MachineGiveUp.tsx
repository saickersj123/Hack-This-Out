import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal';

const MachineGiveUpPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/');
  };

  return (
    <Modal isOpen={true} onClose={handleGoToMain}>
      <div className="machine-give-up-modal">
        <h2>Give Up</h2>
        <p>Are you sure you want to give up? Your progress will be lost.</p>
        <button onClick={handleGoToMain} className="redirect-button">
          Go to Main Page
        </button>
      </div>
    </Modal>
  );
};

export default MachineGiveUpPage;
