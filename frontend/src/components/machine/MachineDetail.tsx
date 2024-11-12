import React from 'react';
import { MachineDetail as MachineDetailType } from '../../types/Machine';
import '../../assets/scss/machine/MachineDetail.scss';
import StarRatings from 'react-star-ratings';

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
      <div className="machine-detail-header">
        <h3 className="machine-name">{name}</h3>
        <div className="machine-rating">
          <StarRatings
            rating={rating}
            starRatedColor="orange"
            numberOfStars={5}
            name='rating'
            starDimension="20px"
            starSpacing="3px"
          />
          <p className="rating-text">Rating: {rating.toFixed(1) || 'N/A'}</p>
        </div>
      </div>
      <hr />
      <div className="machine-detail-content">
        <div className="left-section">
          <p><strong>About name</strong></p>
          <p>{description || 'N/A'}</p>
        </div>
        <div className="right-section">
          <p><strong>Category:</strong> {category || 'N/A'}</p>
          <p><strong>Experience Points (EXP):</strong> {exp || 0}</p>
          <p><strong>AMI ID:</strong> {amiId || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default MachineDetail;
