import React from 'react'
import Main from '../../components/section/Main'
import { Link } from 'react-router-dom';
import '../../css/Challenge.scss';


const Challenges = () => {
    // 문제 목록. 일반적으로는 데이터베이스에서 가져오겠지만, 여기에 예시로 일부 데이터를 추가했습니다.
    const challenges = [
      { id: 1, title: '문제 1' },
      { id: 2, title: '문제 2' },
      { id: 3, title: '문제 3' },
    ];
  
    return (
      <Main title="Challenges" description="Challenges 화면입니다.">
        <h2>문제 목록</h2>
        <ul className='Challenge-list'>
          {challenges.map((challenge) => (
            <li key={challenge.id}>
              <Link to={`/challenge/${challenge.id}`}>{challenge.title}</Link>
            </li>
          ))}
        </ul>
      </Main>
    );
  };
    
export default Challenges
