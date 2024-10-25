import axios from 'axios';

// axios 인스턴스 생성. 모든 요청에 사용됩니다.
const axiosMulti = axios.create({
  //baseURL: 'http://localhost:5000/api', //for local test
  baseURL: 'https://api.hackthisout.o-r.kr/api', // API 요청의 기본 URL 설정
  headers: {
    'Content-Type': 'multipart/form-data', // 요청 헤더에 Content-Type을 multipart/form-data으로 설정
  },
  withCredentials: true, // 인스턴스 레벨에서 withCredentials 설정
});

/**
 * Update user avatar.
 * @param {string} avatar - The avatar to update.
 * @returns {Promise<Object>} - The response data confirming update.
 */
export const updateUserAvatar = async (avatar) => {
    try {
      const response = await axiosMulti.post('/user/update/avatar', { avatar });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user avatar');
    }
  };

export default axiosMulti;
