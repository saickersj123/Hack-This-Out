import React from 'react';
import { MachineDetail as MachineDetailType } from '../../types/Machine';
import '../../assets/scss/machine/MachineDetail.scss';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
import { avatarBackgroundColors, getAvatarColorIndex } from '../../utils/avatars';
import { Avatar } from '@mui/material';
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
        <div className="avatar-container">
          <Avatar
            variant="rounded"
            sx={{
              backgroundColor: avatarBgColor,
              width: '100%',
              height: 'auto',
              aspectRatio: '1 / 1',
              fontSize: 'clamp(3.5rem, 7vw, 5rem)',
            }}
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        <div className='machine-textbox'>
          <p className="machine-name"><b>{name.charAt(0).toUpperCase() + name.slice(1)}</b></p>
          <p className='machine-category'><b>Category: </b>{category || 'N/A'}</p>
          <div className='description'><p><b>Description: </b>{description || 'N/A'}</p></div>
        </div>
        <div className='right-part'>
          <div className='rating-box'>
            <Box
              sx={{
                marginTop: '8px',
              }}
            >
              <Rating
                name={`read-only-rating-${_id}`}
                value={Number(rating)}
                precision={0.5}
                readOnly
              />
            </Box>
            <span style={{ marginLeft: '32px', color: '#fff' }}>{rating.toFixed(1)} / 5.0</span>
          </div>
          <div className='machine-reward-box'>
            <p className='text'>Reward</p>
            <p className='reward-text'>{exp || 0} EXP</p>
          </div>
          {/* <p><strong>AMI ID:</strong> {amiId || 'N/A'}</p> */}
          {/* Add more fields as necessary */}
        </div>
      </div>
    </div>
  );
};

export default MachineDetail;
