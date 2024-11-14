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
      <div className="machine-detail">
        <h3>Machine Details</h3>
        <p className="machine-name"><strong>Name:</strong>{name}</p>
        <p><strong>Description: </strong>{description || 'N/A'}</p>
        <p><strong>Experience Points (EXP):</strong>{exp || 0}</p>
        <p><strong>Category:</strong> {category || 'N/A'}</p>
        <div className="machine-rating">
          <p className="rating-text">Rating: </p>
          <StarRatings
            rating={rating}
            starRatedColor="orange"
            numberOfStars={5}
            name='rating'
            starDimension="20px"
            starSpacing="3px"
          />
        </div>
      </div>
    </div>
  );
};

export default MachineDetail;
