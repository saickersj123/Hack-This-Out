import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getActiveMachineDetails } from '../../api/axiosMachine';
import { getInstanceByMachine } from '../../api/axiosInstance';
import GetHints from '../../components/play/GetHints';
import StartInstanceButton from '../../components/play/StartInstanceButton';
import DownloadVPNProfile from '../../components/play/DownloadVPNProfile';
import InstanceInfo from '../../components/play/InstanceInfo';
import SubmitFlagForm from '../../components/play/SubmitFlagForm';
import GiveUpButton from '../../components/play/GiveUpButton';
import StatusIcon from '../../components/play/StatusIcon';
import Main from '../../components/main/Main';
import ErrorIcon from '../../components/public/ErrorIcon';
import '../../assets/scss/machine/MachinePlayPage.scss';
import LoadingIcon from '../../components/public/LoadingIcon';
import { PlayProvider, usePlayContext } from '../../contexts/PlayContext';

/**
 * Interface representing the Machine details.
 */
interface Machine {
  _id: string; // Assuming MongoDB-style IDs
  name: string;
  exp: number;
  amiId: string;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    instanceStatus,
    setInstanceStatus,
    downloadStatus,
    submitStatus,
    setSubmitStatus,
  } = usePlayContext();

  // Ref to the container for scrolling and class manipulation
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch machine details and check for existing instance when component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!machineId) {
        setError('Machine ID is missing.');
        setIsLoading(false);
        return;
      }

      try {
        // Fetch machine details
        const machineResponse: GetMachineDetailsResponse = await getActiveMachineDetails(machineId);
        console.log('Machine Details:', machineResponse.machine); // Debugging
        setMachine(machineResponse.machine);

        // Fetch existing instances for the machine
        const instanceResponse = await getInstanceByMachine(machineId);
        console.log('Instance Response:', instanceResponse); // Debugging

        if (instanceResponse.instances && instanceResponse.instances.length > 0) {
          // Set initial instance status
          const currentInstance = instanceResponse.instances[0];
          setInstanceStatus(currentInstance.status);
          console.log('Existing Instance Found:', currentInstance); // Debugging
        } else {
          setInstanceStatus(null);
          console.log('No Existing Instance Found'); // Debugging
        }
      } catch (error: any) {
        console.error('Error fetching machine details or instances:', error);
        setError('Failed to fetch machine details or instances.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [machineId, setInstanceStatus]);

  // Effect to handle submitStatus changes
  useEffect(() => {
    if (submitStatus === 'flag-success' && containerRef.current) {
      // Add the flag-success class
      containerRef.current.classList.add('flag-success');

      // Scroll to the top
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (containerRef.current) {
      // Remove the flag-success class if not in success state
      containerRef.current.classList.remove('flag-success');
    }
  }, [submitStatus]);

  // Callback to set instance as started
  const handleInstanceStarted = () => {
    console.log('Instance has been started.'); // Debugging
    setInstanceStatus('running'); // Assuming 'running' is a valid status
  };

  if (error) {
    return (
      <Main>
        <div className="machine-play-container" ref={containerRef}>
          <div className="error-message"><ErrorIcon /> {error}</div>
        </div>
      </Main>
    );
  }

  if (!machine || isLoading) {
    return (
      <Main>
        <div className="machine-play-container" ref={containerRef}>
          <div><LoadingIcon /></div>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div className={`machine-play-container ${submitStatus === 'flag-success' ? 'flag-success' : ''}`} ref={containerRef}>
        <div className="machine-play-name">
          <h3><b>Now Playing: {machine.name.charAt(0).toUpperCase() + machine.name.slice(1)}</b></h3>
          <GiveUpButton
            machineId={machineId || ''}
            machineName={machine.name}
            mode="machine"
          />
        </div>
        <div className='download-box'>
          {(instanceStatus === 'running' || instanceStatus === 'pending') ? (
            <>
              <StatusIcon status={'completed'} /> 
            </>
          ) : ( <StatusIcon status={downloadStatus || 'idle'} />)}
          <DownloadVPNProfile />
        </div>
        {/* Conditionally render StartInstanceButton or InstanceInfo */}
        <div className='btn-box'>
          <StatusIcon status={instanceStatus || 'idle'} />
          <div className='instance-hint-box'>
            {!instanceStatus ? (
              <StartInstanceButton
                machineId={machineId || ''}
                onInstanceStarted={handleInstanceStarted}
              />
            ) : (
              <InstanceInfo
                machineId={machineId || ''}
              />
            )}
            <GetHints
              machineId={machineId || ''}
              playType="machine"
            />
          </div>
        </div>
        <div className='submit-box'>
          <StatusIcon status={submitStatus || 'idle'} />
          <SubmitFlagForm
            machineId={machineId || ''}
            playType="machine"
            onFlagSuccess={() => setSubmitStatus('flag-success')}
          />
        </div>
      </div>
    </Main>
  );
};

/**
 * Wrap MachinePlayPage with PlayProvider to provide context.
 */
const MachinePlayPageWithProvider: React.FC = () => (
  <PlayProvider>
    <MachinePlayPage />
  </PlayProvider>
);

export default MachinePlayPageWithProvider;