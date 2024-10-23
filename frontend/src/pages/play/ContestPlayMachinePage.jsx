import React, { useEffect, useState } from 'react';
import '../../assets/scss/play/PlayMachinePage.scss';
import DownloadOpenVPNButton from '../../components/playMachine/DownloadOpenVPNButton';
import StartInstanceButton from '../../components/playMachine/StartInstanceButton';
import UseHints from '../../components/playMachine/UseHints';
import SubmitFlagForm from '../../components/playMachine/SubmitFlagForm';
import Timer from '../../components/playMachine/Timer';
import PrizeDisplay from '../../components/playMachine/PrizeDisplay';
import { getContestDetails } from '../../api/axiosInstance';
const ContestPlayMachinePage = ({ contestId, machineId }) => {
  const [contestData, setContestData] = useState(null);

  useEffect(() => {
    // Fetch contest details 
    const fetchContestData = async () => {
      const data = await getContestDetails(contestId);
      setContestData(data.contest);
    };
    fetchContestData();
  }, [contestId]);

  return (
    <div className="play-machine-page">
      <h2>Play Machine: Contest Mode</h2>
      {contestData && (
        <>
          <Timer endTime={contestData.endTime} />
          <PrizeDisplay prize={contestData.prize} />
        </>
      )}
      <DownloadOpenVPNButton machineId={machineId} />
      <StartInstanceButton machineId={machineId} />
      <UseHints machineId={machineId} mode="contest" />
      <SubmitFlagForm machineId={machineId} mode="contest" contestId={contestId} />
    </div>
  );
};

export default ContestPlayMachinePage;
