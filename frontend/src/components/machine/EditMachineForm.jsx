import React from 'react';

const MachineDetail = ({ machine, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Machine Details</h3>
        <p><strong>Name:</strong> {machine.name}</p>
        <p><strong>Category:</strong> {machine.category}</p>
        <p><strong>Info:</strong> {machine.info || 'N/A'}</p>
        <p><strong>Experience Points (EXP):</strong> {machine.exp}</p>
        <p><strong>AMI ID:</strong> {machine.amiId}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MachineDetail;