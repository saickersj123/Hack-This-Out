import React, { useState, useEffect } from 'react';
import { getLeaderboardByContest } from '../../api/axiosContest';
import '../../assets/scss/contest/ContestLeaderboard.scss';

interface LeaderboardEntry {
  userId: string;
  username: string;
  expEarned: number;
}

interface ContestStatus {
  isActive: boolean;
  isStarted: boolean;
}

interface ContestLeaderboardProps {
  contestId: string;
  contestStatus: ContestStatus;
}

/**
 * ContestLeaderboard component displays the ranking of participants in a contest or relevant status messages.
 * 
 * @param {ContestLeaderboardProps} props - The props containing contestId and contestStatus.
 * @returns {JSX.Element} The rendered ContestLeaderboard component.
 */
const ContestLeaderboard: React.FC<ContestLeaderboardProps> = ({ contestId, contestStatus }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the leaderboard data for the given contest if the contest is active and started.
   */
  useEffect(() => {
    const fetchLeaderboard = async () => {
      // Only fetch leaderboard if contest is active and has started
      if (contestStatus.isActive && contestStatus.isStarted) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await getLeaderboardByContest(contestId);
          setLeaderboard(response.users);
        } catch (err: any) {
          console.error('Error fetching leaderboard:', err.message || err);
          setError('Failed to load leaderboard.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setLeaderboard([]);
      }
    };

    fetchLeaderboard();
  }, [contestId, contestStatus.isActive, contestStatus.isStarted]);

  /**
   * Renders a status message based on the contest's state.
   * 
   * @returns {string} The status message.
   */
  const getStatusMessage = (): string => {
    if (!contestStatus.isActive) {
      return 'Contest is not active.';
    }

    if (!contestStatus.isStarted) {
      return 'Contest has not started yet.';
    }

    return 'No leaderboard data available.';
  };

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {isLoading ? (
        <div className="leaderboard loading">
          <p>Loading leaderboard...</p>
        </div>
      ) : error ? (
        <div className="leaderboard error">
          <p className="error-message">{error}</p>
        </div>
      ) : contestStatus.isActive && contestStatus.isStarted ? (
        leaderboard.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Participant</th>
                <th>EXP Earned</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={`${entry.userId}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{entry.username}</td>
                  <td>{entry.expEarned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leaderboard data available.</p>
        )
      ) : (
        <p>{getStatusMessage()}</p>
      )}
    </div>
  );
};

export default ContestLeaderboard;