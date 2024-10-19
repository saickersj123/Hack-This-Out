import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/axiosInstance.jsx';
import '../../assets/scss/login/LoginForm.scss';

const LoginForm = ({ openRegisterModal }) => { // openRegisterModal 함수 받기
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);
      console.log('Success login:', data);
      navigate('/main');
    } catch (error) {
      console.error('Error logging in:', error.message || error);
      alert('로그인 실패. 다시 시도해주세요.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>로그인</h1>
      <div className="input-box">
        <input type="text" name="user_id" placeholder="아이디" value={formData.user_id} onChange={handleChange} />
      </div>
      <div className="input-box">
        <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit">로그인</button>
      <button type="button" onClick={openRegisterModal}>회원가입</button>
    </form>
  );
};

export default LoginForm;
