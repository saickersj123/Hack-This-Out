import React from 'react';
import { MachineDetail as MachineDetailType } from '../../types/Machine';
import '../../assets/scss/machine/MachineDetail.scss';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { avatarBackgroundColors, getAvatarColorIndex } from '../../utils/avatars';
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
  const { _id, name, category, description, exp, rating } = machineDetail;

  const avatarColorIndex = getAvatarColorIndex(name);
  const avatarBgColor = avatarBackgroundColors[avatarColorIndex];

  return (
    <div className="machine-detail-container">
      <div className="machine-detail">
        <Avatar
          sx={{
            backgroundColor: avatarBgColor,
            width: 150,
            height: 150,
            margin: '0 auto 20px auto',
            fontSize: '3rem'
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <h3>Machine Details</h3>
        <p className="machine-name"><strong>Name:</strong> {name}</p>
        <p><strong>Description:</strong> {description || 'N/A'}</p>
        <p><strong>Experience Points (EXP):</strong> {exp || 0}</p>
        <p><strong>Category:</strong> {category || 'N/A'}</p>
        <p><strong>Rating:</strong> 
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '8px',
              marginBottom: '8px',
            }}
          >
            <Rating
              name={`read-only-rating-${_id}`}
              value={Number(rating)}
              precision={0.5}
              readOnly
            />
            <span style={{ marginLeft: '8px', color: '#555' }}>{rating.toFixed(1)}</span>
          </Box>
        </p>
        <p><strong>Rewards:</strong> {exp || 0} EXP</p>
        {/* <p><strong>AMI ID:</strong> {amiId || 'N/A'}</p> */}
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default MachineDetail;
