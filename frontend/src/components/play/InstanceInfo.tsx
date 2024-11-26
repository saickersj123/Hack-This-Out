import React, { useEffect, useState } from 'react';
import { getInstanceByMachine } from '../../api/axiosInstance';
import { Instance } from '../../types/Instance';
import LoadingIcon from '../public/LoadingIcon';
import ErrorIcon from '../public/ErrorIcon';
import '../../assets/scss/play/InstanceInfo.scss';
import { FaDotCircle } from "react-icons/fa";
import { usePlayContext } from '../../contexts/PlayContext';

/**
 * Props interface for InstanceInfo component.
 */
export interface InstanceInfoProps {
  machineId: string;
}

const InstanceInfo: React.FC<InstanceInfoProps> = ({ machineId }) => {
  const [instance, setInstance] = useState<Instance | null>(null);
  const [error, setError] = useState<string | null>(null);
  //const [isFetching, setIsFetching] = useState<boolean>(false);

  const { setInstanceStatus } = usePlayContext();

  useEffect(() => {
    if (!machineId) {
      console.warn('InstanceInfo: machineId is not provided');
      return;
    }

    let isMounted = true;

    const fetchInstanceInfo = async () => {
      //setIsFetching(true);
      try {
        console.log('Fetching instance info for machineId:', machineId);
        const response = await getInstanceByMachine(machineId);
        console.log('Fetched instance data:', response);

        if (isMounted) {
          if (response.instance) {
            const currentInstance = response.instance;
            setInstance(currentInstance);
            setInstanceStatus(currentInstance.status);
          } else {
            setInstance(null);
            setInstanceStatus(null);
          }
        }
      } catch (error: any) {
        console.error('Error fetching instance info:', error.message || error);
        if (isMounted) {
          setError('Failed to fetch instance information.');
          setInstanceStatus(null);
        }
      } finally {
        if (isMounted) {
          //setIsFetching(false);
        }
      }
    };

    fetchInstanceInfo();

    const intervalId = setInterval(fetchInstanceInfo, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [machineId, setInstanceStatus]);

  /* 
  if (isFetching) {
    return <div className="instance-info-container"></div>;
  }
  */

  if (error) {
    return <div className="instance-error"><ErrorIcon /> {error}</div>;
  }

  if (!instance) {
    return <div className="instance-status"><LoadingIcon /></div>;
  }

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
          border: `2px solid ${getStatusColor(instance.status)}`,
        }}
      >
        VPN IP: {instance.vpnIp}
      </div>
    </div>
  );
};

export default InstanceInfo;