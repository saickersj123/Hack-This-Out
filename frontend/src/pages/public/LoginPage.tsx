import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../../assets/scss/login/LoginPage.scss';
import LoginForm from '../../components/login/LoginForm'; 
import Modal from '../../components/modal/Modal'; // Modal import
import RegisterForm from '../../components/login/RegisterForm'; // RegisterForm import
import { AuthUserContext } from '../../contexts/AuthUserContext'; // Import AuthUserContext
import Main from '../../components/main/Main';
import Loading from '../../components/public/Loading';

const LoginPage: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state management
  const navigate = useNavigate(); // Initialize navigate

  // Consume AuthUserContext
  const authUserContext = useContext(AuthUserContext);

  if (!authUserContext) {
    throw new Error('AuthUserContext must be used within an AuthUserProvider');
  }

  const { isLoggedIn, isLoading } = authUserContext;

  // Handle redirection if user is already logged in
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate('/'); // Redirect to main page
    }
  }, [isLoggedIn, isLoading, navigate]);

  // Background click handler
  const handleBackgroundClick = () => {
    setIsClicked(!isClicked);
  };

  // Open registration modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close registration modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // While checking authentication status, you might want to show a loader
  if (isLoading) {
    return (
      <Main title="Login" description="Loading login page.">
        <div className="login-page loading">
          <Loading />
        </div>
      </Main>
    );
  }

  return (
    <div>
      <div
        className={isClicked ? "background-image change-background" : "background-image"}
        onClick={handleBackgroundClick}
      ></div>
      <div className={isClicked ? "content-wrapper visible" : "content-wrapper"}>
        <LoginForm openRegisterModal={openModal} /> {/* Pass the modal opening function to LoginForm */}
      </div>

      {/* Registration Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <RegisterForm closeRegisterModal={closeModal}/>
      </Modal>
    </div>
  );
};

export default LoginPage;
