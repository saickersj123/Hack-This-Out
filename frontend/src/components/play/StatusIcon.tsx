import React from 'react';
import { FaRegCircle, FaRegDotCircle, FaRegCheckCircle } from 'react-icons/fa';
import { MdFlagCircle } from "react-icons/md";
import '../../assets/scss/play/StatusIcon.scss';

interface StatusIconProps {
  status: string;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  switch (status) {
    case 'idle':
      return (
        <div className='status-icon-container'>
          <FaRegCircle size={30} color="#ccc" title="Idle" />
          <div className="vertical-line"></div>
        </div>
      );
    case 'inProgress':
    case 'pending':
      return(
        <div className='status-icon-container'>
          <FaRegDotCircle size={30} color="#f39c12" title="In Progress" />
          <div className="vertical-line progress"></div>
        </div>
      );
    case 'completed':
    case 'running':
      return (
        <div className='status-icon-container'>
          <FaRegCheckCircle size={30} color="#27ae60" title="Completed" />
          <div className="vertical-line completed"></div>
        </div>
      );
    case 'flag' :
      return (
        <div className='status-icon-container flag'>
        <MdFlagCircle size={40} color="#ccc" title="Flag" />
        </div>
      );
    case 'flag-success':
      return (
        <div className='status-icon-container flag'>
        <MdFlagCircle size={40} color="#27ae60" title="Flag-success" />
        </div>
      )
    default:
      return null;
  }
};

export default StatusIcon;
