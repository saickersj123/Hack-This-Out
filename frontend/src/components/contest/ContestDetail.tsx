import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import { ContestDetail as ContestDetailType } from '../../types/Contest';
import styles from '../../assets/scss/contest/ContestDetail.module.scss';
import { Avatar } from '@mui/material';
import { getAvatarColorIndex } from '../../utils/avatars';
import { avatarBackgroundColors } from '../../utils/avatars';

/**
 * Props interface for ContestDetail component.
 */
interface ContestDetailProps {
  contestDetail: ContestDetailType;
}

/**
 * A component to display the details of a contest.
 * 
 * @param {ContestDetailProps} props - The props for the ContestDetail component.
 * @returns {JSX.Element} The rendered ContestDetail component.
 */
const ContestDetail: React.FC<ContestDetailProps> = ({ contestDetail }) => {
  const { name, contestExp, machines, description, startTime, endTime} = contestDetail;
  const avatarColorIndex = getAvatarColorIndex(name);
  const avatarBgColor = avatarBackgroundColors[avatarColorIndex];
  return (
    <div className={styles.contest_detail_container}>
      <div className={styles.contest_detail_content}>
        <div className={styles.box_upper_content}>
          {<Avatar
            variant="rounded"
            sx={{
              backgroundColor: avatarBgColor,
              width: 150,
              height: 150,
              fontSize: '5rem',
              margin: '0 -250px 0 8px',
            }}
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>}
          <div className={styles.contest_textbox}>
            <div className={styles.contest_name}>{name.charAt(0).toUpperCase() + name.slice(1) || 'N/A'}</div>
            <div className={styles.contest_description}>Description: {description || 'N/A'}</div>
            {machines.length > 0 ? (
            <ul className={styles.contest_machines}>
              <p>Machines: </p>
              {machines.map((machine) => (
                <li key={machine._id}>{machine.name}</li>
              ))}
            </ul>
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div className={styles.contest_reward_box}>
            <p className={styles.text}>Reward</p>
            <p className={styles.reward_text}>{contestExp || 0} EXP</p>
          </div>
        </div>
        <div className={styles.time_text}>{startTime ? formatDate(startTime) : 'N/A'} ~ {endTime ? formatDate(endTime) : 'N/A'}</div>
      </div>
    </div>
  );
};

export default ContestDetail;

