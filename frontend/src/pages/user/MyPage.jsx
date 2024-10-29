import React, { useState } from 'react';
import { checkPassword } from '../../api/axiosInstance';
import PasswordCheckForm from '../../components/mypage/PasswordCheckForm';
import PersonalInfoForm from '../../components/mypage/PersonalInfoForm';
import ToAdmin from '../../components/mypage/toAdmin';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/main/Main'
import '../../assets/scss/mypage/toAdmin.scss';

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
    <Main>
      <div className="mypage-container">
        <div className="upper-container">
          <div className="back-btn-container">
            <button className="back-button" onClick={() => navigate('/')}></button>
          </div>
          <h1>My Page</h1>
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
    </Main>
  );
};

export default MyPage;

