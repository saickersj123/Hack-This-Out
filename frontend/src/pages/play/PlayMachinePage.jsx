import React from 'react';
import NormalPlayMachinePage from './NormalPlayMachinePage';
import ContestPlayMachinePage from './ContestPlayMachinePage';
import { useParams } from 'react-router-dom';

const PlayMachinePage = () => {
  const { mode, contestId, machineId } = useParams();

  if (mode === 'normal') {
    return <NormalPlayMachinePage machineId={machineId} />;
  } else if (mode === 'contest') {
    return <ContestPlayMachinePage contestId={contestId} machineId={machineId} />;
  } else {
    return <p>Invalid mode selected.</p>;
  }
};

export default PlayMachinePage;