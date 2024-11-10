import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal';

const MachineCompletePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/');
  };

  return (
    <Modal isOpen={true} onClose={handleGoToMain}>
      <div className="machine-complete-modal">
        <h2>Congratulations!</h2>
        <p>You have completed the machine.</p>
        <button onClick={handleGoToMain} className="redirect-button">
          Go to Main Page
        </button>
      </div>
    </Modal>
  );
};

export default MachineCompletePage;
