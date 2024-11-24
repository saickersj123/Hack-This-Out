import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import ContestDetail from '../../components/contest/ContestDetail';
import Main from '../../components/main/Main';
import { getContestDetails, getContestStatus, getLeaderboardByContest, getMyRankinContest } from '../../api/axiosContest';
import { ContestDetail as ContestDetailType } from '../../types/Contest';
import { CurrentUser } from '../../types/CurrentUser';
import ContestLeaderboard from '../../components/leaderboard/ContestLeaderboard';
import { User } from '../../types/User';
import { ContestStatus } from '../../types/Contest';
import styles from '../../assets/scss/contest/ContestDetailPage.module.scss';
import Loading from '../../components/public/Loading';
import ContestEndedMD from '../../components/modal/ContestEndedMD';
import ContestPendingMD from '../../components/modal/ContestPendingMD';

/**
 * Component representing the Contest Detail Page.
 * 
 * @returns {JSX.Element} The rendered ContestDetailPage component.
 */
const ContestDetailPage: React.FC = () => {
  const [contestDetail, setContestDetail] = useState<ContestDetailType | null>(null);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [contestStatus, setContestStatus] = useState<ContestStatus>({
    isActive: false,
    isStarted: false,
    isEnded: false,
  });
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    _id: null,
    myRank: null,
    myLevel: null,
    myExp: null,
    myUsername: null,
    myAvatar: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { contestId } = useParams<{ contestId: string }>();
  const navigate: NavigateFunction = useNavigate();

  // State to manage ContestEndedMD modal visibility
  const [showEndedMD, setShowEndedMD] = useState<boolean>(false);
  const [showPendingMD, setShowPendingMD] = useState<boolean>(false);

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
        const fetchedContest = response.contest;

        // **Parse `startTime` and `endTime` as Date objects**
        const parsedContest: ContestDetailType = {
          ...fetchedContest,
          startTime: new Date(fetchedContest.startTime),
          endTime: new Date(fetchedContest.endTime),
        };

        setContestDetail(parsedContest);
      } catch (error: any) {
        console.error('Error fetching contest details:', error.message || error);
        setError('Failed to fetch contest details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContestDetail();
  }, [contestId]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const response = await getLeaderboardByContest(contestId || '');
        setLeaderboard(response.users);
      } catch (error: any) {
        console.error('Error fetching leaderboard:', error.message || error);
        setError('Failed to fetch leaderboard.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, [contestId]);

  useEffect(() => {
    const fetchMyRank = async () => {
      setIsLoading(true);
      try {
        const response = await getMyRankinContest(contestId || '');
        setCurrentUser({
          _id: response.user._id,
          myRank: response.myRank,
          myLevel: response.user.level,
          myExp: response.expEarned,
          myUsername: response.user.username,
          myAvatar: response.user.avatar,
        });
      } catch (error: any) {
        console.error('Error fetching current user:', error.message || error);
        setError('Failed to fetch current user.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyRank();
  }, [contestId]);

  useEffect(() => {
    const fetchContestStatus = async () => {
      try {
        const contestStatus = await getContestStatus(contestId || '');
        setContestStatus(contestStatus);
      } catch (error: any) {
        console.error('Error fetching contest status:', error.message || error);
        setError('Failed to fetch contest status.');
      }
    };
    fetchContestStatus();
  }, [contestId]);

  /**
   * Handles navigation to the participate page or displays appropriate modal.
   */
  const handlePlay = () => {
    if (!contestDetail) return;

    const { isActive, startTime, endTime, _id } = contestDetail;

    const now = Date.now();

    const isContestStarted =
      isActive &&
      new Date(startTime).getTime() <= now &&
      new Date(endTime).getTime() >= now;

    const isContestEnded =
      isActive &&
      new Date(endTime).getTime() < now;

    if (isContestStarted) {
      navigate(`/contest/${_id}/pre`);
    } else if (isContestEnded) {
      setShowEndedMD(true); // Show the ContestEndedMD modal
    } else {
      setShowPendingMD(true); // Show the ContestPendingMD modal
    }
  };

  if (isLoading) {
    return (
      <div className="contest-detail-page loading">
        <Loading />
      </div>
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
      <div className={styles.contest_detail_container}>
        <div className={styles.contest_detail_page}>
          <div className={styles.detail}>
            <ContestDetail contestDetail={contestDetail} />
          </div>
          <button onClick={handlePlay} className={styles.participate_button}>
            Play
          </button>
        </div>
        {contestStatus.isActive && contestStatus.isStarted && (
          <ContestLeaderboard
            leaderboard={leaderboard}
            currentUser={currentUser}
          />
        )}
      </div>

      {/* Render the ContestEndedMD modal when showEndedMD is true */}
      {showEndedMD && <ContestEndedMD onClose={() => setShowEndedMD(false)} />}
      {/* Render the ContestPendingMD modal when showPendingMD is true */}
      {showPendingMD && <ContestPendingMD onClose={() => setShowPendingMD(false)} />}
    </Main>
  );
};

export default ContestDetailPage;