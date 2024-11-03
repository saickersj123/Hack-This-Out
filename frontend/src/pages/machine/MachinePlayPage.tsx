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
//import '../../assets/scss/machine/machinePlayPage.scss';

/**
 * Interface representing the Machine details.
 */
interface Machine {
  id: string;
  name: string;
  exp: number;
  // Add other machine properties as needed
}

/**
 * Interface for API response when fetching machine details.
 */
interface GetMachineDetailsResponse {
  machine: Machine;
  // Add other response properties if available
}

/**
 * Component representing the Machine Play Page.
 */
const MachinePlayPage: React.FC = () => {
  const { machineId } = useParams<{ machineId: string }>();
  const [machine, setMachine] = useState<Machine | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch machine details
  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        if (!machineId) {
          throw new Error('Machine ID is missing');
        }
        const response: GetMachineDetailsResponse = await getMachineDetails(machineId);
        setMachine(response.machine);
      } catch (error: any) {
        console.error('Error fetching machine details:', error.message || error);
        setError('Failed to fetch machine details.');
      }
    };
    fetchMachineDetails();
  }, [machineId]);

  if (error) {
    return (
      <Main>
        <div className="machine-play-container">
          <h2>Machine Play</h2>
          <div className="error-message">{error}</div>
        </div>
      </Main>
    );
  }

  if (!machine) {
    return (
      <Main>
        <div className="machine-play-container">
          <h2>Machine Play</h2>
          <div>Loading machine details...</div>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div className="machine-play-container">
        <div className="machine-play-title">
          <h2>Machine Play</h2>
        </div>
        <div className="machine-play-name">
          <h3>Now Playing: {machine.name}</h3>
        </div>
        <DisplayReward reward={machine.exp} />
        <DownloadVPNProfile />
        <InstanceInfo machineId={machineId || ''} />
        <StartInstanceButton machineId={machineId || ''} />
        <GetHints machineId={machineId || ''} playType="machine" />
        <SubmitFlagForm machineId={machineId || ''} playType="machine" />
      </div>
    </Main>
  );
};

export default MachinePlayPage;
