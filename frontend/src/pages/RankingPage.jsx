import React, { useState, useEffect } from 'react';
//import '../../css/Rankings.scss';
import { getAllUser } from '../api/axiosInstance';
import RankingTable from '../components/ranking/RankingTable'; // RankingTable import
import Main from '../components/section/Main';
import withAuth from '../components/withAuth';

const RankingPage = () => {
  const [rankings, setRankings] = useState([]);

  // 유저 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchUserRankings = async () => {
      try {
        // getAllUser 함수를 호출하여 유저 데이터 가져오기
        const response = await getAllUser();
        const users = response.users;

        // 경험치(exp) 기준으로 내림차순 정렬
        const sortedRankings = users.sort((a, b) => b.exp - a.exp);
        setRankings(sortedRankings); // 정렬된 데이터로 상태 업데이트
      } catch (error) {
        console.error('Error fetching user rankings:', error.message || error);
      }
    };

    fetchUserRankings(); // 데이터 가져오기 호출
  }, []);

  return (
    <Main title="Rankings" description="Rankings 화면입니다.">
    <RankingTable rankings={rankings}/>
    </Main>
  );
};

export default withAuth(RankingPage);
