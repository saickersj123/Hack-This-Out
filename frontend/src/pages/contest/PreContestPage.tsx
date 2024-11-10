import React, { useEffect, useState } from 'react';
import Main from '../../components/main/Main';
import { useParams } from 'react-router-dom';
import { ContestDetail as ContestDetailType } from '../../types/Contest';
import { getContestDetails } from '../../api/axiosInstance';
import { useNavigate, NavigateFunction } from 'react-router-dom';

const PreContestPage: React.FC = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const [contestDetail, setContestDetail] = useState<ContestDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate: NavigateFunction = useNavigate();
  /**
   * Fetches the contest details from the API.
   */
  useEffect(() => {
    const fetchContestDetail = async () => {
      if (!contestId) {
        setError('Contest ID is missing.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await getContestDetails(contestId);
        setContestDetail(response.contest);
      } catch (error: any) {
        console.error('Error fetching contest details:', error.message || error);
        setError('Failed to fetch contest details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContestDetail();
  }, [contestId]);

  if (isLoading) {
    return (
      <Main title="Contest Detail" description="Loading contest details.">
        <div className="contest-detail-page loading">
          <p>Loading...</p>
        </div>
      </Main>
    );
  }

  if (error || !contestDetail) {
    return (
      <Main title="Contest Detail" description="Failed to load contest details.">
        <div className="contest-detail-page error">
          <p className="error-message">{error || 'Contest not found.'}</p>
        </div>
      </Main>
    );
  }

  const handleStartContest = () => {
    navigate(`/contest/${contestId}/play`);
  };

  return (
    <Main title="Pre Contest" description="Pre Contest 화면입니다.">
      <div className="pre-contest-page">
        <div className="contest-name">
          <h2>You are about to play {contestDetail.name}</h2>
        </div>
        <div className="contest-description">
          <p>{contestDetail.description}</p>
        </div>
        <div className="contest-exp">
          <p>Reward(EXP): {contestDetail.contestExp}</p>
        </div>
        <div className="contest-rules   ">
          <p>Rules:</p>
          <ul>
            <li>1. You can only play one machine at a time.</li>
            <li>2. You can get hints from the machine you are playing.</li>
            <li>3. You can submit flags to the machine you are playing.</li>
            <li>4. You have to play all the machines to win the contest.</li>
            <li>5. The reward reduces as the contest time goes.</li>
            <li>6. The contest will be ended when the time is up.</li>
            <li>7. You get your experience points (EXP) after completing the contest.</li>
            <li>8. Good luck!</li>
          </ul>
        </div>
        <div className="contest-warning">
          <p>Warning: Once you start the contest, the game will be recorded.
            <br />
            If you leave the contest, you will be disqualified.
          </p>
        </div>
        <div className="contest-start">
          <button onClick={handleStartContest}>Start Contest</button>
        </div>
      </div>
    </Main>
  );
};

export default PreContestPage;
