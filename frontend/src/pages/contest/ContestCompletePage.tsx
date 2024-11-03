import React from 'react';
import Main from '../../components/main/Main';

const ContestCompletePage: React.FC = () => {
  return (
    <Main title="Contest Complete" description="Contest Complete 화면입니다.">
      <div className="contest-complete-page">
        Congratulations! You have completed the contest.
      </div>
    </Main>
  );
};

export default ContestCompletePage;
