import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { giveUpMachine } from '../../api/axiosMachine';
import { TerminateInstance } from '../../api/axiosInstance';
import styles from '../../assets/scss/etc/GiveUpModal.module.scss';
import { giveUpContest } from '../../api/axiosContest';

interface GiveUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  machineId: string;
  contestId?: string;
  machineName: string;
  mode : "machine" | "contest";
}

const GiveUpModal: React.FC<GiveUpModalProps> = ({
  isOpen,
  onClose,
  machineId,
  contestId,
  machineName,
  mode
}) => {
  const navigate = useNavigate();

  const handleGiveUp = async () => {
    try {
      const terminateResponse = await TerminateInstance(machineId);
      if (terminateResponse) {
        if (mode === "machine") {
          const machineResponse = await giveUpMachine(machineId);
          if (machineResponse) {
            navigate(`/machine/${machineId}`);
          } else {
            alert(machineResponse.msg);
          }
        } else if (mode === "contest") {
          const contestResponse = await giveUpContest(contestId || "");
          if (contestResponse) {
            navigate(`/contest/${contestId}`);
          } else {
            alert(contestResponse.msg);
          }
        }
      } else {
        alert(terminateResponse.msg);
      }
    } catch (error) {
      console.error('Failed to give up:', error);
      alert('Failed to give up. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.give_up_modal}>
        <div className={styles.textbox}>
        <div className={styles.text}>Give Up Confirmation</div>
        <p>Are you sure you want to give up on <strong>{machineName}</strong>?</p>
        <p className={styles.warning_text}>Warning: All your progress will be lost!</p>
        </div>
        <div className={styles.button_group}>
          <button 
            onClick={handleGiveUp}
            className={styles.give_up_button}
          >
            Yes, Give Up
          </button>
          <button 
            onClick={onClose}
            className={styles.cancel_button}
          >
            No, Continue Playing
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GiveUpModal;