import React, { useState } from 'react';

const PasswordCheckForm = ({ onSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>비밀번호 확인</h2>
      <p>개인정보 수정을 위해 비밀번호를 입력해주세요.</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <button type="submit">확인</button>
    </form>
  );
};

export default PasswordCheckForm;

