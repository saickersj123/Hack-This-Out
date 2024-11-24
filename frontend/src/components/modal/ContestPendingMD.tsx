import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { getContestStatus } from '../../api/axiosContest';
import { formatDate } from '../../utils/dateUtils';
import Modal from './Modal';
import { MdOutlinePending } from "react-icons/md";
import styles from '../../assets/scss/etc/ContestPendingPage.module.scss';

interface GetContestStatusResponse {
  contestName: string;
  isActive: boolean;
  startTime: Date;
  endTime: Date;
}

interface ContestPendingMDProps {
  onClose: () => void;
}

const ContestPendingMD: React.FC<ContestPendingMDProps> = ({ onClose }) => {
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
          <div className={styles.contest_pending_contents}>
            <div className={styles.contest_pending_upper}>
              <MdOutlinePending style={{ fontSize: '36px', marginRight: '4px' }} />
              <h2>Contest Pending</h2>
            </div>
            <div className={styles.contest_pending_body}>
              <p>Contest Name: {contestStatus.contestName}</p>
              <p>Start Time: {formatDate(contestStatus.startTime)}</p>
              <p>Contest is not started yet. Please wait for the contest to start.</p>
            </div>
            <button onClick={handleBackToContest}>Back to Contest</button>
          </div>
        </>
      )}
      {error && <div className="error-message">{error}</div>}
    </Modal>
  );
};

export default ContestPendingMD;
