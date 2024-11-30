import axios from 'axios';

interface ApiResponse {
  message: string;
  msg?: string;
  cause?: string;
}

// axios 인스턴스 생성. 모든 요청에 사용됩니다.
const axiosMulti = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data', // 요청 헤더에 Content-Type을 multipart/form-data으로 설정
  },
  withCredentials: true, // 인스턴스 레벨에서 withCredentials 설정
});

/**
 * Update user avatar.
 * @param {File} avatar - The avatar file to update.
 * @returns {Promise<ApiResponse>} - The response data confirming avatar update.
 */
export const updateUserAvatar = async (avatar: File): Promise<ApiResponse> => {
  try {
    const response = await axiosMulti.post('/user/update/avatar', { avatar });
    return response.data;
  } catch (error: any) {
    throw {
      cause: error.response?.data?.cause || 'Failed to update avatar'
    };
  }
};

export default axiosMulti;
