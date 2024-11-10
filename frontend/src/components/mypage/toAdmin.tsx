import React, { useState, FormEvent } from 'react';
import { updateUsertoAdmin } from '../../api/axiosUser';
import '../../assets/scss/mypage/toAdmin.scss';

/**
 * Component for upgrading a user to admin status.
 */
const ToAdmin: React.FC = () => {
  const [password, setPassword] = useState<string>('');

  /**
   * Handles the form submission to upgrade user permissions.
   * @param e - The form event.
   */
  const handleToAdmin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await updateUsertoAdmin(password);
      alert(response.message);
      setPassword('');
      //refresh
      window.location.reload();
    } catch (error) {
      console.error('Error updating user permissions:', error);
      alert('관리자 권한 업데이트에 실패했습니다. 다시 시도해주세요.');
      setPassword('');
    }
  };

  return (
    <div className="toAdmin-container">
      <form className="toAdmin-form" onSubmit={handleToAdmin}>
        <h2>관리자 권한 획득</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="관리자 비밀번호"
          required
        />
        <button className="toAdmin-button" type="submit">
          확인
        </button>
      </form>
    </div>
  );
};

export default ToAdmin;