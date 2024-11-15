import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import {
  changePassword,
  changeName,
  getUserDetail,
} from '../../api/axiosUser';
import { updateUserAvatar } from '../../api/axiosMulti';
import '../../assets/scss/mypage/PersonalInfoForm.scss';
import { Avatar } from '@mui/material';
import { getAvatarColorIndex } from '../../utils/avatars';
import { avatarBackgroundColors } from '../../utils/avatars';
interface UserData {
  id: string;
  email: string;
  username: string;
  avatar: string;
  exp: number;
  level: number;
}

const PersonalInfoForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    id: '',
    email: '',
    username: '',
    avatar: '',
    exp: 0,
    level: 0,
  });
  const [username, setUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [avatar, setAvatar] = useState<File | null>(null);

  /**
   * Fetches user details from the API.
   */
  const fetchUserDetail = async (): Promise<void> => {
    try {
      const response = await getUserDetail();
      setUserData(response.user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('사용자 정보를 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  /**
   * Handles password change form submission.
   * @param e - The form event.
   */
  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await changePassword(oldPassword, newPassword);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      setNewPassword('');
      setOldPassword('');
      setConfirmNewPassword('');
      //refresh
      window.location.reload();
    } catch (error) {
      console.error('Error changing password:', error);
      alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /**
   * Handles name change form submission.
   * @param e - The form event.
   */
  const handleNameChange = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await changeName(username);
      alert('이름이 성공적으로 변경되었습니다.');
      // Optionally, refetch user data to reflect changes
      fetchUserDetail();
      setUsername('');
      //refresh
      window.location.reload();
    } catch (error) {
      console.error('Error changing name:', error);
      alert('이름 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /**
   * Handles avatar change form submission.
   * @param e - The form event.
   */
  const handleAvatarChange = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!avatar) {
      alert('업로드할 파일을 선택해주세요.');
      return;
    }
    try {
      await updateUserAvatar(avatar);
      alert('아바타가 성공적으로 변경되었습니다.');
      // Optionally, refetch user data to reflect changes
      fetchUserDetail();
      setAvatar(null);
      //refresh
      window.location.reload();
    } catch (error) {
      console.error('Error changing avatar:', error);
      alert('아바타 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /**
   * Handles file input change for avatar upload.
   * @param e - The change event.
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const avatarColorIndex = getAvatarColorIndex(userData.username);
  const avatarBgColor = avatarBackgroundColors[avatarColorIndex];

  return (
    <div className="personalInfo-container">
      <div className="info-container">
        <div className="avatar-container">
          <Avatar
            sx={{
              backgroundColor: avatarBgColor, width: 200, height: 200, fontSize: '5rem'
            }}
          >
            {userData.username?.charAt(0).toUpperCase() || ''}
          </Avatar>
          <form className="avatar-form" onSubmit={handleAvatarChange}>
            <label htmlFor="file">
              <div className="avatar-input">파일 업로드</div>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
              required
            />
            <button className="avatar-button" type="submit">
              변경
            </button>
          </form>
        </div>
        <div className="user-container">
          <div className="name-container">
            <label>Name : {userData.username}</label>
          </div>
          <div className="username-container">
            <label>ID : {userData.username}</label>
          </div>
          <div className="email-container">
            <label>Email : {userData.email}</label>
          </div>
          <div className="exp-container">
            <label>EXP : {userData.exp}</label>
          </div>
        </div>
      </div>
      <div className="modify-container">
        <form className="name-form" onSubmit={handleNameChange}>
          <h3>이름 변경</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="새 이름"
            required
          />
          <div className="button-container">
            <button className="name-button" type="submit">
              변경
            </button>
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
            <button className="password-button" type="submit">
              변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;