import React from 'react';
import MachineList from '../../components/machine/MachineList';
import Main from '../../components/main/Main';
import { Link } from 'react-router-dom';
const MachineListPage = () => {
    return (
        <Main>
            <button className='machine-register-button'>
                <Link to='/machine/register'>Register Machine</Link>
            </button>
            <MachineList />
        </Main>
    );
};

export default MachineListPage;