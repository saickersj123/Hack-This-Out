// frontend/src/components/InstanceDetail.jsx
import React from 'react';

const InstanceDetail = ({ instance, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Instance Details</h3>
        <p><strong>Instance ID:</strong> {instance.instanceId}</p>
        <p><strong>Machine Type:</strong> {instance.machineType}</p>
        <p><strong>Status:</strong> {instance.status}</p>
        <p><strong>VPN IP:</strong> {instance.vpnIp || 'Not Available'}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InstanceDetail;

