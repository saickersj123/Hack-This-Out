import React from 'react';
import MachineList from '../../components/machine/MachineList';
import '../../assets/scss/machine/MachineListPage.scss';
import Main from '../../components/main/Main';
const MachineListPage = () => {
    
    return (
        <Main>
            <div className= 'machine-list-page'>
                <MachineList />
            </div>
        </Main>
    );
};

export default MachineListPage;