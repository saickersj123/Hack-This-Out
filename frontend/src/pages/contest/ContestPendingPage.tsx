import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Main from '../../components/main/Main';
import { getContestStatus } from '../../api/axiosInstance';

interface GetContestStatusResponse {
  contestName: string;
  isActive: boolean;
  startTime: Date;
  endTime: Date;
}

const ContestPendingPage: React.FC = () => {
  const { contestId } = useParams<{ contestId: string }>();
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

  return (
    <Main>
      {contestStatus && (
        <>
          <h2>Contest Pending</h2>
          <p>Contest Name: {contestStatus.contestName}</p>
          <p>Status: {contestStatus.isActive ? 'Active' : 'Inactive'}</p>
          <p>Start Time: {contestStatus.startTime.toLocaleString()}</p>
          <p>End Time: {contestStatus.endTime.toLocaleString()}</p>
          <p>Contest is not active yet. Please wait for the contest to start.</p>
          <button><Link to={`/contest/${contestId}`}>View Contest</Link></button>
        </>
      )}
      {error && <div className="error-message">{error}</div>}
    </Main>
  );
};

export default ContestPendingPage;
