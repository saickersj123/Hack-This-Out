import React, { useState, useEffect } from 'react';
import Main from '../../components/section/Main'
import { Link } from 'react-router-dom';
import { getAllProb, deleteProb } from '../../api/axiosInstance';
import '../../css/Challenge.scss';


const Challenges = () => {
  const [challenges, setChallenges] = useState([]);

  // 문제 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const probs = await getAllProb();
        console.log('Challenges fetched:', probs);
        setChallenges(probs);
      } catch (error) {
        console.error('Error fetching challenges:', error.message || error);
      }
    };

    fetchChallenges();
  }, []);

  // 문제 삭제 처리
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      try {
        await deleteProb(id);
        setChallenges(challenges.filter(challenge => challenge.id !== id)); // 문제 삭제 후 필터링
      } catch (error) {
        console.error('Failed to delete challenge:', error.message || error);
      }
    }
  };

  return (
    <Main title="Challenges" description="Challenges 화면입니다.">
      <h2 style={{ margin: 20 }}>문제 목록</h2>
      <ul className='Challenge-list'>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <Link to={`/challenge/${challenge.id}`} state={{ title: challenge.title, content: challenge.content, answers: challenge.answer }} >
              {challenge.title}
            </Link>
            <button onClick={() => handleDelete(challenge.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default Challenges
