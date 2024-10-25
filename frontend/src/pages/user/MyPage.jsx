import React, { useState } from 'react';
import { checkPassword } from '../api/axiosInstance';
import PasswordCheckForm from '../components/mypage/PasswordCheckForm';
import PersonalInfoForm from '../components/mypage/PersonalInfoForm';

const MyPage = () => {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const handlePasswordCheck = async (password) => {
    try {
      await checkPassword(password);
      setIsPasswordVerified(true);
    } catch (error) {
      console.error('Password check failed:', error);
      alert('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <h1>마이 페이지</h1>
      {!isPasswordVerified ? (
        <PasswordCheckForm onSubmit={handlePasswordCheck} />
      ) : (
        <PersonalInfoForm />
      )}
    </div>
  );
};

export default MyPage;

