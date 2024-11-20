import React from 'react';
import MachineList from '../../components/machine/MachineList';
import Main from '../../components/main/Main';
import { Link } from 'react-router-dom';
import MachineBanner from '../../components/machine/MachineBanner';
import AddIcon from '@mui/icons-material/Add';
import '../../assets/scss/machine/MachineListPage.scss';
import { PiComputerTowerBold } from 'react-icons/pi';

const MachineListPage: React.FC = () => {
    return (
        <Main>
            <div className='machine-list-page'>
                <div className='gradient-wrapper'>
                    {/* machine-banner */}
                    <div className='machine-banner'>
                        <MachineBanner />
                    </div>
                    {/* register-machine */}
                    <div className="register-machine">
                        {/* <p className="register-text">register machine</p> */}
                        <Link to='/machine/register' className='register-machine'>
                            <div>
                                <PiComputerTowerBold className='machine' style={{ fontSize: '70px' }} />
                                <AddIcon className='plus' style={{ fontSize: '50px' }} />
                            </div>
                            <div className='register_text'>Add Machine</div>
                        </Link>
                    </div>
                </div>
                <MachineList />
            </div>
        </Main>
    );
};

export default MachineListPage;
