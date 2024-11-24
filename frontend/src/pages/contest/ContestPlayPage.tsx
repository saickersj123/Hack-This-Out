import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getContestDetails } from '../../api/axiosContest';
import { getInstanceByMachine } from '../../api/axiosInstance';
import StartInstanceButton from '../../components/play/StartInstanceButton';
import DownloadVPNProfile from '../../components/play/DownloadVPNProfile';
import InstanceInfo from '../../components/play/InstanceInfo';
import SubmitFlagForm from '../../components/play/SubmitFlagForm';
import Timer from '../../components/play/Timer';
import GiveUpButton from '../../components/play/GiveUpButton';
import Main from '../../components/main/Main';
import { ContestDetail, Machine } from '../../types/Contest';
import { Instance } from '../../types/Instance';
import '../../assets/scss/contest/ContestPlayPage.scss';
import Loading from '../../components/public/Loading';
import ErrorIcon from '../../components/public/ErrorIcon';
import { BsListCheck } from "react-icons/bs";
import { StatusProvider } from '../../contexts/StatusContext';

/**
 * Interface for API response when fetching contest details.
 */
interface GetContestDetailsResponse {
  contest: ContestDetail;
  // Add other response properties if available
}

/**
 * Component representing the Contest Play Page.
 */
const ContestPlayPage: React.FC = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const [contest, setContest] = useState<ContestDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [instanceStatus, setInstanceStatus] = useState<Instance['status']>(null);
  const [instanceStarted, setInstanceStarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  // Fetch contest details and check for existing instance when component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!contestId) {
        setError('Contest ID is missing.');
        setIsLoading(false);
        return;
      }

      try {
        // Fetch contest details
        const contestResponse: GetContestDetailsResponse = await getContestDetails(contestId);
        console.log('Contest Details:', contestResponse.contest); // Debugging
        setContest(contestResponse.contest);

        setIsLoading(false);
      } catch (err: any) {
        console.error('Error fetching contest details:', err);
        setError(err.msg || 'Failed to fetch contest details.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [contestId]);

  // Handle machine selection
  const handleMachineSelect = async (machine: Machine) => {
    setSelectedMachine(machine);
    setInstanceStarted(false); // Reset instanceStarted when selecting a new machine
    setInstanceStatus(null); // Reset instance status

    // Check for existing instance for the selected machine within the contest
    try {
      const instanceResponse = await getInstanceByMachine(machine._id);
      console.log('Instance Response:', instanceResponse); // Debugging

      if (instanceResponse.instances && instanceResponse.instances.length > 0) {
        setInstanceStarted(true);
        // Set initial instance status
        const currentInstance = instanceResponse.instances[0];
        setInstanceStatus(currentInstance.status);
        console.log('Existing Instance Found:', currentInstance); // Debugging
      } else {
        setInstanceStarted(false);
        setInstanceStatus(null);
        console.log('No Existing Instance Found'); // Debugging
      }
    } catch (error: any) {
      console.error('Error fetching instances:', error);
      setError('Failed to fetch instance details.');
    }
  };

  // Callback to receive instance status from InstanceInfo
  const handleInstanceStatusChange = (status: Instance['status']) => {
    console.log('Instance status changed to:', status); // Debugging
    setInstanceStatus(status);
  };

  // Callback to set instance as started
  const handleInstanceStarted = () => {
    console.log('Instance has been started.'); // Debugging
    setInstanceStarted(true);
  };

  if (error) {
    return (
      <Main>
        <div className="contest-play-container">
          <h2>Contest Play</h2>
          <div className="error-message"><ErrorIcon /> {error}</div>
        </div>
      </Main>
    );
  }

  if (!contest || isLoading) {
    return (
      <Main>
        <div className="contest-play-container">
          <h2>Contest Play</h2>
          <Loading />
        </div>
      </Main>
    );
  }

  // Determine if controls should be disabled based on instance status
  const isRunning = instanceStatus === 'running';

  return (
    <Main>
      <div className="contest-play-container">
        <div className='contest-info'>
          <div className="contest-play-name">
            <h2>Contest: {contest.name}</h2>
          </div>
          <div className='timer-box'>
            <h3>Time Left : </h3>
            <Timer endTime={new Date(contest.endTime)} />
          </div>
          <div className='select-box'>
            {/* List of Machines */}
            <div className="select-machines">
              <div className='select-text'>
                <BsListCheck size={40} color="white" />
                <h2>Select a Machine</h2>
              </div>
              <select
                className="select-machine-dropdown"
                value={selectedMachine?._id || ''}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const machine = contest.machines.find((m) => m._id === selectedId);
                  if (machine) {
                    handleMachineSelect(machine);
                  }
                }}
              >
                <option value="" disabled>
                  Machine
                </option>
                {contest.machines.map((machine) => (
                  <option key={machine._id} value={machine._id}>
                    {machine.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {selectedMachine ? (
          <>
            <div className="contest-play-name">
              <h3>Now Playing: {selectedMachine.name}</h3>
              <GiveUpButton
                contestId={contestId}
                machineId={selectedMachine._id}
                machineName={selectedMachine.name}
                mode="contest"
              //disabled={!isRunning} // Disable based on instance status
              />
            </div>
            <StatusProvider initialStatus="idle">
              <div className='download-box'>
                <DownloadVPNProfile />
              </div>
            </StatusProvider>
            {/* Conditionally render StartInstanceButton or InstanceInfo */}
            <StatusProvider initialStatus="idle">
              <div className='btn-box'>
                <div className='instance-hint-box'>
                  {!instanceStarted ? (
                    <StartInstanceButton
                      machineId={selectedMachine._id}
                      onInstanceStarted={handleInstanceStarted}
                    />
                  ) : (
                    <InstanceInfo
                      machineId={selectedMachine._id}
                      instplayType="contest"
                      onStatusChange={handleInstanceStatusChange}
                      contestId={contestId}
                    />
                  )}
                </div>
              </div>
            </StatusProvider>
            <StatusProvider initialStatus="flag">
              <div className='submit-box'>
                <SubmitFlagForm
                  contestId={contestId}
                  machineId={selectedMachine._id}
                  playType="contest"
                  disabled={!isRunning} // Disable based on instance status
                />
              </div>
            </StatusProvider>
          </>
        ) : (
          <div className='not-selected'>Please select a machine to start playing.</div>
        )
        }
      </div>
    </Main>
  );
};

export default ContestPlayPage;