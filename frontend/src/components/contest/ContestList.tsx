import React, { useEffect, useState } from 'react';
import { getActiveContests } from '../../api/axiosContest';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/dateUtils';

import styles from '../../assets/scss/contest/ContestList.module.scss';
import { FaArrowRightToBracket } from "react-icons/fa6";


interface Contest {
  _id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  contestExp: number;
  isActive: boolean;
}

interface ContestsResponse {
  contests: Contest[];
}

const ContestList: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchContests = async () => {
    try {
      const data: ContestsResponse = await getActiveContests();
      setContests(data.contests);
    } catch (error) {
      console.error('Error fetching contests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const handleContestClick = (contestId: string) => {
    navigate(`/contest/${contestId}`);
  };
  if (loading) {
    return <p>Loading contests...</p>;
  }

  return (
    <div className={styles.contest_list_container}>
      <div className={styles.contest_list_title}>Contest List</div>
      <table className={styles.contest_list_table}>
        {contests.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={7} className="no-data">No contests available.</td>
            </tr>
          </tbody>
        ) : (
          <>
            <thead>
              <tr className={styles.table_text_box}>
                <th className={styles.table_name}>Name</th>
                <th className={styles.table_start_time}>Start Time</th>
                <th className={styles.table_end_time}>End Time</th>
                <th className={styles.table_reward}>Reward</th>
                <th className={styles.table_details}>Details</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr className={styles.contest_box} key={contest._id}>
                  <td className={styles.contest_name}>{contest.name || 'N/A'}</td>
                  <td className={styles.contest_start_time}>{contest.startTime ? formatDate(contest.startTime) : 'N/A'}</td>
                  <td className={styles.contest_end_time}>{contest.endTime ? formatDate(contest.endTime) : 'N/A'}</td>
                  <td className={styles.contest_reward}>{contest.contestExp}</td>
                  <td className={styles.contest_details}>
                    <button className={styles.details_button} onClick={() => handleContestClick(contest._id)}><FaArrowRightToBracket size={24} color="white" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default ContestList;

