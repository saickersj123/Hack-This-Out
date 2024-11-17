import React from 'react';
import ContestList from '../../components/contest/ContestList';
import ContestBanner from '../../components/contest/ContestBanner';
import Main from '../../components/main/Main';
import { Link } from 'react-router-dom';

import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import AddIcon from '@mui/icons-material/Add';
import styles from '../../assets/scss/contest/ContestPage.module.scss';

const ContestListPage: React.FC = () => {
    return (
        <Main>
            <div className={styles.contest_container}>
                <div className={styles.upper_box}>
                    <div className={styles.contest_banner}>
                        <ContestBanner />
                    </div>
                    <Link to='/contest/register' className={styles.contest_register}>
                        <div>
                            <DnsRoundedIcon className={styles.machine} style={{ fontSize: '60px' }} />
                            <AddIcon className={styles.plus} style={{ fontSize: '40px' }} />
                        </div>
                        <div className={styles.register_text}>Register Contest</div>
                    </Link>
                </div>
                <ContestList />
            </div>
        </Main>
    );
};

export default ContestListPage;