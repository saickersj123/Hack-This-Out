import React, { useState } from 'react';
import { signUpUser } from '../../api/axiosUser';
import '../../assets/scss/login/RegisterForm.scss';
import { validatePassword, validateUsername, validateEmail } from '../../utils/validation';

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

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (usernameError) errors.push(usernameError);
    if (emailError) errors.push(emailError);
    if (passwordError) errors.push(passwordError);
    
    if (formData.password !== formData.confirmPassword) {
      errors.push('Password and confirm password do not match');
    }
    
    if (errors.length > 0) {
      setError(errors.join('\n'));
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      await signUpUser({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      window.location.reload();
    } catch (err: any) {
      let errorMessages: string[] = [];
      
      if (err.response?.data?.errors) {
        // Handle multiple validation errors from express-validator
        err.response.data.errors.forEach((validationError: any) => {
          switch (validationError.path) {
            case 'username':
              errorMessages.push('Username must be between 3 and 10 characters long');
              break;
            case 'email':
              errorMessages.push('Please enter a valid email address');
              break;
            case 'password':
              errorMessages.push('Password must be between 8 and 15 characters long');
              break;
            default:
              errorMessages.push(validationError.msg);
          }
        });
      } else if (err.response?.data?.msg) {
        // Handle custom error messages from backend
        const msg = err.response.data.msg || err.msg;
        if (msg.includes('User already exists')) {
          errorMessages.push('This email or username is already registered. Please try another one.');
        } else {
          errorMessages.push(msg);
        }
      } else {
        errorMessages.push('Please try again.');
      }

      // Join all error messages with line breaks
      setError(errorMessages.join('\n'));
    }
  };

  return (
    <div className='sign-up-container'>
      <div className="wrap">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className='sign-up-title'>
            <h1>Sign Up</h1>
          </div>
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