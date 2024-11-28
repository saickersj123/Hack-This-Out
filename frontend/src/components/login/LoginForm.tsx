import React, { useState, useContext } from 'react';
import { loginUser, getUserStatus } from '../../api/axiosUser';
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

  const [formData, setFormData] = useState({ email: '', password: '' });
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
      setError(err.msg || 'Login failed');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className='login-title'>Login</h1>
      <div className="input-box">
        <input 
          type="text" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-box">
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange}
          required
        />
        {error && <p className='error'>{error}</p>}
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={openRegisterModal}>Sign Up</button>
    </form>
  );
};

export default LoginForm;
