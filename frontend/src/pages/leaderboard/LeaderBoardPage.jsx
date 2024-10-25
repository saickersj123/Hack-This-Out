import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../api/axiosInstance';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import Main from '../../components/main/Main';

const LeaderBoardPage = () => {
  const [rankings, setRankings] = useState([]);

  // 유저 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchUserRankings = async () => {
      try {
        // getAllUser 함수를 호출하여 유저 데이터 가져오기
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
