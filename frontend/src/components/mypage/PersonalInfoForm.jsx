import React, { useState, useEffect } from 'react';
import { changePassword, changeName, getUserDetail } from '../../api/axiosInstance';
import { updateUserAvatar } from '../../api/axiosMulti';
import '../../assets/scss/mypage/PersonalInfoForm.scss';

const PersonalInfoForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    user_id: '',
  });
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const fetchUserDetail = async () => {
    const response = await getUserDetail();
    setUserData(response.user);
  };
  useEffect(() => {
    fetchUserDetail();
  }, []);

  

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await changePassword(oldPassword, newPassword);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      setNewPassword('');
      setOldPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleNameChange = async (e) => {
    e.preventDefault();
    try {
      await changeName(name);
      alert('이름이 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('Error changing name:', error);
      alert('이름 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAvatarChange = async (e) => {
    e.preventDefault();
    try {
      await updateUserAvatar(avatar);
      alert('아바타가 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('Error changing avatar:', error);
      alert('아바타 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="personalInfo-container">
      <h2>개인정보 수정</h2>
      <form>
        <div className="avatar-container">
          <img src={userData.avatar} alt="avatar" />
        </div>
        <div className="name-container">
          <label>이름: {userData.name}</label>
        </div>
        <div className="email-container">
          <label>이메일: {userData.email}</label>
        </div>
        <div className="user_id-container">
          <label>아이디: {userData.user_id}</label>
        </div>
      </form>
      <form className="avatar-form" onSubmit={handleAvatarChange}>
        <h3> 아바타 변경 </h3>  
        <input
          type="file"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="새 아바타"
          required
        />
        <button className="avatar-button" type="submit">아바타 변경</button>
      </form>
      <form className="name-form" onSubmit={handleNameChange}>
        <h3>이름 변경</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="새 이름"
          required
        />
        <button className="name-button" type="submit">이름 변경</button>
      </form>
      <form className="password-form" onSubmit={handlePasswordChange}>
        <h3>비밀번호 변경</h3>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="기존 비밀번호"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호"
          required
        />
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="새 비밀번호 확인"
          required
        />
        <button className="password-button" type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;