import React, { useState, useEffect } from 'react';
import { getLoginUser, changePassword } from '../../api/axiosInstance';

const PersonalInfoForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    user_id: '',
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getLoginUser();
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await changePassword(newPassword);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      setNewPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <h2>개인정보 수정</h2>
      <form>
        <div>
          <label>이름: {userData.name}</label>
        </div>
        <div>
          <label>이메일: {userData.email}</label>
        </div>
        <div>
          <label>아이디: {userData.user_id}</label>
        </div>
      </form>
      <form onSubmit={handlePasswordChange}>
        <h3>비밀번호 변경</h3>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호"
          required
        />
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;