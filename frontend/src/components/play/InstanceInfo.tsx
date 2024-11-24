import React, { useEffect, useState } from 'react';
import { getInstanceByMachine } from '../../api/axiosInstance';
import { Instance } from '../../types/Instance';
import LoadingIcon from '../public/LoadingIcon';
import ErrorIcon from '../public/ErrorIcon';
import '../../assets/scss/play/InstanceInfo.scss';
import { FaDotCircle } from "react-icons/fa";


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
        return 'rgb(35, 174, 35)';
      default:
        return 'black';
    }
  };

  return (
    <div className="instance-info-container">
      <div className='upper-text'>
        <FaDotCircle size={40} color={getStatusColor(instance.status)} />
        <h2>Spawn Machine</h2>
      </div>
      <h3>Create machine and Start hacking.</h3>
      <div
        className="vpn-info"
        style={{
          border: `2px solid ${getStatusColor(instance.status)}`, // 백틱(`)으로 문자열 템플릿 사용
        }}
      >
        VPN IP: {instance.vpnIp}
      </div>
    </div>
  );
};

export default InstanceInfo;