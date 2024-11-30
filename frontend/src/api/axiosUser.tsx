import axiosInstance from './axiosInit';

// ------- User related ------

interface ApiResponse {
  message: string;
  msg?: string;
  cause?: string;
}

/**
 * Get all user data.
 * @returns {Promise<Object>} - The response data containing all user data.
 */
export const getAllUser = async () => {
    try {
      const response = await axiosInstance.get('/user/');
      return response.data; // 서버로부터 받은 데이터 반환
    } catch (error: any) {
      throw new Error('Failed to fetch user data');
    }
  };
  
  /**
   * Get user Detail
   * @returns {Promise<Object>} - The response data containing user detail.
   */
  export const getUserDetail = async () => {
    try {
      const response = await axiosInstance.get('/user/detail');
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch user detail');
    }
  };
  
  /**
   * Get user Detail by userId(Admin Only)
   * @param {string} userId - The userId to get user detail.
   * @returns {Promise<Object>} - The response data containing user detail.
   * Admin only
  */
  export const getUserDetailByUserId = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/user/detail/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch user detail');
    }
  };
  
  /**
   * Login request function.
   * @param {Object} formData - The form data for login.
   * @returns {Promise<Object>} - The response data containing login status.
   */
  export const loginUser = async (formData: any) => {
    try {
      const response = await axiosInstance.post('/user/login', formData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw {
          response: {
            data: error.response.data,
            status: error.response.status
          }
        };
      }
      throw new Error('Login failed');
    }
  };
  
  /**
   * Sign up request function.
   * @param {Object} formData - The form data for sign up.
   * @returns {Promise<Object>} - The response data containing sign up status.
   */
  export const signUpUser = async (formData: any) => {
    try {
      const response = await axiosInstance.post('/user/sign-up', formData);
      return response.data; 
    } catch (error: any) {
      if (error.response) {
        throw {
          response: {
            data: error.response.data,
            status: error.response.status
          }
        };
      }
      throw new Error('Sign up failed');
    }
  };
  
  /**
   * Check login status.
   * @returns {Promise<Object>} - The response data containing login status.
   */
  export const getUserStatus = async () => {
    try {
      const response = await axiosInstance.get('/user/auth-status');
      return response.data;
    } catch (error: any) {
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
    } catch (error: any) {
      throw new Error('Logout failed');
    }
  };
  
  /**
   * Check password.
   * @param {string} password - The password to check.
   * @returns {Promise<Object>} - The response data confirming password check.
   */
  export const checkPassword = async (password: string) => {
    try {
      const response = await axiosInstance.post('/user/my-page', { password });
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Password check failed');
    }
  };
  
  /**
   * Change password.
   * @param {string} newPassword - The new password to change.
   * @returns {Promise<Object>} - The response data confirming password change.
   */
  export const changePassword = async (oldPassword: string, newPassword: string): Promise<ApiResponse> => {
    try {
      const response = await axiosInstance.post('/user/change-password', { oldPassword, newPassword });
      return response.data;
    } catch (error: any) {
      throw {
        cause: error.response?.data?.cause || 'Failed to change password'
      };
    }
  };
  
  /**
   * Change name.
   * @param {string} newUsername - The new username to change.
   * @returns {Promise<Object>} - The response data confirming name change.
   */
  export const changeName = async (username: string): Promise<ApiResponse> => {
    try {
      const response = await axiosInstance.post('/user/change-name', { username });
      return response.data;
    } catch (error: any) {
      throw {
        cause: error.response?.data?.cause || 'Failed to change name'
      };
    }
  };
  
  /**
   * Reset password.
   * @param {string} userId - The userId to reset.
   * @param {string} password - The new password to reset.
   * @returns {Promise<Object>} - The response data confirming reset.
   */
  export const resetPassword = async (userId: string, password: string) => {
    try {
      const response = await axiosInstance.post(`/user/reset-password/${userId}`, { password });
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to reset password');
    }
  };
  
  /**
   * Get user progress by userId.
   * @param {string} userId - The userId to get user progress.
   * @returns {Promise<Object>} - The response data containing user progress.
   * Admin only
   */
  export const getUserProgressByUserId = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/user/progress/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch user progress');
    }
  };
  
  /**
   * Add user exp.
   * @param {number} exp - The exp to add.
   * @returns {Promise<Object>} - The response data confirming exp addition.
   * Admin only
   */
  export const addUserExp = async (userId: string, exp: number) => {
    try {
      const response = await axiosInstance.post(`/user/update/${userId}/exp`, { exp });
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to add user exp');
    }
  };
  
  /**
   * Update user level.
   * @param {number} level - The level to update.
   * @returns {Promise<Object>} - The response data confirming level update.
   * Admin only
   */
  export const updateUserLevel = async (userId: string, level: number) => {
    try {
      const response = await axiosInstance.post(`/user/update/${userId}/level`, { level });
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to update user level');
    }
  };
  
  /**
   * Update user to admin.
   * @param {string} AdminPassword - The admin password to update.
   * @returns {Promise<Object>} - The response data confirming update.
   */
  export const updateUsertoAdmin = async (AdminPassword: string): Promise<ApiResponse> => {
    try {
      const response = await axiosInstance.post('/user/update/to-admin', { AdminPassword });
      return response.data;
    } catch (error: any) {
      throw {
        cause: error.response?.data?.cause || 'Failed to update user to admin'
      };
    }
  };
  
  /**
   * Reset user progress.
   * @param {string} password - The password to reset.
   * @returns {Promise<Object>} - The response data confirming reset.
   */
  export const resetUserProgress = async (password: string) => {
    try {
      const response = await axiosInstance.post('/user/reset', { password });
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to reset user progress');
    }
  };
  
  /**
   * Reset user progress by userId.
   * @param {string} userId - The userId to reset.
   * @returns {Promise<Object>} - The response data confirming reset.
   * Admin only
   */
  export const resetUserProgressByUserId = async (userId: string) => {
    try {
      const response = await axiosInstance.post(`/user/reset/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to reset user progress');
    }
  };
  
  /**
   * Get leaderboard.
   * @returns {Promise<Object>} - The response data containing leaderboard.
   */
  export const getLeaderboard = async () => {
    try {
      const response = await axiosInstance.get('/user/leaderboard');
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch leaderboard');
    }
  };
  
  /**
   * Delete user by userId.
   * @param {string} userId - The userId to delete.
   * @returns {Promise<Object>} - The response data confirming deletion.
   * Admin only
   */
  export const deleteUserByUserId = async (userId: string) => {  
    try {
      const response = await axiosInstance.delete(`/user/${userId}/delete`);
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to delete user');
    }
  };
  
  /**
   * Delete user.
   * @param {string} password - The password to delete.
   * @returns {Promise<Object>} - The response data confirming deletion.
   */
  export const deleteUser = async (password: string) => {
    try {
      const response = await axiosInstance.delete('/user', { data: { password } });
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to delete user');
    }
  };
  
  /**
   * Make user to admin.
   * @param {string} userId - The userId to make to admin.
   * @returns {Promise<Object>} - The response data confirming update.
   */
  export const makeUsertoAdmin = async (userId: string) => {
    try {
      const response = await axiosInstance.post(`/user/${userId}/to-admin`);
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to make user to admin');
    }
  };
  
  /**
   * Make admin to user.
   * @param {string} userId - The userId to make to user.
   * @returns {Promise<Object>} - The response data confirming update.
   */
  export const makeAdmintoUser = async (userId: string) => {
    try {
      const response = await axiosInstance.post(`/user/${userId}/to-user`);
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to make user to user');
    }
  };

  /**
   * Get my rank.
   * @returns {Promise<Object>} - The response data containing my rank.
   */
  export const getMyRank = async () => {
    try {
      const response = await axiosInstance.get('/user/my-rank');
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch my rank');
    }
  };

/**
 * Get user progress.
 * @returns {Promise<Object>} - The response data containing user progress.
 */
export const getUserProgress = async () => {
  try {
    const response = await axiosInstance.get('/user/progress');
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Failed to fetch user progress');
  }
};