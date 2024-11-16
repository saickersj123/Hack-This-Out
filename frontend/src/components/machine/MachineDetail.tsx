import React from 'react';
import { MachineDetail as MachineDetailType } from '../../types/Machine';
import '../../assets/scss/machine/MachineDetail.scss';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
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
        {/* <Avatar
          variant="rounded"
          sx={{
            backgroundColor: avatarBgColor,
            width: 150,
            height: 150,
            margin: '0 auto 20px auto',
            fontSize: '3rem'
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar> */}
        <div className='machine-textbox'>
          <p className="machine-name">{name}</p>
          <p>{category || 'N/A'}</p>
          <p><strong>Description:</strong> {description || 'N/A'}</p>
          <div><strong>Rating:</strong>
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
          </div>
        </div>
        <div className='machine-reward-box'>
          <p className='text'>Rewards:</p>
          <p className='reward-text'>EXP {exp || 0}</p>
        </div>
        {/* <p><strong>AMI ID:</strong> {amiId || 'N/A'}</p> */}
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default MachineDetail;
