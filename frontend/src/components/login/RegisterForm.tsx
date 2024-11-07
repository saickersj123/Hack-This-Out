//import '../css/RegisterForm.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../api/axiosInstance';
import '../../assets/scss/login/RegisterForm.scss';

interface RegisterFormProps {
  closeRegisterModal: () => void;
}

interface FormData {
  name: string;
  username: string;
  password: string;
  email: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ closeRegisterModal }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    password: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const data = await signUpUser(formData);
      console.log('User registered:', data);
      navigate('/');
    } catch (error: any) {
      console.error('Error registering user:', error.message || error);
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
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="아이디"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;