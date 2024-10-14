// frontend/src/components/InstanceList.jsx
import React, { useEffect, useState } from 'react';
import { getAllInstances, getInstanceDetails, deleteInstance } from '../../api/axiosInstance';
import InstanceDetail from './InstanceDetail';
import SubmitFlagForm from './SubmitFlagForm';
import DeleteInstanceButton from './DeleteInstanceButton';

const InstanceList = () => {
  const [instances, setInstances] = useState([]);
  const [selectedInstance, setSelectedInstance] = useState(null);

  useEffect(() => {
    // Fetch all instances for the user on component mount
    const fetchInstances = async () => {
      try {
        const allInstances = await getAllInstances();
        console.log('API Response:', allInstances); // Add this line        
        setInstances(allInstances);
      } catch (error) {
        console.error('Error fetching instances:', error);
      }
    };

    fetchInstances();
  }, []);

  const handleViewDetails = async (instanceId) => {
    try {
      const details = await getInstanceDetails(instanceId);
      setSelectedInstance(details);
    } catch (error) {
      console.error('Error fetching instance details:', error);
    }
  };

  const handleDelete = async (instanceId) => {
    try {
      await deleteInstance(instanceId);
      setInstances(instances.filter((instance) => instance.instanceId !== instanceId));
      alert('Instance deleted successfully.');
    } catch (error) {
      console.error('Error deleting instance:', error);
      alert('Failed to delete instance.');
    }
  };

  return (
    <div>
      <h2>Your Instances</h2>
      {instances.length === 0 ? (
        <p>No instances found.</p>
      ) : (
        <ul>
          {instances.map((instance) => (
            <li key={instance.instanceId}>
              <p>Instance ID: {instance.instanceId}</p>
              <p>Machine Type: {instance.machineType}</p>
              <p>Status: {instance.status}</p>
              <button onClick={() => handleViewDetails(instance.instanceId)}>View Details</button>
              <DeleteInstanceButton instanceId={instance.instanceId} onDelete={handleDelete} />
              {instance.status === 'running' && (
                <SubmitFlagForm instanceId={instance.instanceId} />
              )}
            </li>
          ))}
        </ul>
      )}
      {selectedInstance && (
        <InstanceDetail instance={selectedInstance} onClose={() => setSelectedInstance(null)} />
      )}
    </div>
  );
};

export default InstanceList;

