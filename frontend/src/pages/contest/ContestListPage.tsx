import React from 'react';
import ContestList from '../../components/contest/ContestList';
import ContestBanner from '../../components/contest/ContestBanner';
import Main from '../../components/main/Main';
import { Link } from 'react-router-dom';

import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AddIcon from '@mui/icons-material/Add';
import styles from '../../assets/scss/contest/ContestListPage.module.scss';

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
                            <EmojiEventsOutlinedIcon className={styles.machine} style={{ fontSize: '80px' }} />
                            <AddIcon className={styles.plus} style={{ fontSize: '50px' }} />
                        </div>
                        <div className={styles.register_text}>Add Contest</div>
                    </Link>
                </div>
                <ContestList />
            </div>
        </Main>
    );
};

export default ContestListPage;