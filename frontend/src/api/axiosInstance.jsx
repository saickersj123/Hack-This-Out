import axios from 'axios';

// Create an Axios instance for all requests
const axiosInstance = axios.create({
<<<<<<< Updated upstream
  baseURL: 'http://localhost:5000/api', //for local test
  //baseURL: 'https://api.hackthisout.o-r.kr/api', // API 요청의 기본 URL 설정
=======
  baseURL: 'http://localhost:5000/api', // For local testing
  // baseURL: 'https://api.hackthisout.o-r.kr/api', // Set the base URL for API requests
>>>>>>> Stashed changes
  headers: {
    'Content-Type': 'application/json', // Set Content-Type to application/json
  },
  withCredentials: true, // Enable sending cookies with requests
});

// ------- User-Related Functions ------

// Get all user data
export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get('/user/');
    return response.data; // Return data from the server
  } catch (error) {
    throw new Error('유저 데이터 가져오기에 실패했습니다.');
  }
};

// User login
export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/user/login', formData);
    return response.data; // Return data on success
  } catch (error) {
    throw error.response ? error.response.data : new Error('로그인 요청 실패'); // 에러 메시지 반환
  }
};

// User signup
export const signUpUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/user/sign-up', formData);
    return response.data; // Return data on success
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('회원가입 요청 실패');
    }
  }
};

// Check login status
export const getLoginUser = async () => {
  try {
    const response = await axiosInstance.get('/user/auth-status');
    return response.data; // Return data from the server
  } catch (error) {
    throw new Error('로그인 상태를 확인하는데 실패했습니다.');
  }
};

<<<<<<< Updated upstream

// -------- 문제 관련 함수 ---------

