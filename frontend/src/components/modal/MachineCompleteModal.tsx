import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import Confetti from 'react-confetti';
import '../../assets/scss/etc/MachineCompleteMD.scss';

const MachineCompleteModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [opacity, setOpacity] = useState(1);

  const handleGoToMachines = () => {
    onClose();
    setShowConfetti(false);
    navigate(`/machine`);
  };

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 3000);

    const removeTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        {showConfetti && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            opacity: opacity,
            transition: 'opacity 2s ease-out',
            zIndex: 10 
          }}>
            <Confetti 
              width={550} 
              height={190}
              recycle={opacity > 0}
              numberOfPieces={opacity * 200}
            />
          </div>
        )}
        <div className="machine-complete-modal">
          <div className="title">🎉 Machine Completed! 🎉</div>
          <div className="content">You have successfully completed the machine.</div>
          <button onClick={handleGoToMachines} className="redirect-button">
            Go to Machines
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MachineCompleteModal;
