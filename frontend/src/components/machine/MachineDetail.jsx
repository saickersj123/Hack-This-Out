import React from 'react';

const MachineDetail = ({ machineDetail }) => {

  return (
    <div className="machine-detail-container">
      <div className="machine-detail-content">
        <h3>Machine Details</h3>
        <p><strong>Name:</strong> {machineDetail.name}</p>
        <p><strong>Category:</strong> {machineDetail.category}</p>
        <p><strong>Description:</strong> {machineDetail.description || 'N/A'}</p>
        <p><strong>Experience Points (EXP):</strong> {machineDetail.exp}</p>
        <p><strong>AMI ID:</strong> {machineDetail.amiId}</p>
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default MachineDetail;