// 모든 문제 데이터를 가져오기
export const getAllProb = async () => {
=======
// User logout
export const logoutUser = async () => {
>>>>>>> Stashed changes
  try {
    const response = await axiosInstance.get('/prob/');
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    throw new Error('문제 데이터를 가져오는데 실패했습니다.');
  }
};

<<<<<<< Updated upstream
// 문제 등록 요청 함수
export const postProb = async (title, content, answer, theme) => {
=======
// Check user password
export const checkPassword = async (password) => {
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// 특정 문제 삭제 요청
export const deleteProb = async (id) => {
=======
// Change user password
export const changePassword = async (newPassword) => {
>>>>>>> Stashed changes
  try {
    const response = await axiosInstance.delete(`/prob/delete-prob/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('문제를 삭제하는데 실패했습니다.');
  }
};

// Change user name
export const changeName = async (userId, newName) => {
  try {
    const response = await axiosInstance.post(`/user/change-name/${userId}`, { name: newName });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Name change failed');
  }
};

// Get user progress
export const getUserProgress = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/progress/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch user progress');
  }
};

// ------- Instance-Related Functions ------

/**
 * Start a new EC2 instance with the specified machineId.
 * @param {string} machineId - The ID of the machine to start.
 * @returns {Promise<Object>} - The response data containing instance details.
 */
export const startInstance = async (machineId) => {
  try {
    const response = await axiosInstance.post(`/inst/start-instance/${machineId}`);
    return response.data; // Return the data from the server
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
    return response.data; // Return the data from the server
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
    return response.data; // Return the data from the server
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
    return response.data; // Return the data from the server
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
    return response.data; // Return the data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to delete instance');
  }
};

/**
 * Submit VPN IP received by the EC2 instance.
 * @param {string} instanceId - The ID of the instance.
 * @param {string} vpnIp - The VPN IP to submit.
 * @returns {Promise<Object>} - The response data confirming VPN IP update.
 */
export const receiveVpnIp = async (instanceId, userId, vpnIp) => {
  try {
    const response = await axiosInstance.post(`/inst/${instanceId}/receive-vpn-ip`, {
      userId,
      vpnIp,
    });
    return response.data; // Return the data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to receive VPN IP');
  }
};

// ------- Machine-Related Functions ------

/**
 * Create a new machine.
 * @param {string} name - The name of the machine.  
 * @param {string} category - The category of the machine.
 * @param {string} info - The information of the machine.
 * @param {number} exp - The expiration time of the machine.
 * @param {string} hints - The hints of the machine.
 * @param {string} amiId - The AMI ID of the machine.
 * @param {string} flag - The flag of the machine.
 * @returns {Promise<Object>} - The response data containing the created machine.
 */
export const createMachine = async (name, category, info, exp, hints, amiId, flag) => {
  try {
    const response = await axiosInstance.post('/machines', { name, category, info, exp, hints, amiId, flag });
    return response.data; // Return data from the server
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
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch machines');
  }
};

/**
 * Get details of a specific machine.
 * @param {string} machineId - The ID of the machine to retrieve.
 * @returns {Promise<Object>} - The response data containing machine details.
 */
export const getMachineDetails = async (machineId) => {
  try {
    const response = await axiosInstance.get(`/machines/${machineId}`);
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch machine details');
  }
};

/**
 * Update a specific machine.
 * @param {string} machineId - The ID of the machine to update.
 * @param {Object} updatedData - The updated machine data.
 * @returns {Promise<Object>} - The response data containing the updated machine.
 */
export const updateMachine = async (machineId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/machines/${machineId}`, updatedData);
    return response.data; // Return data from the server
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
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to delete machine');
  }
};

/**
 * Submit a flag for a machine.
 * @param {string} machineId - The ID of the machine.
 * @param {string} flag - The flag to submit.
 * @returns {Promise<Object>} - The response data confirming flag submission.
 */
export const MachinesubmitFlag = async (machineId, flag) => {
  try {
    const response = await axiosInstance.post(`/machines/${machineId}/submit-flag`, { flag });
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to submit flag for machine');
  }
};

/**
 * Get a hint for a machine.
 * @param {string} machineId - The ID of the machine.
 * @returns {Promise<Object>} - The response data containing the hint and usage details.
 */
export const getHint = async (machineId) => {
  try {
    const response = await axiosInstance.post('/hint/use', { machineId });
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to use hint');
  }
};

/**
 * Get a hint in a contest.
 * @param {string} contestId - The ID of the contest.
 * @param {string} machineId - The ID of the machine.
 * @returns {Promise<Object>} - The response data containing the hint and usage details.
 */
export const getHintInContest = async (contestId, machineId) => {
  try {
    const response = await axiosInstance.post('/contest/use-hint', { contestId, machineId });
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to use hint in contest');
  }
};

// ------- Contest-Related Functions ------

/**
 * Create a new contest.
 * @param {Object} contestData - The data of the contest to create.
 * @returns {Promise<Object>} - The response data containing the created contest.
 */
export const createContest = async (contestData) => {
  try {
    const response = await axiosInstance.post('/contest/create', contestData);
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to create contest');
  }
};

/**
 * Participate in a contest.
 * @param {string} contestId - The ID of the contest.
 * @param {string} machineId - The ID of the machine.
 * @returns {Promise<Object>} - The response data confirming participation.
 */
export const participateInContest = async (contestId, machineId) => {
  try {
    const response = await axiosInstance.post('/contest/participate', { contestId, machineId });
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to participate in contest');
  }
};

/**
 * Submit a flag for a contest.
 * @param {string} contestId - The ID of the contest.
 * @param {string} machineId - The ID of the machine.
 * @param {string} flag - The flag to submit.
 * @returns {Promise<Object>} - The response data confirming flag submission.
 */
export const submitFlagForContest = async (contestId, machineId, flag) => {
  try {
    const response = await axiosInstance.post('/contest/submit-flag', { contestId, machineId, flag });
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to submit flag for contest');
  }
};

/**
 * Update an existing contest.
 * @param {string} contestId - The ID of the contest to update.
 * @param {Object} updatedData - The updated contest data.
 * @param {string} updatedData.name - The name of the contest.
 * @param {string} updatedData.description - The description of the contest.
 * @param {string} updatedData.startTime - The start time of the contest.
 * @param {string} updatedData.endTime - The end time of the contest.
 * @param {string[]} updatedData.machines - The IDs of the machines in the contest.
 * @param {number} updatedData.contestExp - The EXP awarded for the contest.
 * @returns {Promise<Object>} - The response data containing the updated contest.
 */
export const updateContest = async (contestId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/contest/${contestId}`, updatedData);
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to update contest');
  }
};

/**
 * Delete a specific contest.
 * @param {string} contestId - The ID of the contest to delete.
 * @returns {Promise<Object>} - The response data confirming deletion.
 */
export const deleteContest = async (contestId) => {
  try {
    const response = await axiosInstance.delete(`/contest/${contestId}`);
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to delete contest');
  }
};

/**
 * Get details of a specific contest.
 * @param {string} contestId - The ID of the contest to retrieve details for.
 * @returns {Promise<Object>} - The response data containing contest details.
 */
export const getContestDetails = async (contestId) => {
  try {
    const response = await axiosInstance.get(`/contest/${contestId}`);
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch contest details');
  }
};

/**
 * Get user participation in a contest.
 * @param {string} contestId - The ID of the contest to retrieve participation for.
 * @returns {Promise<Object>} - The response data containing user participation.
 */
export const getUserContestParticipation = async (contestId) => {
  try {
    const response = await axiosInstance.get(`/contest/participation/${contestId}`);
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch user contest participation');
  }
};

/**
 * Get all contests.
 * @returns {Promise<Object>} - The response data containing all contests.
 */
export const getContests = async () => {
  try {
    const response = await axiosInstance.get('/contest/');
    return response.data; // Return data from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch contests');
  }
};

/**
 * Download OpenVPN Profile for a machine.
 * @param {string} machineId - The ID of the machine.
 * @returns {Promise<Blob>} - The OpenVPN profile file.
 */
export const downloadOpenVPNProfile = async (machineId) => {
  try {
    const response = await axiosInstance.get(`/machines/${machineId}/download-ovpn`, {
      responseType: 'blob', // Important for handling binary data
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to download OpenVPN profile.');
  }
};

export default axiosInstance;
