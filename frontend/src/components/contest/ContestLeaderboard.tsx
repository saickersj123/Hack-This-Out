// frontend/src/components/contest/ContestLeaderboard.tsx

import React, { useState, useEffect } from 'react';
import { getLeaderboardByContest } from '../../api/axiosContest';
import styles from '../../assets/scss/contest/ContestLeaderboard.module.scss'; // Import the CSS Module
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'; // Assuming used for pagination

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10; // Adjust as needed

  /**
   * Fetches the leaderboard data for the given contest if the contest is active and started.
   */
  useEffect(() => {
    const fetchLeaderboard = async () => {
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
   * Determines the contest status message.
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

  /**
   * Calculates the total number of pages.
   */
  const totalPages = Math.ceil(leaderboard.length / ITEMS_PER_PAGE);

  /**
   * Gets the leaderboard entries for the current page.
   */
  const currentLeaderboard = leaderboard.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  /**
   * Handles changing the current page.
   * 
   * @param {number} page - The page number to navigate to.
   */
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.board}>
      <div className={styles.leaderboard_container}>
        <h2>Leaderboard</h2>
        {isLoading ? (
          <div className={styles.loading}>
            <p>Loading leaderboard...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p className="error-message">{error}</p>
          </div>
        ) : contestStatus.isActive && contestStatus.isStarted ? (
          leaderboard.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Participant</th>
                    <th>EXP Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeaderboard.map((entry, index) => (
                    <tr key={`${entry.userId}-${index}`}>
                      <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      <td>{entry.username}</td>
                      <td>{entry.expEarned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Buttons */}
              <div className={styles.pagination}>
                <button
                  className={styles.page_button}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <IoIosArrowBack />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`${styles.page_number} ${currentPage === i + 1 ? styles.active : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className={styles.page_button}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </>
          ) : (
            <div className={styles.no_data}>No leaderboard data available.</div>
          )
        ) : (
          <p>{getStatusMessage()}</p>
        )}
      </div>
    </div>
  );
};

export default ContestLeaderboard;