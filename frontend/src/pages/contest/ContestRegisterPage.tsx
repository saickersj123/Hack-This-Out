import React from 'react';
import Main from '../../components/main/Main';
import AddContestForm from '../../components/contest/AddContestForm';

const ContestRegisterPage: React.FC = () => {
    return (
        <Main>
            <AddContestForm onContestAdded={() => {}} />
        </Main>
    );
};

export default ContestRegisterPage;
