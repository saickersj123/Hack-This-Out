import React, { useState, useEffect } from 'react';
import { getLoginUser, changePassword, changeName } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import "../../assets/scss/user/PersonalInfoForm.scss";

const PersonalInfoForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    user_id: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getLoginUser();
        setUserData(user);
        setFormData({ name: user.name, newPassword: '', confirmPassword: '' });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const { name, newPassword, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeName = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const data = await changeName(userData.user_id, { name });
      alert(data.msg);
      navigate('/mypage');
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else if (error.msg) {
        setErrors([{ msg: error.msg }]);
      } else {
        setErrors([{ msg: 'Failed to change name.' }]);
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (newPassword !== confirmPassword) {
      setErrors([{ msg: 'Passwords do not match.' }]);
      return;
    }
    try {
      await changePassword(newPassword);
      alert('Password changed successfully.');
      setFormData({ ...formData, newPassword: '', confirmPassword: '' });
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else if (error.msg) {
        setErrors([{ msg: error.msg }]);
      } else {
        setErrors([{ msg: 'Failed to change password.' }]);
      }
    }
  };

  return (
    <div className="personal-info-form">
      <h2>Personal Information</h2>
      <form onSubmit={handleChangeName}>
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, idx) => (
              <p key={idx} className="error">{error.msg}</p>
            ))}
          </div>
        )}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="button">Change Name</button>
      </form>

      <form onSubmit={handlePasswordChange} className="password-form">
        <h3>Change Password</h3>
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, idx) => (
              <p key={idx} className="error">{error.msg}</p>
            ))}
          </div>
        )}
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="button">Change Password</button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;