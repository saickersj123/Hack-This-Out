import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMachineDetails } from '../../api/axiosInstance';
import DisplayReward from '../../components/play/DisplayReward';
import GetHints from '../../components/play/GetHints';
import StartInstanceButton from '../../components/play/StartInstanceButton';
import DownloadVPNProfile from '../../components/play/DownloadVPNProfile';
import InstanceInfo from '../../components/play/InstanceInfo';
import SubmitFlagForm from '../../components/play/SubmitFlagForm';
import Main from '../../components/main/Main';

const MachinePlayPage = () => {
    const { machineId } = useParams();
    const [machine, setMachine] = useState([]);

    // Fetch machine details
    useEffect(() => {
        const fetchMachineDetails = async () => {
            try {
                if (!machineId) {
                    throw new Error('Machine ID is missing');
                }
                const response = await getMachineDetails(machineId);
                setMachine(response.machine);
            } catch (error) {
                console.error('Error fetching machine details:', error.message || error);
            }
        };
        fetchMachineDetails();
    }, [machineId]);

    return (
        <Main>
            <div className='machine-play-title'>
                <h2>Machine Play</h2>
            </div>
                <>
                    <div className='machine-play-name'>
                        <h3>{machine.name}</h3>
                    </div>
                    <DisplayReward reward={machine.exp} />
                    <DownloadVPNProfile />   
                    <InstanceInfo machineId={machineId} />
                    <StartInstanceButton machineId={machineId} />
                    <GetHints machineId={machineId} />
                    <SubmitFlagForm machineId={machineId} />
                </>
        </Main>
    );
};

export default MachinePlayPage;
