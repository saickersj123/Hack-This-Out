import React from 'react';
import { useParams } from 'react-router-dom';
import ContestDetail from '../components/contest/ContestDetail';
import ParticipateInContest from '../components/contest/ParticipateInContest';
import CreateContest from '../components/contest/CreateContest';
import UpdateContest from '../components/contest/UpdateContest';
import SubmitFlagForContest from '../components/contest/SubmitFlagForContest';

const ContestPage = () => {
  const { contestId } = useParams();

  return (
    <div className="contest-page">
      <h1>Contest Page</h1>
      
      {/* Admin Components: Create and Update Contest */}
      {/* 
        You should conditionally render these components based on user roles.
        For example:
        {isAdmin && (
          <>
            <CreateContest />
            <UpdateContest contestId={contestId} />
          </>
        )}
      */}
      <CreateContest />
      {contestId && <UpdateContest contestId={contestId} />}

      {/* Contest Details and Participation */}
      {contestId ? (
        <>
          <ContestDetail contestId={contestId} />
          <ParticipateInContest />
          <SubmitFlagForContest />
        </>
      ) : (
        <p>Please select a contest to view details.</p>
      )}
    </div>
  );
};

export default ContestPage;