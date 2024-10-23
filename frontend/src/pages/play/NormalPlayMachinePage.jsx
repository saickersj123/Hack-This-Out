import React from 'react';
import DownloadOpenVPNButton from '../../components/playMachine/DownloadOpenVPNButton';
import StartInstanceButton from '../../components/playMachine/StartInstanceButton';
import UseHints from '../../components/playMachine/UseHints';
import SubmitFlagForm from '../../components/playMachine/SubmitFlagForm';
import '../../assets/scss/play/PlayMachinePage.scss';

const NormalPlayMachinePage = ({ machineId }) => {
  return (
    <div className="play-machine-page">
      <h2>Play Machine: Normal Mode</h2>
      <DownloadOpenVPNButton machineId={machineId} />
      <StartInstanceButton machineId={machineId} />
      <UseHints machineId={machineId} mode="normal" />
      <SubmitFlagForm machineId={machineId} mode="normal" />
    </div>
  );
};

export default NormalPlayMachinePage;
