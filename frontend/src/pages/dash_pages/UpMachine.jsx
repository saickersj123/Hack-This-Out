import Main from '../../components/section/Main';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postMac } from '../../api/axiosInstance';

const UpMachine = () => {
    const navigate = useNavigate();

    // 상태값 관리
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [info, setInfo] = useState('');
    const [exp, setExp] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // 폼 제출 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault(); // 기본 동작 막기 (페이지 새로고침 방지)

        try {
            // postMac 함수 호출
            await postMac(name, category, info, exp);
            setSuccess(true); // 성공 메시지 설정
            setError(null); // 에러 초기화
            // 폼 제출 후 상태 초기화
            setName('');
            setCategory('');
            setInfo('');
            setExp('');
        } catch (err) {
            setSuccess(false); // 성공 메시지 초기화
            setError(err.message); // 에러 메시지 설정
        }
    };

    // 기존의 문제 업로드 페이지로 이동하는 함수
    const navUpload = () => {
        navigate('/Upload');
    };

    return (
        <Main>
            <h2>Machine 등록</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="머신 이름을 입력하세요" 
                        required 
                    />
                </div>
                <div>
                    <label>카테고리</label>
                    <input 
                        type="text" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        placeholder="카테고리를 입력하세요" 
                        required 
                    />
                </div>
                <div>
                    <label>설명</label>
                    <textarea 
                        value={info} 
                        onChange={(e) => setInfo(e.target.value)} 
                        placeholder="설명을 입력하세요" 
                        required 
                    />
                </div>
                <div>
                    <label>경험치</label>
                    <input 
                        type="number" 
                        value={exp} 
                        onChange={(e) => setExp(e.target.value)} 
                        required 
                    />
                </div>
                {/* 폼 제출 버튼 */}
                <button type="submit">머신 등록</button>
            </form>

            {/* 성공 또는 에러 메시지 표시 */}
            {success && <p style={{ color: 'green' }}>머신이 성공적으로 등록되었습니다!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* 기존의 문제 업로드 페이지로 이동하는 버튼 */}
            <button onClick={navUpload}>문제 업로드</button>
        </Main>
    );
};

export default UpMachine;
