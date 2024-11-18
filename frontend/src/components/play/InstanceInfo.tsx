import React, { useEffect, useState } from 'react';
import { getInstanceByMachine } from '../../api/axiosInstance';
import { Instance } from '../../types/Instance';
import LoadingIcon from '../public/LoadingIcon';
import ErrorIcon from '../public/ErrorIcon';

/**
 * Props interface for InstanceInfo component.
 */
export interface InstanceInfoProps {
  machineId: string;
  onStatusChange?: (status: Instance['status']) => void; // Callback prop
}

/**
 * Component to display instance information.
 */
const InstanceInfo: React.FC<InstanceInfoProps> = ({ machineId, onStatusChange }) => {
  const [instance, setInstance] = useState<Instance | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false); // To track fetching state

  useEffect(() => {
    if (!machineId) {
      console.warn('InstanceInfo: machineId is not provided');
      return;
    }

    let isMounted = true; // To prevent setting state on unmounted component

    const fetchInstanceInfo = async () => {
      setIsFetching(false);
      try {
        console.log('Fetching instance info for machineId:', machineId);
        const response = await getInstanceByMachine(machineId);
        console.log('Fetched instance data:', response);

        if (isMounted) {
          if (response.instance) {
            const currentInstance = response.instance;
            setInstance(currentInstance);
            if (onStatusChange) {
              onStatusChange(currentInstance.status);
            }
          } else {
            setInstance(null);
            if (onStatusChange) {
              onStatusChange(null);
            }
          }
        }
      } catch (error: any) {
        console.error('Error fetching instance info:', error.message || error);
        if (isMounted) {
          setError('Failed to fetch instance information.');
          if (onStatusChange) {
            onStatusChange(null);
          }
        }
      } finally {
        if (isMounted) {
          setIsFetching(false);
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
  }, [machineId, onStatusChange]);

  if (isFetching) {
    return <div className="instance-info-container"><LoadingIcon /></div>;
  }

  if (error) {
    return <div className="instance-error"><ErrorIcon /> {error}</div>;
  }

  if (!instance) {
    return <div className="instance-status"><LoadingIcon /></div>;
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
    <div className="instance-info-container" style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
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