import React from 'react';
import ContestList from '../../components/contest/ContestList';
import ContestBanner from '../../components/contest/ContestBanner';
import Main from '../../components/main/Main';
import { Link } from 'react-router-dom';

import '../../assets/scss/contest/ContestPage.scss';

const ContestListPage: React.FC = () => {
    return (
        <Main>
            <ContestBanner />
            <div className='contest_container'>
                <button className='contest_register_button'>
                    <Link to='/contest/register'>Register Contest</Link>
                </button>
                <ContestList />
            </div>
        </Main>
    );
};

export default ContestListPage;