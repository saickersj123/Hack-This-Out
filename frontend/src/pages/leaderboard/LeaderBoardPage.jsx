import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../api/axiosInstance';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import Main from '../../components/main/Main';

const LeaderBoardPage = () => {
  const [rankings, setRankings] = useState([]);

  //fetch leaderboard
  useEffect(() => {
    const fetchUserRankings = async () => {
      try {
        const response = await getLeaderboard();
        setRankings(response.users); // 정렬된 데이터로 상태 업데이트
      } catch (error) {
        console.error('Error fetching user rankings:', error.message || error);
      }
    };

    fetchUserRankings(); // 데이터 가져오기 호출
  }, []);

  return (
    <Main title="LeaderBoard" description="LeaderBoard 화면입니다.">
      <LeaderboardTable rankings={rankings} />
    </Main>
  );
};

export default LeaderBoardPage;
