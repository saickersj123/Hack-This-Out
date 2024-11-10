import React, { useEffect, useState } from 'react';
import { getInstanceByMachine } from '../../api/axiosInstance';

/**
 * Props interface for InstanceInfo component.
 */
interface InstanceInfoProps {
  machineId: string;
}

/**
 * Interface representing the Instance details.
 */
interface Instance {
  status: 'stopped' | 'pending' | 'running' | null;
  vpnIp: string;
  // Add other instance properties as needed
}

/**
 * Component to display instance information.
 */
const InstanceInfo: React.FC<InstanceInfoProps> = ({ machineId }) => {
  const [instance, setInstance] = useState<Instance | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!machineId) {
      console.warn('InstanceInfo: machineId is not provided');
      return;
    }

    let isMounted = true; // To prevent setting state on unmounted component

    const fetchInstanceInfo = async () => {
      try {
        console.log('Fetching instance info for machineId:', machineId);
        const response = await getInstanceByMachine(machineId);
        console.log('Fetched instance data:', response);
        if (isMounted) {
          setInstance(response.instance[0]);
        }
      } catch (error: any) {
        console.error('Error fetching instance info:', error.message || error);
        if (isMounted) {
          setError('Failed to fetch instance information.');
        }
      }
    };

    // Initial fetch
    fetchInstanceInfo();

    // Set up interval to fetch every 10 seconds (10000 milliseconds)
    const intervalId = setInterval(fetchInstanceInfo, 10000);

    // Cleanup function
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [machineId]);

  if (error) {
    return <div className="instance-error">Error: {error}</div>;
  }

  if (!instance) {
    return <div className="instance-status">Start your instance</div>;
  }

  /**
   * Determines the color based on the instance status.
   * @param status - The current status of the instance.
   * @returns The corresponding color.
   */
  const getStatusColor = (status: Instance['status']): string => {
    switch (status) {
      case 'stopped':
      case null:
        return 'red';
      case 'pending':
        return 'yellow';
      case 'running':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <div className="instance-info-container">
      <h4
        style={{
          color: getStatusColor(instance.status),
        }}
      >
        Instance Status: {instance.status}
      </h4>
      <h4>VPN IP: {instance.vpnIp}</h4>
    </div>
  );
};

export default InstanceInfo;
