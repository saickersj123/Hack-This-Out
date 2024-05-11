// LoginForm.js
import '../css/RegisterForm.scss';
import React from 'react';
import { Link } from 'react-router-dom';

function LoginForm({ isActive }) {
  return (
    <div className={`background ${isActive ? 'active' : ''}`}>
      <div className="wrap">
        <form className="content-wrapper">
          <h1>로그인</h1>
          <div className="input-box">
            <input type="text" placeholder="아이디" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="비밀번호" />
          </div>
          <Link to="/main">
            <button type="submit">로그인</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;