import React from 'react';
import { MachineDetail as MachineDetailType } from '../../types/Machine';
import '../../assets/scss/machine/MachineDetail.scss';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

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
  const { name, category, description, exp, rating } = machineDetail;

  return (
    <div className="machine-detail-container">
      <div className="machine-detail-content">
        <h3>Machine Details</h3>
        <p><strong>Name:</strong> {name || 'N/A'}</p>
        <p><strong>Category:</strong> {category || 'N/A'}</p>
        <p><strong>Rating:</strong> 
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name={`read-only-rating-${machineDetail._id}`}
              value={Number(rating)}
              precision={0.5}
              readOnly
            />
          </Box>
        </p>
        <p><strong>Description:</strong> {description || 'N/A'}</p>
        <p><strong>Rewards:</strong> {exp || 0} EXP</p>
        {/* <p><strong>AMI ID:</strong> {amiId || 'N/A'}</p> */}
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default MachineDetail;
