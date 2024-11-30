import React, { useState, useContext } from 'react';
import { loginUser, getUserStatus } from '../../api/axiosUser';
import { AuthUserContext } from '../../contexts/AuthUserContext';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import '../../assets/scss/login/LoginForm.scss';
import { validateEmail, validatePassword } from '../../utils/validation';

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

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError) errors.push(emailError);
    if (passwordError) errors.push(passwordError);
    
    if (errors.length > 0) {
      setError(errors.join('\n'));
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      await loginUser(formData);
      const userData = await getUserStatus();
      setCurrentUser(userData.user);
      setIsLoggedIn(true);
      navigate('/'); 
    } catch (err: any) {
      let errorMessages: string[] = [];
      
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((validationError: any) => {
          errorMessages.push(validationError.msg);
        });
      } else if (err.response?.data?.msg) {
        const msg = err.response.data.msg;
        switch (msg) {
          case 'User does not exist':
            errorMessages.push('No account found with this email');
            break;
          case 'Passwords do not match':
            errorMessages.push('Incorrect password');
            break;
          default:
            errorMessages.push(msg);
        }
      } else {
        errorMessages.push('Login failed. Please try again.');
      }
      
      setError(errorMessages.join('\n'));
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className='login-title'>Login</h1>
      {error && (
        <div className="error-message">
          {error.split('\n').map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
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
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={openRegisterModal}>Sign Up</button>
    </form>
  );
};

export default LoginForm;
