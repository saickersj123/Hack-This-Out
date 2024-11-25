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

const RegisterForm: React.FC<RegisterFormProps> = ({ }) => {
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
      setError('Password and confirm password do not match.');
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
      let errorMessage = 'Sign up failed. Please try again.';
      
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
    <div className='sign-up-container'>
      <div className="wrap">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className='sign-up-title'>
            <h1>Sign Up</h1>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="email"
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
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className='sign-up-button'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;