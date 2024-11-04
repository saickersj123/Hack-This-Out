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
        <h2>비밀번호 확인</h2>
        <p>개인정보 수정을 위해 비밀번호를 입력해주세요.</p>
        <input
          className="pw-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
        <button className="pw-submit" type="submit">
          확인
        </button>
      </form>
    </div>
  );
};

export default PasswordCheckForm;

