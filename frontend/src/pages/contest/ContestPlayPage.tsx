import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getContestDetails, getContestParticipationDetails, getContestResult } from '../../api/axiosContest';
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
import ContestCompleteModal from '../../components/modal/ContestCompleteMD';

/**
 * Interface for API response when fetching contest details.
 */
interface GetContestDetailsResponse {
  contest: ContestDetail;
  // Add other response properties if available
}

/**
 * Interface for API response when fetching contest participation details.
 */
interface GetContestParticipationDetailsResponse {
  participation: ContestParticipation;
  machinesLeft: number;
  // Add other response properties if available
}

/**
 * Updated interface to match the participation structure from ContestController.ts
 */
interface ContestParticipation {
  // ...other fields
  machineCompleted: {
    machine: string;
    completed: boolean;
  }[];
  expEarned: number;
}

/**
 * Interface for API response when fetching contest result.
 */
interface GetContestResultResponse {
  expEarned: number;
  machinesLeft: number;
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

  // State to track completed machines (store only machine IDs)
  const [completedMachines, setCompletedMachines] = useState<string[]>([]);
  // State to handle contest completion
  const [isContestComplete, setIsContestComplete] = useState<boolean>(false);
  // State to track total exp earned
  const [totalExpEarned, setTotalExpEarned] = useState<number>(0);
  // State to track machines left
  const [machinesLeft, setMachinesLeft] = useState<number>(-1);

  /**
   * useEffect to reset selectedMachine to null on component mount.
   * This ensures that the selected machine is always null when the page is refreshed.
   */


  // Fetch contest details and participation details when component mounts
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

        // Fetch contest participation details
        const participationResponse: GetContestParticipationDetailsResponse = await getContestParticipationDetails(contestId);
        const participation = participationResponse.participation;

        if (participation && participation.machineCompleted.length > 0) {
          // Extract machine IDs where completed is true
          const completed = participation.machineCompleted
            .filter(mc => mc.completed)
            .map(mc => mc.machine);
          setCompletedMachines(completed);
          console.log('Completed Machines:', completed); // Debugging
        }

        setIsLoading(false);
      } catch (err: any) {
        console.error('Error fetching contest details:', err);
        setError(err.message || 'Failed to fetch contest details.');
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

  // Callback when a flag is successfully submitted
  const handleFlagSuccess = async () => {
    if (selectedMachine) {
      setCompletedMachines((prev) => [...prev, selectedMachine._id]);
      setSubmitStatus('flag-success');
      console.log(`Machine ${selectedMachine._id} marked as completed.`);
      // Check if all machines are completed
      try {
        const resultResponse: GetContestResultResponse = await getContestResult(contestId || '');
        setTotalExpEarned(resultResponse.expEarned);
        setMachinesLeft(resultResponse.machinesLeft);
      } catch (error: any) {
        console.error('Error fetching participation details:', error);
      }
    }
    if (machinesLeft === 0) {
      setIsContestComplete(true);
    } else {
      setSelectedMachine(null);
    }
  };

  if (error) {
    return (
      <Main>
        <div className="contest-play-container">
          <div className="error-message"><ErrorIcon /></div>
        </div>
      </Main>
    );
  }

  if (!contest || isLoading) {
    return (
      <Main>
        <div className="contest-play-container">
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
                Select a Machine
              </option>
              {contest.machines.map((machine) => (
                <option
                  key={machine._id}
                  value={machine._id}
                  disabled={completedMachines.includes(machine._id)}
                >
                  {machine.name} {completedMachines.includes(machine._id) && '(Completed)'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display selected machine container only if a machine is selected and contest is not complete */}
        {selectedMachine && !isContestComplete ? (
          <>
            <div className={`selected-machine-container ${submitStatus === 'flag-success' ? 'flag-success' : ''}`} ref={containerRef}>
              <div className="contest-play-name">
                <h3><b>Now Playing: {selectedMachine.name.charAt(0).toUpperCase() + selectedMachine.name.slice(1)}</b></h3>
                <GiveUpButton
                  contestId={contestId}
                  contestName={contest.name}
                  machineId={selectedMachine._id}
                  machineName={selectedMachine.name}
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
          // Optionally, you can add a message or keep it empty when no machine is selected
          <div className='no-machine-selected'></div>
        )}
        {isContestComplete && (
          <ContestCompleteModal onClose={() => {
            setIsContestComplete(false);
          }}
          expEarned={totalExpEarned}
          />
        )}
      </div>
    </Main>
  );
};

/**
 * Wrap ContestPlayPage with PlayProvider to provide context.
 */
const ContestPlayPageWithProvider: React.FC = () => (
  <PlayProvider>
    <ContestPlayPage />
  </PlayProvider>
);

export default ContestPlayPageWithProvider;
