import React from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import Modal from './Modal';
import styles from '../../assets/scss/etc/RegisterCompleteMD.module.scss';
import { MdLibraryAddCheck } from 'react-icons/md';

interface RegisterCompleteMDProps {
  onClose: () => void;
  mode: 'contest' | 'machine';
}

const RegisterCompleteMD: React.FC<RegisterCompleteMDProps> = ({ onClose, mode }) => {
  const navigate: NavigateFunction = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleBackToContest = () => {
    onClose();
    navigate(`/contest`);
  };

  const handleBackToMachine = () => {
    onClose();
    navigate(`/machine`);
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {mode === 'contest' && (
        <>
          <div className={styles.register_complete_contents}>
            <div className={styles.register_complete_upper}>
              <MdLibraryAddCheck style={{ fontSize: '36px', marginRight: '4px' }} />
              <h2><b>Contest Added!</b></h2>
            </div>
            <div className={styles.register_complete_body}>
              <p>Contest is registered successfully.</p>
              <p>Please wait for approval from the admin.</p>
            </div>
            <button onClick={handleBackToContest}>Back to Contests</button>
          </div>
        </>
      )}
      {mode === 'machine' && (
        <><div className={styles.register_complete_contents}>
        <div className={styles.register_complete_upper}>
          <MdLibraryAddCheck style={{ fontSize: '36px', marginRight: '4px' }} />
          <h2><b>Machine Added!</b></h2>
        </div>
        <div className={styles.register_complete_body}>
          <p>Machine is registered successfully.</p>
          <p>Please wait for approval from the admin.</p>
        </div>
        <button onClick={handleBackToMachine}>Back to Machine</button>
      </div></>
      )}

    </Modal>
  );
};

export default RegisterCompleteMD;
