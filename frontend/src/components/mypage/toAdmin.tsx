import React, { useState, FormEvent } from 'react';
import { updateUsertoAdmin } from '../../api/axiosUser';
import '../../assets/scss/mypage/toAdmin.scss';
import ErrorMessage from './ErrorMsg';

/**
 * Component for upgrading a user to admin status.
 */
const ToAdmin: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Handles the form submission to upgrade user permissions.
   * @param e - The form event.
   */
  const handleToAdmin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await updateUsertoAdmin(password);
      setSuccess('Successfully upgraded to admin privileges!');
      setPassword('');
      // Delay reload to show success message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      setError(error.cause);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="toAdmin-container">
      <form className="toAdmin-form" onSubmit={handleToAdmin}>
        <h2>Become Admin</h2>
        {error && <ErrorMessage message={error} />}
        {success && <div className="success-message">{success}</div>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
          required
        />
        <button 
          className="toAdmin-button" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Confirm'}
        </button>
      </form>
    </div>
  );
};

export default ToAdmin;