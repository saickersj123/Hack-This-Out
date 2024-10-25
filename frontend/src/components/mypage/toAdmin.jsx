import React, { useState } from 'react';
import { updateUsertoAdmin } from '../../api/axiosInstance';

const ToAdmin = () => {
    const [password, setPassword] = useState('');
    const handleToAdmin = async (e) => {
        try {
            e.preventDefault();
            const response = await updateUsertoAdmin(password);
            alert(response.message);
            setPassword('');
        } catch (error) {
            console.error('Error updating user permissions:', error);
            alert(error);
            setPassword('');
        }
    };
    return (
        <div className="toAdmin-container">
            <form className="toAdmin-form" onSubmit={handleToAdmin}>
                <h2>관리자 권한 획득</h2>
                <input type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="관리자 비밀번호" 
                required />
                <button className="toAdmin-button" type="submit">확인</button>
            </form>
        </div>
    );
};

export default ToAdmin;