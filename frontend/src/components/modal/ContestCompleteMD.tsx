import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Confetti from 'react-confetti';
import '../../assets/scss/etc/ContestCompleteMD.scss';

interface ContestCompleteModalProps {
  onClose: () => void;
  expEarned: number;
}

const ContestCompleteModal: React.FC<ContestCompleteModalProps> = ({ onClose, expEarned }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [opacity, setOpacity] = useState(1);

  const handleGoToContests = () => {
    onClose();
    setShowConfetti(false);
    navigate(`/contest`);
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
        <div className="contest-complete-modal">
          <div className="title">🎉 Contest Completed! 🎉</div>
          <div className="content">You have successfully completed the contest.</div>
          <div className="exp-earned"><b>+ {expEarned} EXP!</b></div>
          <button onClick={handleGoToContests} className="redirect-button">
            Back to Contests
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ContestCompleteModal;
