import axios from 'axios';

// axios 인스턴스 생성. 모든 요청에 사용됩니다.
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json', // 요청 헤더에 Content-Type을 application/json으로 설정
  },
  withCredentials: true, // 인스턴스 레벨에서 withCredentials 설정
});

export default axiosInstance;

