import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getContestDetails } from '../../api/axiosContest';
import { getInstanceByMachine } from '../../api/axiosInstance';
import GetHints from '../../components/play/GetHints';
import StartInstanceButton from '../../components/play/StartInstanceButton';
import DownloadVPNProfile from '../../components/play/DownloadVPNProfile';
import InstanceInfo from '../../components/play/InstanceInfo';
import SubmitFlagForm from '../../components/play/SubmitFlagForm';
import Timer from '../../components/play/Timer';
import GiveUpButton from '../../components/play/GiveUpButton';
import StatusIcon from '../../components/play/StatusIcon';
import Main from '../../components/main/Main';
import { ContestDetail, Machine } from '../../types/Contest';
import '../../assets/scss/contest/ContestPlayPage.scss';
import Loading from '../../components/public/Loading';
import ErrorIcon from '../../components/public/ErrorIcon';
import { PlayProvider, usePlayContext } from '../../contexts/PlayContext';
import { BsListCheck } from "react-icons/bs";

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
  const [instanceStarted, setInstanceStarted] = useState<boolean>(false);
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
    setInstanceStarted(false);
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


  const handleFlagSuccess = () => {
    setSubmitStatus('flag-success'); // 정답을 제출했을 때 상태를 flag-success로 변경
  };

  return (
    <Main>
      <div className="contest-play-container">
        <div className="contest-play-name">
          <h3><b>{contest.name}</b></h3>
          <Timer endTime={new Date(contest.endTime)} />
        </div>
        <div className='contest-upper-content'>
          {/* List of Machines */}
          <div className="select-machines">
            <div className='select-text'>
              <BsListCheck size={40} color="white" />
              <h2><b>Select a Machine</b></h2>
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

        {selectedMachine ? (
          <>
            <div className={`selected-machine-container ${submitStatus === 'flag-success' ? 'flag-success' : ''}`} ref={containerRef}>
              <div className="contest-play-name">
                <h3><b>Now Playing: {selectedMachine.name.charAt(0).toUpperCase() + selectedMachine.name.slice(1)}</b></h3>
                <GiveUpButton
                  contestId={contestId}
                  machineId={selectedMachine._id}
                  machineName={contest.name}
                  mode="contest"
                />
              </div>
              <div className='download-box'>
                {(instanceStatus === 'running' || instanceStatus === 'pending') ? (
                  <>
                    <StatusIcon status={'completed'} />
                  </>
                ) : (<StatusIcon status={downloadStatus || 'idle'} />)}
                <DownloadVPNProfile />
              </div>
              {/* Conditionally render StartInstanceButton or InstanceInfo */}
              <div className='btn-box'>
                <StatusIcon status={instanceStatus || 'idle'} />
                <div className='instance-hint-box'>
                  {!instanceStarted ? (
                    <StartInstanceButton
                      machineId={selectedMachine._id}
                      onInstanceStarted={handleInstanceStarted}
                    />
                  ) : (
                    <InstanceInfo
                      machineId={selectedMachine._id}
                    />
                  )}
                  <GetHints
                    machineId={selectedMachine._id}
                    playType="contest"
                    contestId={contestId}
                    disabled={!isRunning} // Disable based on instance status
                  />
                </div>
              </div>
              <div className='submit-box'>
                <StatusIcon status={submitStatus || 'idle'} />
                <SubmitFlagForm
                  contestId={contestId}
                  machineId={selectedMachine._id}
                  playType="contest"
                  onFlagSuccess={handleFlagSuccess}
                />
              </div>
            </div>
          </>
        ) : (
          <div>Please select a machine to start playing.</div>
        )}
      </div>
    </Main>
  );
};

/**
 * Wrap MachinePlayPage with PlayProvider to provide context.
 */
const ContestPlayPageWithProvider: React.FC = () => (
  <PlayProvider>
    <ContestPlayPage />
  </PlayProvider>
);

export default ContestPlayPageWithProvider;
