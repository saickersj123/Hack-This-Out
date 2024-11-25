import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { getContestStatus } from '../../api/axiosContest';
import { formatDate } from '../../utils/dateUtils';
import Modal from './Modal';
import styles from '../../assets/scss/etc/ContestEndedMD.module.scss';
import { MdOutlineTimerOff } from 'react-icons/md';
interface GetContestStatusResponse {
  contestName: string;
  isActive: boolean;
  startTime: Date;
  endTime: Date;
}

interface ContestEndedMDProps {
  onClose: () => void;
}

const ContestEndedMD: React.FC<ContestEndedMDProps> = ({ onClose }) => {
  const { contestId } = useParams<{ contestId: string }>();
  const navigate: NavigateFunction = useNavigate();
  const [contestStatus, setContestStatus] = useState<GetContestStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContestStatus = async () => {
      try {
        if (!contestId) {
          throw new Error('Contest ID is missing');
        }
        const response: GetContestStatusResponse = await getContestStatus(contestId);
        setContestStatus(response);
      } catch (error: any) {
        setError(error.message || error);
        console.error('Error fetching contest status:', error.message || error);
      }
    };
    fetchContestStatus();
  }, [contestId]);

  const handleClose = () => {
    onClose();
  };

  const handleBackToContest = () => {
    onClose();
    navigate(`/contest`);
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {contestStatus && (
        <>
          <div className={styles.contest_ended_contents}>
            <div className={styles.contest_ended_upper}>
              <MdOutlineTimerOff style={{ fontSize: '36px', marginRight: '4px' }} />
              <h2><b>Contest Ended</b></h2>
            </div>
            <div className={styles.contest_ended_body}>
              <p className={styles.contest_ended_time}>Ended at {formatDate(contestStatus.endTime)}</p>
              <p>Contest is ended. Please wait for the next contest.</p>
            </div>
            <button onClick={handleBackToContest}>Back to Contests</button>
          </div>
        </>
      )}
      {error && <div className="error-message">{error}</div>}
    </Modal>
  );
};

export default ContestEndedMD;
