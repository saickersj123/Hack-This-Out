import React, { useState } from 'react';
import { useLocation  } from 'react-router-dom';
import Main from '../../components/section/Main'
import '../../css/ChallengeDetail.scss';

const ChallengeDetail = () => {
  const location = useLocation();
  const { title, content = [] } = location.state || {};

  // 입력 칸의 답변을 추적하기 위해 상태 생성
  const [answers, setAnswers] = useState(Array(content.length).fill(''));

  // 입력 값이 변경될 때 호출되는 함수
  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value; // 입력된 답변을 상태에 저장
    setAnswers(newAnswers); // 업데이트된 상태 설정
  };

  // title과 content가 비어있는 경우 처리
  if (!title || !content) {
    return (
      <div>Loading...</div> // 혹은 에러 메시지를 출력하거나 리다이렉트할 수 있음
    );
  }

  return (
    <Main title={`문제 ${title}`} description={`문제 ${title} 내용`}>
      <div className='challenge-detail'>
        <h2>{title}</h2>
        {content.map((problem, index) => (
          <div className='prob-detail' key={index}>
            <p>{problem}</p> {/* 문제 내용 출력 */}
            <input
              type="text"
              placeholder={`답변 입력`}
              value={answers[index]} // 해당 입력 칸의 답변
              onChange={(e) => handleAnswerChange(index, e)} // 입력 값이 변경될 때 호출
            />
          </div>
        ))}
      </div>
    </Main>
  );
};

export default ChallengeDetail;
