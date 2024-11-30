import React, { useState } from 'react';
import { checkPassword } from '../../api/axiosUser';
import PasswordCheckForm from '../../components/mypage/PasswordCheckForm';
import PersonalInfoForm from '../../components/mypage/PersonalInfoForm';
import ToAdmin from '../../components/mypage/toAdmin';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/main/Main';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ErrorMessage from '../../components/mypage/ErrorMsg';

/**
 * Component representing the user's personal page.
 */
const MyPage: React.FC = () => {
  const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const navigate = useNavigate();

  /**
   * Handles the password verification process.
   * @param password - The password entered by the user.
   */
  const handlePasswordCheck = async (password: string): Promise<void> => {
    setError('');
    setIsVerifying(true);

    try {
      await checkPassword(password);
      setIsPasswordVerified(true);
    } catch (error: any) {
      console.error('Password check failed:', error);
      setError(error.cause);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Main>
      <div className="mypage-container">
        <div className="upper-container">
          <div className="back-btn-container">
            <button
              className="back-button"
              onClick={() => navigate(-1)}
              aria-label="Back to Home"
              disabled={isVerifying}
            >
              <IoMdArrowRoundBack />
            </button>
          </div>
          <h1>Profile</h1>
        </div>
        
        {error && <ErrorMessage message={error} />}
        
        {!isPasswordVerified ? (
          <div className="password-check-wrapper">
            <PasswordCheckForm 
              onSubmit={handlePasswordCheck}
              isVerifying={isVerifying}
            />
          </div>
        ) : (
          <div className="info-wrapper">
            <PersonalInfoForm />
            <ToAdmin />
          </div>
        )}
      </div>
    </Main>
  );
};

export default MyPage;

