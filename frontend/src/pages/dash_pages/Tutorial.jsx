import React from 'react'
import Main from '../../components/section/Main'

const createGCPInstance = () => {

    const projectId = 'blackmuji-gcp'; // GCP 프로젝트 ID
    const zone = 'asia-northeast3-a'; // 인스턴스를 생성할 존
    const instanceName = 'test1'; // 생성할 인스턴스의 이름

    const fetchOptions = {
        method: 'POST', // API 요청 방식
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            projectId: projectId,
            zone: zone,
            instanceName: instanceName
        })
    };

    // 백엔드 API 엔드포인트 설정
    const apiUrl = 'http://localhost:5000/api/create';

    // 백엔드 API로 요청 보내기
    fetch(apiUrl, fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Instance creation response:', data);
        })
        .catch(error => {
            console.error('Error during instance creation:', error);
        });

    return (
        <Main title="Tutorial" description="Tutorial 화면입니다.">
            <button onClick={createGCPInstance}>Create GCP Instance</button>
        </Main>
    );
}

export default createGCPInstance
