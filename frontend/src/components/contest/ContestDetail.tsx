import React from 'react';
import formatDate from '../../utils/dateUtils';
import { ContestDetail as ContestDetailType } from '../../types/Contest';
import '../../assets/scss/contest/ContestDetail.scss'; // Ensure correct styling

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
  const { name, description, contestExp, machines, startTime, endTime, isActive } = contestDetail;

  return (
    <div className="contest-detail-container">
      <div className="contest-detail-content">
        <h3>Contest Details</h3>
        <p><strong>Name:</strong> {name || 'N/A'}</p>
        <p><strong>Description:</strong> {description || 'N/A'}</p>
        <p><strong>Experience Points (EXP):</strong> {contestExp || 0}</p>
        <div>
          <strong>Machines:</strong>
          {machines.length > 0 ? (
            <ul>
              {machines.map((machine) => (
                <li key={machine._id}>{machine.name}</li>
              ))}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>
        <p><strong>Start Time:</strong> {startTime ? formatDate(startTime) : 'N/A'}</p>
        <p><strong>End Time:</strong> {endTime ? formatDate(endTime) : 'N/A'}</p>
        <p><strong>Status:</strong> {isActive ? 'Active' : 'Inactive'}</p>
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default ContestDetail;

