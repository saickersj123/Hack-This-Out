import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Main from '../../components/section/Main';
import '../../css/ChallengeDetail.scss';

const ChallengeDetail = () => {
  const location = useLocation();
  const { title, content, answers = [] } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(content.length).fill(''));
  const [answeredIndexes, setAnsweredIndexes] = useState([]);

  const handleAnswerChange = (e, index) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[index] = e.target.value;
    setUserAnswers(newUserAnswers);
  };

  const handleSubmit = (index) => {
    const userAnswer = userAnswers[index].trim();
    if (userAnswer === '') return;

    if (answers[index] && userAnswer === answers[index]) {
      setAnsweredIndexes([...answeredIndexes, index]);
      setCurrentIndex(currentIndex + 1);
    }

    const newUserAnswers = [...userAnswers];
    newUserAnswers[index] = '';
    setUserAnswers(newUserAnswers);
  };

  if (!title || !content.length) {
    return <div>Loading...</div>;
  }

  return (
    <Main title={`문제 ${title}`} description={`문제 ${title} 내용`}>
      <div className='challenge-detail'>
        <div className="back-btn-container">
          <Link to='/Challenges'>
            <button className='back-btn'></button>
          </Link>
          <h2>{title}</h2>
        </div>
        <div className='start-btn'>
          <p>이미지 생성하기</p>
          <button>Spawn Image</button>
        </div>
        {content.slice(0, currentIndex + 1).map((question, index) => (
          <div key={index} className='prob-detail'>
            <p>{question}</p>
            {answeredIndexes.includes(index) ? (
              <div className='question-text'>
                <p>{answers[index]}</p>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder={`정답 입력`}
                  value={userAnswers[index] || ''}
                  onChange={(e) => handleAnswerChange(e, index)}
                />
                <button onClick={() => handleSubmit(index)}>정답 제출</button>
              </>
            )}
          </div>
        ))}
      </div>
    </Main>
  );
};

export default ChallengeDetail;
