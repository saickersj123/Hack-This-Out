import React from 'react';
import Main from '../../components/main/Main';

const MachineCompletePage: React.FC = () => {
  return (
    <Main title="Machine Complete" description="Machine Complete 화면입니다.">
      <div className="machine-complete-page">
        Congratulations! You have completed the machine.
      </div>
    </Main>
  );
};

export default MachineCompletePage;
