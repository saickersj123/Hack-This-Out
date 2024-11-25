import React, { useState, FormEvent } from 'react';
import '../../assets/scss/mypage/mypage.scss';

interface PasswordCheckFormProps {
  onSubmit: (password: string) => void;
}

/**
 * Form component for verifying the user's password.
 */
const PasswordCheckForm: React.FC<PasswordCheckFormProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState<string>('');

  /**
   * Handles form submission for password verification.
   * @param e - The form event.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
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
        <button className="pw-submit" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default PasswordCheckForm;

