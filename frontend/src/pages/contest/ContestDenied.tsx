import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { getContestStatus } from '../../api/axiosContest';
import { formatDate } from '../../utils/dateUtils';
import Modal from '../../components/modal/Modal';
interface GetContestStatusResponse {
  contestName: string;
  isActive: boolean;
  startTime: Date;
  endTime: Date;
}

const ContestDenied: React.FC = () => {
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
    navigate(`/contest/${contestId}`);
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {contestStatus && (
        <>
          <h2>Contest Denied</h2>
          <p>Contest Name: {contestStatus.contestName}</p>
          <p>Status: {contestStatus.isActive ? 'Active' : 'Inactive'}</p>
          <p>Start Time: {formatDate(contestStatus.startTime)}</p>
          <p>End Time: {formatDate(contestStatus.endTime)}</p>
          <p>Contest is already ended or you already finished the contest.</p>
          <button><Link to={`/contest/${contestId}`}>Back to Contest</Link></button>
        </>
      )}
      {error && <div className="error-message">{error}</div>}
    </Modal>
  );
};

export default ContestDenied;
