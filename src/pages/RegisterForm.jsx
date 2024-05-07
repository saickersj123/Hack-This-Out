import '../css/RegisterForm.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // POST 요청 보내기
    fetch('http://localhost:5000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User registered:', data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        // 등록 실패 시 처리
      });
  };

  return (
    <div className="wrap">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <div className="input-box">
          <input type="text" name="name" placeholder="이름" value={formData.name} onChange={handleChange} />
        </div>
        <div className="input-box">
          <input type="text" name="user_id" placeholder="아이디"value={formData.user_id} onChange={handleChange}/>
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
  );
}

export default RegisterForm;