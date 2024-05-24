import React, { useState, useEffect } from 'react';
import Main from '../../components/section/Main'
import { Link } from 'react-router-dom';
import '../../css/Challenge.scss';


const Challenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/challenge', {
      method: 'GET',
      credentials: "include"
    })
      .then((res) => res.json())
      .then(res => {
        console.log('Challenges fetched:', res); 
        setChallenges(res);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      const response = await fetch(`http://localhost:5000/api/challenge/${id}`, {
        method: 'DELETE',
        credentials: "include"
      });

      if (response.ok) {
        setChallenges(challenges.filter(challenge => challenge.id !== id));
      } else {
        console.error('Failed to delete challenge');
      }
    }
  };

  return (
    <Main title="Challenges" description="Challenges 화면입니다.">
      <h2>문제 목록</h2>
      <ul className='Challenge-list'>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <Link to={`/challenge/${challenge.id}`} state={{ title: challenge.title, content: challenge.content }} >
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
