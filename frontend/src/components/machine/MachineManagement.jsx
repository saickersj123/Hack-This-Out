import React, { useEffect, useState } from 'react';
import { getPendingMachines, approveMachine } from '../../api/axiosInstance';

const MachineManagement = () => {
  const [pendingMachines, setPendingMachines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPendingMachines = async () => {
      setLoading(true);
      try {
        const data = await getPendingMachines();
        setPendingMachines(data.machines);
      } catch (error) {
        console.error('Error fetching pending machines:', error);
        alert(error.msg || 'Failed to fetch pending machines.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingMachines();
  }, []);

  const handleApprove = async (machineId) => {
    if (!window.confirm('Are you sure you want to approve this machine?')) return;

    try {
      const data = await approveMachine(machineId);
      alert('Machine approved successfully.');
      // Remove the approved machine from the pending list
      setPendingMachines(pendingMachines.filter(machine => machine._id !== machineId));
    } catch (error) {
      console.error('Error approving machine:', error);
      alert(error.msg || 'Failed to approve machine.');
    }
  };

  return (
    <div>
      <h2>Machine Management</h2>
      {loading ? (
        <p>Loading pending machines...</p>
      ) : (
        <div>
          {pendingMachines.length === 0 ? (
            <p>No pending machines.</p>
          ) : (
            <ul>
              {pendingMachines.map(machine => (
                <li key={machine._id}>
                  <p><strong>Name:</strong> {machine.name}</p>
                  <p><strong>Category:</strong> {machine.category}</p>
                  <p><strong>AMI ID:</strong> {machine.amiId}</p>
                  <button onClick={() => handleApprove(machine._id)}>Approve</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MachineManagement;