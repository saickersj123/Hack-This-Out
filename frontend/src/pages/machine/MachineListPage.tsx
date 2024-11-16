import React from 'react';
import MachineList from '../../components/machine/MachineList';
import Main from '../../components/main/Main';
import { Link } from 'react-router-dom';
import MachineBanner from '../../components/machine/MachineBanner';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import AddIcon from '@mui/icons-material/Add';
import '../../assets/scss/machine/MachineListPage.scss';

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
                        <Link to='/machine/register'>
                            <button className='register-button'>
                                <div className='register-machine-icon'>
                                    <DnsRoundedIcon className='machine' style={{ fontSize: '60px'}} />
                                    <AddIcon className='plus' style={{ fontSize: '40px' }} />
                                </div>
                                Register machine
                            </button>
                        </Link>
                    </div>
                </div>
                {/* machine-list는 다음 줄에 배치됨 */}
                <div className='machine-list'>
                    <MachineList />
                </div>
            </div>
        </Main>
    );
};

export default MachineListPage;
