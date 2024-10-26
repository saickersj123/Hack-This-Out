import React, { useEffect, useState } from 'react';
import { getInstanceByMachine } from '../../api/axiosInstance';

const InstanceInfo = ({ machineId }) => {
    const [instance, setInstance] = useState(null); // Initialize as null
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        if (!machineId) {
            console.warn('InstanceInfo: machineId is not provided');
            return;
        }

        let isMounted = true; // To prevent setting state on unmounted component

        const fetchInstanceInfo = async () => {
            try {
                console.log('Fetching instance info for machineId:', machineId);
                const instanceData = await getInstanceByMachine(machineId);
                console.log('Fetched instance data:', instanceData);
                if (isMounted) {
                    setInstance(instanceData.instance[0]);
                }
            } catch (error) {
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
        return <div>Error: {error}</div>;
    }

    if (!instance) {
        return <div>Start your instance</div>;
    }

    return (
        <div>
            <h4
                style={{
                    color:
                        instance.status === 'stopped' || instance.status === null
                            ? 'red'
                            : instance.status === 'pending'
                            ? 'yellow'
                            : 'green',
                }}
            >
                Instance Status: {instance.status}
            </h4>
            <h4>Vpn IP: {instance.vpnIp}</h4>
        </div>
    );
};

export default InstanceInfo;
