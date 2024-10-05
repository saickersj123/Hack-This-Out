import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/MainPage.scss';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/axiosInstance.jsx';


const MainPage = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
  });

  const handleBackgroundClick = () => {
    setIsClicked(!isClicked); // 배경 이미지 클릭 시 상태 변경
  };

  // 입력 값이 변경될 때 실행되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target; // 입력 필드의 이름과 값 추출
    setFormData((prevFormData) => ({
      ...prevFormData, // 이전 상태 복사
      [name]: value, // 변경된 필드 업데이트
    }));
  };

  // 폼 제출 이벤트 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // loginUser 함수를 호출하여 로그인 처리
      const data = await loginUser(formData);

      console.log('Success login:', data);
      navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error('Error logging in:', error.message || error);
      alert('로그인 실패. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <div
        className={isClicked ? "background-image change-background" : "background-image"} // 상태에 따라 클래스 변경
        onClick={handleBackgroundClick} // 배경 이미지 클릭 시 이벤트 핸들러 호출
      ></div>
      <form className={isClicked ? "content-wrapper visible" : "content-wrapper"} onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <div className='login-form'>
          <div className="input-box">
            <input type="text" name="user_id" placeholder="아이디" value={formData.user_id} onChange={handleChange} />
          </div>
          <div className="input-box">
            <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit">로그인</button>
        </div>
        <Link to="/register">
          <h4>회원가입</h4>
        </Link>
      </form>
    </div>
  );
};

export default MainPage;