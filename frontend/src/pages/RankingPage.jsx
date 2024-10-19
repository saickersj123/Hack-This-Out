import React from 'react';
import Main from '../components/section/Main';
import RankingTable from '../components/ranking/RankingTable';
import withAuth from '../components/withAuth';

const RankingPage = () => {
  return (
    <Main title="Rankings" description="Rankings 화면입니다.">
      <RankingTable />
    </Main>
  );
};

export default withAuth(RankingPage);
