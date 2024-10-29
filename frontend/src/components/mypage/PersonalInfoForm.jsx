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
      <div className='info-container'>
        <div className="avatar-container">
          <img className="avatar-img" src={userData.avatar} alt="avatar" />
          <form className="avatar-form" onSubmit={handleAvatarChange}>
            <label for="file">
              <div className='avatar-input'>파일 업로드</div>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".png,.jpg,.jpeg"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
            <button className="avatar-button" type="submit">변경</button>
          </form>
        </div>
        <div className='user-container'>
          <div className="name-container">
            <label>Name : {userData.name}</label>
          </div>
          <div className="user_id-container">
            <label>ID : {userData.user_id}</label>
          </div>
          <div className="email-container">
            <label>Email : {userData.email}</label>
          </div>
          <div className="exp-container">
            <label>EXP : {userData.exp}</label>
          </div>
        </div>
      </div>
      <div className='modify-container'>
        <form className="name-form" onSubmit={handleNameChange}>
          <h3>이름 변경</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="새 이름"
            required
          />
          <div className="button-container">
            <button className="name-button" type="submit">변경</button>
          </div>
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
          <div className="button-container">
            <button className="password-button" type="submit">변경</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;