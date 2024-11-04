import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import ContestDetail from '../../components/contest/ContestDetail';
import Main from '../../components/main/Main';
import { getContestDetails } from '../../api/axiosInstance';
import { ContestDetail as ContestDetailType } from '../../types/Contest';
//import '../../assets/scss/contest/ContestDetailPage.scss';

/**
 * Component representing the Contest Detail Page.
 * 
 * @returns {JSX.Element} The rendered ContestDetailPage component.
 */
const ContestDetailPage: React.FC = () => {
  const [contestDetail, setContestDetail] = useState<ContestDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { contestId } = useParams<{ contestId: string }>();
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

  /**
   * Handles navigation to the participate page.
   */
  const handlePlay = () => {
    const isContestActive = contestDetail && contestDetail._id && contestDetail.isActive 
      && contestDetail.startTime.getTime() > Date.now() && contestDetail.endTime.getTime() > Date.now();
    if (isContestActive) {
      navigate(`/contest/${contestDetail?._id}/pre`);
    } else {
      navigate(`/contest/${contestDetail?._id}/pending`);
    }
  };

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

  return (
    <Main title="Contest Detail" description="Contest Detail 화면입니다.">
      <div className="contest-detail-page">
        <ContestDetail contestDetail={contestDetail} />
        <button onClick={handlePlay} className="participate-button">
          Play
        </button>
      </div>
    </Main>
  );
};

export default ContestDetailPage;