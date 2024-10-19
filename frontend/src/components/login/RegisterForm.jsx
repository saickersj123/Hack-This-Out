//import '../css/RegisterForm.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../api/axiosInstance';
import '../../assets/scss/login/RegisterForm.scss';

function RegisterForm({ closeRegisterModal }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    user_id: '',
    password: '',
    email: '',
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
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 막기

    try {
      // signUpUser 함수를 호출하여 회원가입 처리
      const data = await signUpUser(formData);

      console.log('User registered:', data);
      navigate('/'); // 회원가입 성공 시 홈 페이지로 이동
    } catch (error) {
      console.error('Error registering user:', error.message || error);
      // 등록 실패 시 처리 (예: 에러 메시지 표시)
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='back'>
      <div className="wrap">
        <form className="register-form" onSubmit={handleSubmit}>
          <button type="button" onClick={closeRegisterModal}>닫기</button>
          <h1>회원가입</h1>
          <div className="input-box">
            <input type="text" name="name" placeholder="이름" value={formData.name} onChange={handleChange} />
          </div>
          <div className="input-box">
            <input type="text" name="user_id" placeholder="아이디" value={formData.user_id} onChange={handleChange} />
          </div>
          <div className="input-box">
            <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
          </div>
          <div className="input-box">
            <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} />
          </div>
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;