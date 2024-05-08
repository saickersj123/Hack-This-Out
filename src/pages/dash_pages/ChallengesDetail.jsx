import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Main from '../../components/section/Main'

const ChallengeDetail = () => {
  const { id } = useParams(); // 문제 ID 가져오기

  // 문제 데이터베이스에서 문제 정보를 가져오기
  const problemDetails = {
    1: ['문제 1 내용', '질문 2', '질문 3', '질문 4'],
    2: ['문제 2 내용'],
    3: ['문제 3 내용'],
  };

  // 입력 칸의 답변을 추적하기 위해 상태 생성
  const [answers, setAnswers] = useState(Array(problemDetails[id].length).fill(''));

  // 입력 값이 변경될 때 호출되는 함수
  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value; // 입력된 답변을 상태에 저장
    setAnswers(newAnswers); // 업데이트된 상태 설정
  };

  return (
    <Main title={`문제 ${id}`} description={`문제 ${id} 내용`}>
      <h2>문제 {id}</h2>
      {/* 문제 내용을 배열로 가정하고 각 문제마다 입력 칸을 추가 */}
      {problemDetails[id].map((problem, index) => (
        <div key={index}>
          <p>{problem}</p> {/* 문제 내용 출력 */}
          <input
            type="text"
            placeholder={`답변 입력`}
            value={answers[index]} // 해당 입력 칸의 답변
            onChange={(e) => handleAnswerChange(index, e)} // 입력 값이 변경될 때 호출
          />
        </div>
      ))}
    </Main>
  );
};

export default ChallengeDetail;
