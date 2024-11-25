import React, { useEffect, useState } from 'react';
import { getActiveContests } from '../../api/axiosContest';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';

import styles from '../../assets/scss/contest/ContestList.module.scss';
import { Avatar, Box } from '@mui/material';
import { avatarBackgroundColors, getAvatarColorIndex } from '../../utils/avatars';
import LoadingIcon from '../public/LoadingIcon';
import { IoMdArrowRoundForward } from 'react-icons/io';

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
            {/* <td colSpan={6} className={styles.no_data}>No contests available.</td> */}
          </tr>
        </tbody>
      );
    }

    if (loading) {
      return <LoadingIcon />;
    }

    return (
      <tbody>
        {contestsToDisplay.map((contest) =>
        (
          <tr className={styles.contest_box} key={contest._id}>
            <td className={styles.contest_name}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 16px)', width: '100%' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    backgroundColor: avatarBackgroundColors[getAvatarColorIndex(contest.name)],
                    width: 'clamp(32px, 5vw, 40px)',
                    height: 'clamp(32px, 5vw, 40px)',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                  }}
                >
                  {contest.name.charAt(0).toUpperCase()}
                </Avatar>
                <span>{contest.name.charAt(0).toUpperCase() + contest.name.slice(1)}</span>
              </Box>
            </td>
            <td className={styles.contest_start_time}>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {formatDate(contest.startTime)}
              </Box>
            </td>
            <td className={styles.contest_end_time}>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {formatDate(contest.endTime)}
              </Box>
            </td>
            <td className={styles.contest_reward}>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {contest.contestExp}
              </Box>
            </td>
            <td className={styles.contest_details}>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <button className={styles.details_button} onClick={() => handleContestClick(contest._id)}>
                  <IoMdArrowRoundForward size={'clamp(20px, 2.5vw, 24px)'} color="white" />
                </button>
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <div className={styles.contest_list_container}>
      <div className={styles.contest_list_title}>Contests</div>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab_button} ${activeTab === 'ongoing' ? styles.active : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          <p>Ongoing</p>
        </button>
        <button
          className={`${styles.tab_button} ${activeTab === 'notStarted' ? styles.active : ''}`}
          onClick={() => setActiveTab('notStarted')}
        >
          <p>Not Started</p>
        </button>
        <button
          className={`${styles.tab_button} ${activeTab === 'ended' ? styles.active : ''}`}
          onClick={() => setActiveTab('ended')}
        >
          <p>Ended</p>
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

