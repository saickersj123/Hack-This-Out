import React from 'react';
import { MachineDetail as MachineDetailType } from '../../types/Machine';
import '../../assets/scss/machine/MachineDetail.scss'; // Ensure correct styling

/**
 * Props interface for MachineDetail component.
 */
interface MachineDetailProps {
  machineDetail: MachineDetailType;
}

/**
 * A component to display the details of a machine.
 * 
 * @param {MachineDetailProps} props - The props for the MachineDetail component.
 * @returns {JSX.Element} The rendered MachineDetail component.
 */
const MachineDetail: React.FC<MachineDetailProps> = ({ machineDetail }) => {
  const { name, category, description, exp, amiId, rating } = machineDetail;

  return (
    <div className="machine-detail-container">
      <div className="machine-detail-content">
        <h3>Machine Details</h3>
        <p><strong>Name:</strong> {name || 'N/A'}</p>
        <p><strong>Category:</strong> {category || 'N/A'}</p>
        <p><strong>Rating:</strong> {rating.toFixed(1) || 'N/A'}</p>
        <p><strong>Description:</strong> {description || 'N/A'}</p>
        <p><strong>Experience Points (EXP):</strong> {exp || 0}</p>
        <p><strong>AMI ID:</strong> {amiId || 'N/A'}</p>
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default MachineDetail;
