import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import Confetti from 'react-confetti';
import '../../assets/scss/etc/MachineCompleteMD.scss';

const MachineCompleteModal: React.FC = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  const handleGoToMain = () => {
    setShowConfetti(false);
    navigate('/');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000); // Confetti stops after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Modal isOpen={true} onClose={handleGoToMain}>
        {/* match Confetti width and height to modal size */}
        {/* ************TODO: Confetti height should be matched to modal height ************ */}
        {showConfetti && <Confetti width={550} height={550} />}
        <div className="machine-complete-modal">
          <div className="title">🎉 Machine Completed! 🎉</div>
          <div className="content">You have successfully completed the machine.</div>
          <button onClick={handleGoToMain} className="redirect-button">
            Go Home
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MachineCompleteModal;
