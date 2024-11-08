import React, { useState } from 'react';
import { signUpUser } from '../../api/axiosUser';
import '../../assets/scss/login/RegisterForm.scss';

interface RegisterFormProps {
  closeRegisterModal: () => void;
}

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ closeRegisterModal }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validatePasswords = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!validatePasswords()) {
      return;
    }

    try {
      const data = await signUpUser({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      console.log('User registered:', data);
      // Refresh or redirect
      window.location.reload(); 
    } catch (err: any) {
      console.error('Error registering user:', err.message || err);
      
      // Extract a meaningful error message
      let errorMessage = '회원가입에 실패했습니다. 다시 시도해주세요.';
      
      // If the error response contains a message, use it
      if (err.response && err.response.data && err.response.data.msg) {
        errorMessage = err.response.data.msg;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  };

  return (
    <div className='back'>
      <div className="wrap">
        <form className="register-form" onSubmit={handleSubmit}>
          <button type="button" onClick={closeRegisterModal}>닫기</button>
          <h1>회원가입</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="사용자 이름"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;