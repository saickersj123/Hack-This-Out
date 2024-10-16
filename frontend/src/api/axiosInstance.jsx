import axios from 'axios';

// axios 인스턴스 생성. 모든 요청에 사용됩니다.
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', //for local test
  //baseURL: 'https://api.hackthisout.o-r.kr/api', // API 요청의 기본 URL 설정
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

// 머신 등록 요청
export const postMac = async ( name, category, info, exp) => {
  try {
    const response = await axiosInstance.post('/prob/post-mac', {
      name,
      category,
      info,
      exp,
    });
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    // 에러 처리
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('머신 등록 실패');
    }
  }
};

export const getMachine = async () => {
  try {
    const response = await axiosInstance.get('/prob/get-mac');
    return response.data; // 머신 데이터 반환
  } catch (error) {
    console.error('Error fetching machine:', error);
    throw new Error('Failed to fetch machine data');
  }
};


/**
 * Start a new EC2 instance with the specified machineId.
 * @param {string} machineId - The ID of the machine to start.
 * @returns {Promise<Object>} - The response data containing instance details.
 */
export const startInstance = async (machineId) => {
  try {
    const response = await axiosInstance.post(`/inst/start-instance/${machineId}`);
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to start instance');
  }
};

/**
 * Get details of all instances.
 */
export const getAllInstances = async () => {
  try {
    const response = await axiosInstance.get('/inst/');
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch instances');
  }
};

/**
 * Get details of a specific instance.
 * @param {string} instanceId - The ID of the instance to retrieve details for.
 * @returns {Promise<Object>} - The response data containing instance details.
 */
export const getInstanceDetails = async (instanceId) => {
  try {
    const response = await axiosInstance.get(`/inst/${instanceId}`);
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch instance details');
  }
};

/**
 * Submit a flag for a specific instance.
 * @param {string} instanceId - The ID of the instance.
 * @param {string} flag - The flag to submit.
 * @returns {Promise<Object>} - The response data confirming submission.
 */
export const submitFlag = async (instanceId, flag) => {
  try {
    const response = await axiosInstance.post(`/inst/${instanceId}/submit-flag`, { flag });
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to submit flag');
  }
};

/**
 * Delete a specific instance.
 * @param {string} instanceId - The ID of the instance to delete.
 * @returns {Promise<Object>} - The response data confirming deletion.
 */
export const deleteInstance = async (instanceId) => {
  try {
    const response = await axiosInstance.delete(`/inst/${instanceId}`);
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to delete instance');
  }
};

/**
 * Submit VPN IP received by the EC2 instance.
 * Note: This function is typically called from the backend, but including it here for completeness.
 * @param {string} instanceId - The ID of the instance.
 * @param {string} userId - The ID of the user.
 * @param {string} vpnIp - The VPN IP to submit.
 * @returns {Promise<Object>} - The response data confirming VPN IP update.
 */
export const receiveVpnIp = async (instanceId, userId, vpnIp) => {
  try {
    const response = await axiosInstance.post(`/inst/${instanceId}/receive-vpn-ip`, {
      userId,
      vpnIp,
    });
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to receive VPN IP');
  }
};

/**
 * Create a new machine.
 * @param {Object} machineData - The data of the machine to create.
 * @returns {Promise<Object>} - The response data containing the created machine.
 */
export const createMachine = async (machineData) => {
  try {
    const response = await axiosInstance.post('/machines', machineData);
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to create machine');
    }
};

/**
 * Get all machines.
 * @returns {Promise<Object>} - The response data containing all machines.
 */
export const getAllMachines = async () => {
  try {
    const response = await axiosInstance.get('/machines');
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch machines');
  }
};

/**
 * Get details of a specific machine.
 * @param {string} machineId - The ID of the machine to retrieve.
 * @returns {Promise<Object>} - The response data containing machine details.
 */
export const getMachineDetails = async (machineName) => {
  try {
    const response = await axiosInstance.get(`/machines/${machineName}`);
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch machine details');
  }
};

/**
 * Update a specific machine.
 * @param {string} machineId - The ID of the machine to update.
 * @param {Object} updateData - The data to update.
 * @returns {Promise<Object>} - The response data containing the updated machine.
 */
export const updateMachine = async (machineId, updateData) => {
  try {
    const response = await axiosInstance.put(`/machines/${machineId}`, updateData);
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to update machine');
  }
};

/**
 * Delete a specific machine.
 * @param {string} machineId - The ID of the machine to delete.
 * @returns {Promise<Object>} - The response data confirming deletion.
 */
export const deleteMachine = async (machineId) => {
  try {
    const response = await axiosInstance.delete(`/machines/${machineId}`);
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to delete machine');
  }
};

export default axiosInstance;
