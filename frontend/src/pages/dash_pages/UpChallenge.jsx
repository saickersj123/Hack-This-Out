import Main from '../../components/section/Main'
import React, { useState } from 'react';

const UpChallenge = () => {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [contents, setContents] = useState(['']);
  const [answers, setAnswers] = useState(['']);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content: contents,
          answer: answers,
          theme,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create challenge: ${errorText}`);
      }
  
      const result = await response.json();
      console.log('Challenge created:', result);
      // Reset form fields
      setTitle('');
      setTheme('');
      setContents(['']);
      setAnswers(['']);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Main title="Up_Challenge" description="Up_Challenge 화면입니다.">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Theme:</label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          {contents.map((content, index) => (
            <div key={index}>
              <input
                type="text"
                value={content}
                onChange={(e) => handleContentChange(index, e)}
                required
              />
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
    </Main>
  );
};

export default UpChallenge
