import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../api/axiosUser';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import Main from '../../components/main/Main';

/**
 * Interface representing a user in the leaderboard.
 */
interface User {
  _id: string;
  level: number;
  username: string;
  exp: number;
}

/**
 * Component representing the LeaderBoard Page.
 */
const LeaderBoardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Fetches the leaderboard data from the API.
   */
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await getLeaderboard();
        setLeaderboard(response.users); // Assumes response.users is of type User[]
      } catch (error: any) {
        console.error('Error fetching leaderboard:', error.message || error);
        setError('Failed to fetch leaderboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard(); // Invoke the data fetching
  }, []);

  return (
    <Main title="LeaderBoard" description="LeaderBoard 화면입니다.">
      <div className="leaderboard-page">
        {loading && <p>Loading leaderboard...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && <LeaderboardTable leaderboard={leaderboard} />}
      </div>
    </Main>
  );
};

export default LeaderBoardPage;
