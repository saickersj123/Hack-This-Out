import React from 'react';
import Main from '../../components/main/Main';
import AddMachineForm from '../../components/machine/AddMachineForm';

const MachineRegisterPage: React.FC = () => {
    return (
        <Main>
            <AddMachineForm onMachineAdded={() => {}} />
        </Main>
    );
};

export default MachineRegisterPage;
