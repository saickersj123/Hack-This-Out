import axios from 'axios';

// axios 인스턴스 생성. 모든 요청에 사용됩니다.
const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5000/api', //for local test
  baseURL: 'https://api.hackthisout.o-r.kr/api', // API 요청의 기본 URL 설정
  headers: {
    'Content-Type': 'application/json', // 요청 헤더에 Content-Type을 application/json으로 설정
  },
  withCredentials: true, // 인스턴스 레벨에서 withCredentials 설정
});


// ------- User related ------

/**
 * Get all user data.
 * @returns {Promise<Object>} - The response data containing all user data.
 */
export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get('/user/');
    return response.data; // 서버로부터 받은 데이터 반환
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};

/**
 * Login request function.
 * @param {Object} formData - The form data for login.
 * @returns {Promise<Object>} - The response data containing login status.
 */
export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/user/login', formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

/**
 * Sign up request function.
 * @param {Object} formData - The form data for sign up.
 * @returns {Promise<Object>} - The response data containing sign up status.
 */
export const signUpUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/user/sign-up', formData);
    return response.data; 
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Sign up failed');
    }
  }
};

/**
 * Check login status.
 * @returns {Promise<Object>} - The response data containing login status.
 */
export const getLoginUser = async () => {
  try {
    const response = await axiosInstance.get('/user/auth-status');
    return response.data;
  } catch (error) {
    throw new Error('Failed to check login status');
  }
};

/**
 * Logout user.
 * @returns {Promise<Object>} - The response data confirming logout.
 */
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post('/user/logout');
    return response.data;
  } catch (error) {
    throw new Error('Logout failed');
  }
};

/**
 * Check password.
 * @param {string} password - The password to check.
 * @returns {Promise<Object>} - The response data confirming password check.
 */
export const checkPassword = async (password) => {
  try {
    const response = await axiosInstance.post('/user/my-page', { password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Password check failed');
  }
};

/**
 * Change password.
 * @param {string} newPassword - The new password to change.
 * @returns {Promise<Object>} - The response data confirming password change.
 */
export const changePassword = async (newPassword) => {
  try {
    const response = await axiosInstance.post('/user/change-password', { password: newPassword });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Password change failed');
  }
};

/**
 * Change name.
 * @param {string} newName - The new name to change.
 * @returns {Promise<Object>} - The response data confirming name change.
 */
export const changeName = async (newName) => {
  try {
    const response = await axiosInstance.post('/user/change-name', { name: newName });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Name change failed');
  }
};

/**
 * Get user progress.
 * @returns {Promise<Object>} - The response data containing user progress.
 */
export const getUserProgress = async () => {
  try {
    const response = await axiosInstance.get('/user/user-progress');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user progress');
  }
};

/**
 * Add user exp.
 * @param {number} exp - The exp to add.
 * @returns {Promise<Object>} - The response data confirming exp addition.
 */
export const addUserExp = async (exp) => {
  try {
    const response = await axiosInstance.post('/user/update/user-exp', { exp });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add user exp');
  }
};

/**
 * Update user level.
 * @param {number} level - The level to update.
 * @returns {Promise<Object>} - The response data confirming level update.
 */
export const updateUserLevel = async (level) => {
  try {
    const response = await axiosInstance.post('/user/update/user-level', { level });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user level');
  }
};

/**
 * Update user avatar.
 * @param {string} avatar - The avatar to update.
 * @returns {Promise<Object>} - The response data confirming update.
 */
export const updateUserAvatar = async (avatar) => {
  try {
    const response = await axiosInstance.post('/user/update/user-avatar', { avatar });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user avatar');
  }
};

/**
 * Update user to admin.
 * @param {string} AdminPassword - The admin password to update.
 * @returns {Promise<Object>} - The response data confirming update.
 */
export const updateUsertoAdmin = async (AdminPassword) => {
  try {
    const response = await axiosInstance.post('/user/update/user-to-admin', { AdminPassword });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user to admin');
  }
};

// ------- Instance related ------

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
export const receiveVpnIp = async (instanceId, vpnIp) => {
  try {
    const response = await axiosInstance.post(`/inst/${instanceId}/receive-vpn-ip`, {
      vpnIp,
    });
    return response.data; // Return the data received from the server
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to receive VPN IP');
  }
};


// ------- Machine related ------

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
export const getMachineDetails = async (machineId) => {
  try {
    const response = await axiosInstance.get(`/machines/${machineId}`);
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

/**
 * Get machine hints.
 * @param {string} machineId - The ID of the machine.
 * @returns {Promise<Object>} - The response data containing machine hints.
 */
export const getMachineHints = async (machineId) => {
  try {
    const response = await axiosInstance.get(`/machines/${machineId}/hints`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch machine hints');
  }
};

/**
 * Submit a flag for a specific machine.
 * @param {string} machineId - The ID of the machine.
 * @param {string} flag - The flag to submit.
 * @returns {Promise<Object>} - The response data confirming submission.
 */
export const submitFlagMachine = async (machineId, flag) => {
  try {
    const response = await axiosInstance.post(`/machines/${machineId}/submit-flag`, { flag });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to submit flag');
  }
};

// ------- 대회 관련 함수 ------

/**
 * Get all contests.
 * @returns {Promise<Object>} - The response data containing all contests.
 */
export const getContests = async () => {
  try {
    const response = await axiosInstance.get('/contest/');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch contests');
  }
};

/**
 * Create a new contest.
 * @param {Object} contestData - The data of the contest to create.
 * @returns {Promise<Object>} - The response data containing the created contest.
 */
export const createContest = async (contestData) => {
  try {
    const response = await axiosInstance.post('/contest/', contestData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to create contest');
  }
};

/**
 * Participate in a specific contest.
 * @param {string} contestId - The ID of the contest.
 * @param {string} machineId - The ID of the machine.
 * @returns {Promise<Object>} - The response data confirming participation.
 */
export const participateInContest = async (contestId, machineId) => {
  try {
    const response = await axiosInstance.post(`/contest/${contestId}/participate`, { machineId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to participate in contest');
  }
};

/**
 * Submit a flag for a specific machine in a contest.
 * @param {string} contestId - The ID of the contest.
 * @param {string} machineId - The ID of the machine.
 * @param {string} flag - The flag to submit.
 * @returns {Promise<Object>} - The response data confirming submission.
 */
export const submitFlagForContest = async (contestId, machineId, flag) => {
  try {
    const response = await axiosInstance.post(`/contest/${contestId}/submit-flag`, { machineId, flag });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to submit flag for contest');
  }
};

/**
 * Get hints for a specific machine in a contest.
 * @param {string} contestId - The ID of the contest.
 * @param {string} machineId - The ID of the machine.
 * @returns {Promise<Object>} - The response data containing hints.
 */
export const getHintInContest = async (contestId, machineId) => {
  try {
    const response = await axiosInstance.get(`/contest/${contestId}/hints`, { machineId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch hints for contest');
  }
};

/**
 * Update a specific contest.
 * @param {string} contestId - The ID of the contest to update.
 * @param {Object} updateData - The data to update.
 * @returns {Promise<Object>} - The response data containing the updated contest.
 */
export const updateContest = async (contestId, updateData) => {
  try {
    const response = await axiosInstance.put(`/contest/${contestId}`, updateData);
    return response.data;
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
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to delete contest');
  }
};

export default axiosInstance;

