import React, { useState, useContext } from 'react';
import { loginUser, getUserStatus } from '../../api/axiosInstance';
import { AuthUserContext } from '../../contexts/AuthUserContext';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import '../../assets/scss/login/LoginForm.scss';

interface LoginFormProps {
  openRegisterModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ openRegisterModal }) => {
  // Consume AuthUserContext
  const authUserContext = useContext(AuthUserContext);

  if (!authUserContext) {
    throw new Error('LoginForm must be used within an AuthUserProvider');
  }

  const { setCurrentUser, setIsLoggedIn } = authUserContext;

  const [formData, setFormData] = useState({ user_id: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate: NavigateFunction = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      // Attempt to log in the user
      await loginUser(formData);
      
      // Fetch user status after successful login
      const userData = await getUserStatus();
      
      // Update context with fetched user data
      setCurrentUser(userData.user);
      setIsLoggedIn(true);
      
      // Optional: If you prefer to handle navigation here instead of in LoginPage
      navigate('/'); 
      
      // Since LoginPage handles navigation based on isLoggedIn, no need to navigate here
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>로그인</h1>
      <div className="input-box">
        <input 
          type="text" 
          name="user_id" 
          placeholder="아이디" 
          value={formData.user_id} 
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
        {error && <p className='error'>{error}</p>}
      </div>
      <button type="submit">로그인</button>
      <button type="button" onClick={openRegisterModal}>회원가입</button>
    </form>
  );
};

export default LoginForm;
