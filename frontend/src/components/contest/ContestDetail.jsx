import React from 'react';
import formatDate from '../../utils/dateUtils';

const ContestDetail = ({ contestDetail }) => {
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
          {machines && machines.length > 0 ? (
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
