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
import ErrorMessage from './ErrorMsg';

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
  const [errors, setErrors] = useState<{
    password?: string;
    name?: string;
    avatar?: string;
  }>({});
  const [successMessages, setSuccessMessages] = useState<{
    password?: string;
    name?: string;
    avatar?: string;
  }>({});

  /**
   * Fetches user details from the API.
   */
  const fetchUserDetail = async (): Promise<void> => {
    try {
      const response = await getUserDetail();
      setUserData(response.user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('Failed to fetch user details.');
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const validatePassword = (newPw: string, confirmPw: string): boolean => {
    const newErrors: { password?: string } = {};
    
    if (newPw.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (newPw !== confirmPw) {
      newErrors.password = 'New passwords do not match';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles password change form submission.
   * @param e - The form event.
   */
  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrors({});
    setSuccessMessages({});

    if (!validatePassword(newPassword, confirmNewPassword)) {
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      setSuccessMessages(prev => ({
        ...prev,
        password: 'Password changed successfully!'
      }));
      setNewPassword('');
      setOldPassword('');
      setConfirmNewPassword('');
      // Delay reload to show success message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        password: error.cause
      }));
    }
  };

  /**
   * Handles name change form submission.
   * @param e - The form event.
   */
  const handleNameChange = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrors({});
    setSuccessMessages({});

    try {
      await changeName(username);
      setSuccessMessages(prev => ({
        ...prev,
        name: 'Name changed successfully!'
      }));
      setUsername('');
      // Delay reload to show success message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        name: error.cause
      }));
    }
  };

  /**
   * Handles avatar change form submission.
   * @param e - The form event.
   */
  const handleAvatarChange = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrors({});
    setSuccessMessages({});

    if (!avatar) {
      setErrors(prev => ({
        ...prev,
        avatar: 'Please select a file to upload.'
      }));
      return;
    }

    try {
      await updateUserAvatar(avatar);
      setSuccessMessages(prev => ({
        ...prev,
        avatar: 'Avatar changed successfully!'
      }));
      setAvatar(null);
      // Delay reload to show success message
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        avatar: error.cause
      }));
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
              <div className="avatar-input">Upload File</div>
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
              Change
            </button>
            {errors.avatar && <ErrorMessage message={errors.avatar} />}
            {successMessages.avatar && <div className="success-message">{successMessages.avatar}</div>}
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
          <h3>Change Name</h3>
          {errors.name && <ErrorMessage message={errors.name} />}
          {successMessages.name && <div className="success-message">{successMessages.name}</div>}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="New Name"
            required
          />
          <div className="button-container">
            <button className="name-button" type="submit">
              Change
            </button>
          </div>
        </form>
        <form className="password-form" onSubmit={handlePasswordChange}>
          <h3>Change Password</h3>
          {errors.password && <ErrorMessage message={errors.password} />}
          {successMessages.password && <div className="success-message">{successMessages.password}</div>}
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
          />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
          />
          <div className="button-container">
            <button className="password-button" type="submit">
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;