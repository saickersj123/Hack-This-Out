import React, { useEffect, useState } from 'react';
import { getActiveContests } from '../../api/axiosContest';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/dateUtils';

import styles from '../../assets/scss/contest/ContestList.module.scss';
import { BsArrowRightCircle } from "react-icons/bs";

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
  ongoingContests: Contest[];
  notStartedContests: Contest[];
  endedContests: Contest[];
}

const ContestList: React.FC = () => {
  const [ongoingContests, setOngoingContests] = useState<Contest[]>([]);
  const [notStartedContests, setNotStartedContests] = useState<Contest[]>([]);
  const [endedContests, setEndedContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'ongoing' | 'notStarted' | 'ended'>('ongoing');
  const navigate = useNavigate();

  const fetchContests = async () => {
    try {
      const data: ContestsResponse = await getActiveContests();
      setOngoingContests(data.ongoingContests);
      setNotStartedContests(data.notStartedContests);
      setEndedContests(data.endedContests);
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

  const renderContests = () => {
    let contestsToDisplay: Contest[] = [];

    if (activeTab === 'ongoing') {
      contestsToDisplay = ongoingContests;
    } else if (activeTab === 'notStarted') {
      contestsToDisplay = notStartedContests;
    } else if (activeTab === 'ended') {
      contestsToDisplay = endedContests;
    }

    if (contestsToDisplay.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={5} className="no-data">No contests available.</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {contestsToDisplay.map((contest) => (
          <tr className={styles.contest_box} key={contest._id}>
            <td className={styles.contest_name}>{contest.name || 'N/A'}</td>
            <td className={styles.contest_start_time}>{contest.startTime ? formatDate(contest.startTime) : 'N/A'}</td>
            <td className={styles.contest_end_time}>{contest.endTime ? formatDate(contest.endTime) : 'N/A'}</td>
            <td className={styles.contest_reward}>{contest.contestExp}</td>
            <td className={styles.contest_details}>
              <button className={styles.details_button} onClick={() => handleContestClick(contest._id)}>
                <BsArrowRightCircle size={24} color="white" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  if (loading) {
    return <p>Loading contests...</p>;
  }

  return (
    <div className={styles.contest_list_container}>
      <div className={styles.contest_list_title}>Contest List</div>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab_button} ${activeTab === 'ongoing' ? styles.active : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing Contests
        </button>
        <button
          className={`${styles.tab_button} ${activeTab === 'notStarted' ? styles.active : ''}`}
          onClick={() => setActiveTab('notStarted')}
        >
          Not Started Contests
        </button>
        <button
          className={`${styles.tab_button} ${activeTab === 'ended' ? styles.active : ''}`}
          onClick={() => setActiveTab('ended')}
        >
          Ended Contests
        </button>
      </div>
      <table className={styles.contest_list_table}>
        <thead>
          <tr className={styles.table_text_box}>
            <th className={styles.table_name}>Name</th>
            <th className={styles.table_start_time}>Start Time</th>
            <th className={styles.table_end_time}>End Time</th>
            <th className={styles.table_reward}>Reward</th>
            <th className={styles.table_details}>Details</th>
          </tr>
        </thead>
        {renderContests()}
      </table>
    </div>
  );
};

export default ContestList;

