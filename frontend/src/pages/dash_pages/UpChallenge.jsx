import Main from '../../components/section/Main'
import React, { useState } from 'react';
import { postProb } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const UpChallenge = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [contents, setContents] = useState(['']);
  const [answers, setAnswers] = useState(['']);

  const navUpMachine = () => {
    navigate('/Upmachine');
  }

  const handleContentChange = (index, event) => {
    const newContents = [...contents];
    newContents[index] = event.target.value;
    setContents(newContents);
  };

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const addContentField = () => {
    setContents([...contents, '']);
    setAnswers([...answers, '']);
  };

  // 폼 제출 이벤트 처리
  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 막기

    try {
      // postProb 함수를 호출하여 문제 등록 처리
      const result = await postProb(title, contents, answers, theme);

      console.log('Challenge created:', result);
      // 폼 필드 초기화
      setTitle('');
      setTheme('');
      setContents(['']);
      setAnswers(['']);
    } catch (error) {
      console.error('Error creating challenge:', error.message || error);
      // 에러 처리 (예: 에러 메시지 표시)
      alert('문제 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Main title="Up_Challenge" description="Up_Challenge 화면입니다.">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
        <div>
          <label>Theme:</label>
          <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} required/>
        </div>
        <div>
          <label>Content:</label>
          {contents.map((content, index) => (
            <div key={index}>
              <input type="text" value={content} onChange={(e) => handleContentChange(index, e)} required/>
              <input
                type="text"
                value={answers[index]} // 해당 content의 answer
                onChange={(e) => handleAnswerChange(index, e)} // 입력 값이 변경될 때 호출
                placeholder={`Answer for Content ${index + 1}`} // 각 content에 대한 답변 placeholder 추가
                required
              />
            </div>
          ))}
          <button type="button" onClick={addContentField}>
            Add Content
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={navUpMachine}>머신 업로드</button>
    </Main>
  );
};

export default UpChallenge
