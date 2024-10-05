import axios from 'axios';

// axios 인스턴스 생성. 모든 요청에 사용됩니다.
const axiosInstance = axios.create({
  baseURL: 'https://api.hackthisout.o-r.kr/api', // API 요청의 기본 URL 설정
  headers: {
    'Content-Type': 'application/json', // 요청 헤더에 Content-Type을 application/json으로 설정
  },
  withCredentials: true, // 인스턴스 레벨에서 withCredentials 설정
});


// ------- 유저 관련 함수 ------

// 모든 사용자 데이터 가져오기
export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get('/user/');
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    throw new Error('유저 데이터 가져오기에 실패했습니다.');
  }
};

// 로그인 요청 함수
export const loginUser = async (formData) => {
  try {
    // 로그인 API로 POST 요청 보내기
    const response = await axiosInstance.post('/user/login', formData);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    throw error.response ? error.response.data : new Error('로그인 요청 실패'); // 에러 메시지 반환
  }
};

// 회원가입 요청 함수
export const signUpUser = async (formData) => {
  try {
    // 회원가입 API로 POST 요청 보내기
    const response = await axiosInstance.post('/user/sign-up', formData);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    // 에러 처리
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('회원가입 요청 실패');
    }
  }
};

// 로그인 상태 확인
export const getLoginUser = async () => {
  try {
    const response = await axiosInstance.get('/user/check-login');
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    throw new Error('로그인 상태를 확인하는데 실패했습니다.');
  }
};


// -------- 문제 관련 함수 ---------

// 모든 문제 데이터를 가져오기
export const getAllProb = async () => {
  try {
    const response = await axiosInstance.get('/prob/');
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    throw new Error('문제 데이터를 가져오는데 실패했습니다.');
  }
};

// 문제 등록 요청 함수
export const postProb = async (title, content, answer, theme) => {
  try {
    const response = await axiosInstance.post('/prob/post-prob', {
      title,
      content,
      answer,
      theme,
    });
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    // 에러 처리
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('문제 등록 실패');
    }
  }
};

// 특정 문제 삭제 요청
export const deleteProb = async (id) => {
  try {
    const response = await axiosInstance.delete(`/prob/delete-prob/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('문제를 삭제하는데 실패했습니다.');
  }
};

export default axiosInstance;
