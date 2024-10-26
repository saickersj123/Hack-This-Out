import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMachineDetails, getAllInstances, getInstanceDetails } from '../../api/axiosInstance';
import DisplayReward from '../../components/play/DisplayReward';
import GetHints from '../../components/play/GetHints';
import StartInstanceButton from '../../components/play/StartInstanceButton';
import DownloadVPNProfile from '../../components/play/DownloadVPNProfile';
import InstanceInfo from '../../components/play/InstanceInfo';
import SubmitFlagForm from '../../components/play/SubmitFlagForm';
import Main from '../../components/main/Main';

const MachinePlayPage = () => {
    const [reward, setReward] = useState(0);
    const [hints, setHints] = useState([]);
    const [instanceStatus, setInstanceStatus] = useState('');
    const [vpnIp, setVpnIp] = useState('');
    const [instanceId, setInstanceId] = useState('');
    const [isVPNDownloaded, setIsVPNDownloaded] = useState(false);
    const machineId = useParams();

    // Fetch machine details
    useEffect(() => {
        const fetchMachineDetails = async () => {
            try {
                const response = await getMachineDetails(machineId);
                setReward(response.exp);
                setHints(response.hints);
            } catch (error) {
                console.error('Error fetching machine details:', error.message || error);
            }
        };
        fetchMachineDetails();
    }, [machineId]);

    // Fetch all instances
    useEffect(() => {
        const fetchInstances = async () => {
            try {
                const response = await getAllInstances();
                if (response.length > 0) {
                    setInstanceId(response[0].instanceId);
                }
            } catch (error) {
                console.error('Error fetching instances:', error.message || error);
            }
        };
        fetchInstances();
    }, []);

    // Fetch instance info
    useEffect(() => {
        const fetchInstanceInfo = async () => {
            if (instanceId) {
                try {
                    const response = await getInstanceDetails(instanceId);
                    setInstanceStatus(response.status);
                    setVpnIp(response.vpnIp);
                } catch (error) {
                    console.error('Error fetching instance details:', error.message || error);
                }
            }
        };
        fetchInstanceInfo();
    }, [instanceId]);

    // Handler for VPN download completion
    const handleVPNDownload = () => {
        setIsVPNDownloaded(true);
    };

    // Determine if all prerequisites are met
    const isReady = isVPNDownloaded && instanceStatus === 'running';

    return (
        <Main>
            <DisplayReward reward={reward} />
            <DownloadVPNProfile onDownload={handleVPNDownload} />
            {/* Disable components until VPN is downloaded and instance is running */}
            <div>
                {instanceStatus !== 'running' && instanceStatus !== 'pending' ? (
                    <StartInstanceButton 
                        onStartSuccess={() => setInstanceStatus('running')} 
                        disabled={!isVPNDownloaded}
                    />
                ) : (
                    <InstanceInfo instanceStatus={instanceStatus} vpnIp={vpnIp} />
                )}
            </div>
            <GetHints hints={hints} disabled={!isReady} />
            <SubmitFlagForm machineId={machineId} instanceId={instanceId} disabled={!isReady} />
        </Main>
    );
};

export default MachinePlayPage;
