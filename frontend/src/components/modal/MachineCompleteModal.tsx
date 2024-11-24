import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import '../../assets/scss/etc/MachineCompleteModal.scss';


interface MachineCompleteModalProps {
  onClose: () => void; // 모달이 닫힐 때 호출할 함수
}

const MachineCompleteModal: React.FC<MachineCompleteModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    onClose();
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

export default MachineCompleteModal;
