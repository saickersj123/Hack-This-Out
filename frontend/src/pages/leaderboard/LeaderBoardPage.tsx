// frontend/src/pages/leaderboard/LeaderBoardPage.tsx

import React, { useState, useEffect } from 'react';
import { getLeaderboard, getMyRank } from '../../api/axiosUser';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import Main from '../../components/main/Main';
import { User } from '../../types/User';
import { CurrentUser } from '../../types/CurrentUser';



/**
 * Component representing the LeaderBoard Page.
 */
const LeaderBoardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    myRank: null,
    myLevel: null,
    myExp: null,
    myUsername: null,
    myAvatar: null,
  });

  /**
   * Fetches the leaderboard data from the API.
   */
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await getLeaderboard();
        console.log('Leaderboard API Response:', response); // Debugging log

        // Adjust based on actual response structure
        // Example: If response.users is the array
        if (response && Array.isArray(response.users)) {
          setLeaderboard(response.users);
        } else if (response && Array.isArray(response.data)) {
          setLeaderboard(response.data);
        } else if (Array.isArray(response)) {
          setLeaderboard(response);
        } else {
          console.error('Unexpected leaderboard data structure:', response);
          setLeaderboard([]); // Fallback to empty array
        }
      } catch (error: any) {
        console.error('Error fetching leaderboard:', error.message || error);
        setError('Failed to fetch leaderboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard(); // Invoke the data fetching
  }, []);

  /**
   * Fetches the current user's rank and information from the API.
   */
  useEffect(() => {
    const fetchMyRank = async () => {
      try {
        const response = await getMyRank();
        console.log('My Rank API Response:', response); // Debugging log

        // Adjust based on actual response structure
        // Example:
        if (response && response.myRank !== undefined && response.user) {
          setCurrentUser({
            myRank: response.myRank,
            myLevel: response.user.level,
            myExp: response.user.exp,
            myUsername: response.user.username,
            myAvatar: response.user.avatar,
          });
        } else {
          console.error('Unexpected myRank data structure:', response);
          setError('Failed to fetch my rank data.');
        }
      } catch (error: any) {
        console.error('Error fetching my rank:', error.message || error);
        setError('Failed to fetch my rank data.');
      }
    };
    fetchMyRank();
  }, []);

  return (
    <Main title="LeaderBoard" description="LeaderBoard 화면입니다.">
      <div className="leaderboard-page">
        {loading && <p>Loading leaderboard...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <LeaderboardTable 
            leaderboard={leaderboard} 
            currentUser={currentUser} 
            isContest={false}
          />
        )}
      </div>
    </Main>
  );
};

export default LeaderBoardPage;