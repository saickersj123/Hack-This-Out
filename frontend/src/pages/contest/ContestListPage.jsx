import React from 'react';
import ContestList from '../../components/contest/ContestList';
import Main from '../../components/main/Main';
import { Link } from 'react-router-dom';
const ContestListPage = () => {
    return (
        <Main>
            <button className='contest-register-button'>
                <Link to='/contest/register'>Register Contest</Link>
            </button>
            <ContestList />
        </Main>
    );
};

export default ContestListPage;