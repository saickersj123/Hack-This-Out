import React from 'react';
import RankingTable from '../components/ranking/RankingTable';
import withAuth from '../components/withAuth';

const RankingPage = () => {
  return (
      <RankingTable />
  );
};

export default withAuth(RankingPage);
