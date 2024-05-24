import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/MainPage.scss';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleBackgroundClick = () => {
    setIsClicked(!isClicked); // 배경 이미지 클릭 시 상태 변경
  };
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
  });

  // 입력 값이 변경될 때 실행되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target; // 입력 필드의 이름과 값 추출
    setFormData((prevFormData) => ({
      ...prevFormData, // 이전 상태 복사
      [name]: value, // 변경된 필드 업데이트
    }));
  };

  // 폼 제출 이벤트 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    // POST 요청 보내기
    fetch('http://localhost:5000/api/auth', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          // 서버에서 반환한 오류 상태 코드 확인
          return response.json().then((error) => {
            throw new Error(error.message || '로그인 실패');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success login :', data);
        navigate('/main');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        alert('로그인 실패. 다시 시도해주세요.');
      });
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