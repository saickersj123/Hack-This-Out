import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

const ContestCompletePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/');
  };

  return (
      <Modal isOpen={true} onClose={handleGoToMain}>
        <div className="contest-complete-modal">
          <h2>Congratulations!</h2>
          <p>You have completed the contest.</p>
          <button onClick={handleGoToMain} className="redirect-button">
            Go to Main Page
          </button>
        </div>
      </Modal>
  );
};

export default ContestCompletePage;
