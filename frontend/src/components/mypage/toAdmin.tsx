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
      alert(response.msg);
      setPassword('');
      //refresh
      window.location.reload();
    } catch (error) {
      console.error('Error updating user permissions:', error);
      alert('Failed to update admin permissions. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="toAdmin-container">
      <form className="toAdmin-form" onSubmit={handleToAdmin}>
        <h2>Become Admin</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
          required
        />
        <button className="toAdmin-button" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ToAdmin;