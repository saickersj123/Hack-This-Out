import React, { useState, FormEvent } from 'react';
import '../../assets/scss/mypage/mypage.scss';
import ErrorMessage from './ErrorMsg';

interface PasswordCheckFormProps {
  onSubmit: (password: string) => void;
  isVerifying: boolean;
}

/**
 * Form component for verifying the user's password.
 */
const PasswordCheckForm: React.FC<PasswordCheckFormProps> = ({ onSubmit, isVerifying }) => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validatePassword = (password: string): boolean => {
    if (password.length < 1) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  /**
   * Handles form submission for password verification.
   * @param e - The form event.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError('');
    
    if (!validatePassword(password)) {
      return;
    }
    
    onSubmit(password);
  };

  return (
    <div className="lower-container">
      <form onSubmit={handleSubmit}>
        <h2>Confirm Password</h2>
        <p>Please enter your password to see your personal information.</p>
        <input
          className="pw-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <ErrorMessage message={error} />}
        <button className="pw-submit" type="submit" disabled={isVerifying}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default PasswordCheckForm;

