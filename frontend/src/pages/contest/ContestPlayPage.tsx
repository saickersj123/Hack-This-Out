import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getContestDetails } from '../../api/axiosInstance';
import DisplayReward from '../../components/play/DisplayReward';
import GetHints from '../../components/play/GetHints';
import StartInstanceButton from '../../components/play/StartInstanceButton';
import DownloadVPNProfile from '../../components/play/DownloadVPNProfile';
import InstanceInfo from '../../components/play/InstanceInfo';
import SubmitFlagForm from '../../components/play/SubmitFlagForm';
import Timer from '../../components/play/Timer';
import Main from '../../components/main/Main';
import { ContestDetail, Machine } from '../../types/Contest';
// import '../../assets/scss/machine/machinePlayPage.scss';

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

  // Fetch contest details
  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        if (!contestId) {
          throw new Error('Contest ID is missing');
        }
        const response: GetContestDetailsResponse = await getContestDetails(contestId);
        setContest(response.contest);
      } catch (error: any) {
        console.error('Error fetching contest details:', error.message || error);
        setError('Failed to fetch contest details.');
      }
    };
    fetchContestDetails();
  }, [contestId]);

  // Handle machine selection
  const handleMachineSelect = (machine: Machine) => {
    setSelectedMachine(machine);
  };

  if (error) {
    return (
      <Main>
        <div className="contest-play-container">
          <h2>Contest Play</h2>
          <div className="error-message">{error}</div>
        </div>
      </Main>
    );
  }

  if (!contest) {
    return (
      <Main>
        <div className="contest-play-container">
          <h2>Contest Play</h2>
          <div>Loading contest details...</div>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div className="contest-play-container">
        <div className="contest-play-title">
          <h2>Contest Play</h2>
        </div>
        <div className="contest-play-timer">
          <Timer endTime={contest.endTime.toISOString()} />
        </div>
        <div className="contest-play-description">
          <div className="contest-play-warning">
            <h3>Warning: do not switch other machine while playing a machine</h3>
          </div>
          <div className="select-machines">
            <h3>Select a Machine:</h3>
            <ul>
              {contest.machines.map((machine) => (
                <li
                  key={machine._id}
                  className={`select-machine-list ${selectedMachine?._id === machine._id ? 'selected' : ''}`}
                  onClick={() => handleMachineSelect(machine)}
                  style={{
                    cursor: 'pointer',
                    padding: '8px',
                    border: '1px solid #ccc',
                    marginBottom: '4px',
                    backgroundColor: selectedMachine?._id === machine._id ? '#f0f0f0' : 'transparent',
                    fontWeight: selectedMachine?._id === machine._id ? 'bold' : 'normal',
                  }}
                >
                  {machine.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedMachine ? (
          <>
            <div className="contest-play-name">
              <h3>Now Playing: {selectedMachine.name}</h3>
            </div>
            <DisplayReward reward={contest.contestExp} />
            <DownloadVPNProfile />
            <InstanceInfo machineId={selectedMachine._id} />
            <StartInstanceButton machineId={selectedMachine._id} />
            <GetHints machineId={selectedMachine._id} playType="contest" contestId={contestId} />
            <SubmitFlagForm machineId={selectedMachine._id} playType="contest" />
          </>
        ) : (
          <div>Please select a machine to start playing.</div>
        )}
      </div>
    </Main>
  );
};

export default ContestPlayPage;
