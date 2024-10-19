import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/scss/login/LoginPage.scss';
import LoginForm from '../components/login/LoginForm.jsx'; 
import Modal from '../components/Modal'; // 모달 import
import RegisterForm from '../components/login/RegisterForm'; // RegisterForm import
import { getLoginUser } from '../api/axiosInstance';

const LoginPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await getLoginUser();
        if (user) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  // 배경 클릭 시 배경 상태 변경
  const handleBackgroundClick = () => {
    setIsClicked(!isClicked);
  };

  // 회원가입 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 회원가입 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className={isClicked ? "background-image change-background" : "background-image"}
        onClick={handleBackgroundClick}
      ></div>
      <div className={isClicked ? "content-wrapper visible" : "content-wrapper"}>
        <LoginForm openRegisterModal={openModal} /> {/* 모달 여는 함수를 LoginForm에 전달 */}
      </div>

      {/* 회원가입 모달 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <RegisterForm closeRegisterModal={closeModal}/>
      </Modal>
    </div>
  );
};

export default LoginPage;
