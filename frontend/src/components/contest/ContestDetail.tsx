import React from 'react';
import formatDate from '../../utils/dateUtils';
import { ContestDetail as ContestDetailType } from '../../types/Contest';
import styles from '../../assets/scss/contest/ContestDetail.module.scss';

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
  const { name, contestExp, machines, startTime, endTime} = contestDetail;

  return (
    <div className={styles.contest_detail_container}>
      <div className={styles.contest_detail_content}>
        <div className={styles.box_upper_content}>
          <div className={styles.contest_textbox}>
            <div className={styles.contest_name}>{name || 'N/A'}</div>
            {machines.length > 0 ? (
            <ul className={styles.contest_machines}>
              {machines.map((machine) => (
                <li key={machine._id}>{machine.name}</li>
              ))}
            </ul>
          ) : (
            <p>N/A</p>
          )}
          </div>
          <div className={styles.contest_description}>
            <p>Description: {description}</p>
          </div>
          <div className={styles.contest_reward_box}>
            <p className={styles.text}>Reward:</p>
            <p className={styles.reward_text}>EXP {contestExp || 0}</p>
          </div>
        </div>
        <div className={styles.time_text}>{startTime ? formatDate(startTime) : 'N/A'} ~ {endTime ? formatDate(endTime) : 'N/A'}</div>
      </div>
    </div>
  );
};

export default ContestDetail;

