import React, { useState } from 'react';
import { checkPassword } from '../../api/axiosInstance';
import PasswordCheckForm from '../../components/mypage/PasswordCheckForm';
import PersonalInfoForm from '../../components/mypage/PersonalInfoForm';
import ToAdmin from '../../components/mypage/toAdmin';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const navigate = useNavigate();
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
    <div className="mypage-container">
      <h1>마이 페이지</h1>
      <div className="go-back-button">
        <button onClick={() => navigate('/')}>뒤로가기</button>
      </div>
      {!isPasswordVerified ? (
        <PasswordCheckForm onSubmit={handlePasswordCheck} />
      ) : (
        <>
          <PersonalInfoForm />
          <ToAdmin />
        </>
      )}
    </div>
  );
};

export default MyPage;

