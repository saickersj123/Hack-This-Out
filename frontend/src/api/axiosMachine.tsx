import axiosInstance from './axiosInit';

// ------- Machine related ------

/**
 * Create a new machine.
 * @param {Object} machineData - The data of the machine to create.
 * @returns {Promise<Object>} - The response data containing the created machine.
 */
export const createMachine = async (machineData: any) => {
    try {
      const response = await axiosInstance.post('/machines', machineData);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to create machine');
    }
  };
  
  /**
   * Get all machines.
   * @returns {Promise<Object>} - The response data containing all machines.
   * Admin only
   */
  export const getAllMachines = async () => {
    try {
      const response = await axiosInstance.get('/machines');
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch machines');
    }
  };
  
  /**
   * Get active machines.
   * @returns {Promise<Object>} - The response data containing active machines.
   */
  export const getActiveMachines = async () => {
    try {
      const response = await axiosInstance.get('/machines/active');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch active machines');
    }
  };
  
  /**
   * Get inactive machines.
   * @returns {Promise<Object>} - The response data containing inactive machines.
   * Admin only
   */
  export const getInactiveMachines = async () => {
    try {
      const response = await axiosInstance.get('/machines/inactive');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch inactive machines');
    }
  };
  
  /**
   * Activate a specific machine.
   * @param {string} machineId - The ID of the machine to activate.
   * @returns {Promise<Object>} - The response data confirming activation.
   * Admin only
   */
  export const activateMachine = async (machineId: string) => {
    try {
      const response = await axiosInstance.post(`/machines/${machineId}/active`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to activate machine');
    }
  };
  
  /**
   * Deactivate a specific machine.
   * @param {string} machineId - The ID of the machine to deactivate.
   * @returns {Promise<Object>} - The response data confirming deactivation.
   * Admin only
   */
  export const deactivateMachine = async (machineId: string) => {
    try {
      const response = await axiosInstance.post(`/machines/${machineId}/deactive`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to deactivate machine');
    }
  };
  
  /**
   * Get details of a specific machine.
   * @param {string} machineId - The ID of the machine to retrieve.
   * @returns {Promise<Object>} - The response data containing machine details.
   * Admin only
   */
  export const getMachineDetails = async (machineId: string) => {
    try {
      const response = await axiosInstance.get(`/machines/${machineId}`);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch machine details');
    }
  };
  
  /**
   * Get inactive machine details.
   * @param {string} machineId - The ID of the machine to retrieve.
   * @returns {Promise<Object>} - The response data containing machine details.
   * Admin only
   */
  export const getInactiveMachineDetails = async (machineId: string) => {
    try {
      const response = await axiosInstance.get(`/machines/inactive/${machineId}`);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch machine details');
    }
  };
  
  /**
   * Get active machine details.
   * @param {string} machineId - The ID of the machine to retrieve.
   * @returns {Promise<Object>} - The response data containing machine details.
   */
  export const getActiveMachineDetails = async (machineId: string) => {
    try {
      const response = await axiosInstance.get(`/machines/active/${machineId}`);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch machine details');
    }
  };
  
  /**
   * Get machine status.
   * @param {string} machineId - The ID of the machine to retrieve.
   * @returns {Promise<Object>} - The response data containing machine status.
   */
  export const getMachineStatus = async (machineId: string) => {
    try {
      const response = await axiosInstance.get(`/machines/${machineId}/status`);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch machine status');
    }
  };
  
  /**
   * Update a specific machine.
   * @param {string} machineId - The ID of the machine to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Object>} - The response data containing the updated machine.
   * Admin only
   */
  export const updateMachine = async (machineId: string, updateData: any) => {
    try {
      const response = await axiosInstance.put(`/machines/${machineId}`, updateData);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to update machine');
    }
  };
  
  /**
   * Delete a specific machine.
   * @param {string} machineId - The ID of the machine to delete.
   * @returns {Promise<Object>} - The response data confirming deletion.
   * Admin only
   */
  export const deleteMachine = async (machineId: string) => {
    try {
      const response = await axiosInstance.delete(`/machines/${machineId}`);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to delete machine');
    }
  };
  
  /**
   * Get machine hints.
   * @param {string} machineId - The ID of the machine.
   * @returns {Promise<Object>} - The response data containing machine hints.
   */
  export const getMachineHints = async (machineId: string) => {
    try {
      const response = await axiosInstance.get(`/machines/${machineId}/hints`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch machine hints');
    }
  };
  
  /**
   * Get used hints in a machine.
   * @param {string} machineId - The ID of the machine.
   * @returns {Promise<Object>} - The response data containing used hints.
   */
  export const getUsedHints = async (machineId: string) => {
    try {
      const response = await axiosInstance.get(`/machines/${machineId}/used-hints`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch used hints');
    }
  };
  
  /**
   * Get user progress.
   * @returns {Promise<Object>} - The response data containing user progress.
   */
  export const getUserProgress = async (machineId: string) => {
    try {
      const response = await axiosInstance.get(`/machines/${machineId}/progress`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch user progress');
    }
  };
  
  /**
   * Submit a flag for a specific machine.
   * @param {string} machineId - The ID of the machine.
   * @param {string} flag - The flag to submit.
   * @returns {Promise<Object>} - The response data confirming submission.
   */
  export const submitFlagMachine = async (machineId: string, flag: string) => {
    try {
      const response = await axiosInstance.post(`/machines/${machineId}/submit-flag`, { flag });
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to submit flag');
    }
  };
  
  /**
   * Post a machine review.
   * @param {string} machineId - The ID of the machine.
   * @param {Object} reviewData - The data of the review to post.
   * @returns {Promise<Object>} - The response data containing the posted review.
   */
  export const postMachineReview = async (machineId: string, reviewData: any) => {
    try {
      const response = await axiosInstance.post(`/machines/${machineId}/review`, reviewData);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to post machine review');
    }
  };
  
  /**
   * Update a machine review.
   * @param {string} machineId - The ID of the machine.
   * @param {string} reviewId - The ID of the review to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Object>} - The response data containing the updated review.
   */
  export const updateMachineReview = async (machineId: string, reviewId: string, updateData: any) => {
    try {
      const response = await axiosInstance.put(`/machines/${machineId}/reviews/${reviewId}`, updateData);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to update machine review');
    }
  };
  
  /**
   * Delete a machine review.
   * @param {string} machineId - The ID of the machine.
   * @param {string} reviewId - The ID of the review to delete.
   * @returns {Promise<Object>} - The response data confirming deletion.
   */
  export const deleteMachineReview = async (machineId: string, reviewId: string) => {
    try {
      const response = await axiosInstance.delete(`/machines/${machineId}/reviews/${reviewId}`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to delete machine review');
    }
  };
  
  export const deleteMyMachineReview = async (machineId: string) => {
    try {
      const response = await axiosInstance.delete(`/machines/${machineId}/reviews`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to delete machine review');
    }
  };
  
  /**
   * Get a machine review by review ID.
   * @param {string} machineId - The ID of the machine.
   * @param {string} reviewId - The ID of the review to retrieve.
   * @returns {Promise<Object>} - The response data containing the machine review.
   */
  export const getMachineReview = async (machineId: string, reviewId: string) => {
    try {
      const response = await axiosInstance.get(`/machines/${machineId}/reviews/${reviewId}`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch machine review');
    }
  };
  
  /**
   * Get a machine rating.
   * @param {string} machineId - The ID of the machine.
   * @returns {Promise<Object>} - The response data containing the machine rating.
   */
  export const getMachineRating = async (machineId: string) => {
    try {
      const response = await axiosInstance.get(`/machines/${machineId}/rating`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch machine rating');
    }
  };  
  
  /**
   * Get machine reviews.
   * @param {string} machineId - The ID of the machine.
   * @returns {Promise<Object>} - The response data containing machine reviews.
   */
  export const getMachineReviews = async (machineId: string) => {
    try {
      const response = await axiosInstance.get(`/machines/${machineId}/reviews`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch machine reviews');
    }
  };
  
  /**
   * Delete a machine review forcefully.
   * @param {string} machineId - The ID of the machine.
   * @param {string} reviewId - The ID of the review to delete.
   * @returns {Promise<Object>} - The response data confirming deletion.
   * Admin only
   */
  export const deleteMachineReviewForce = async (machineId: string, reviewId: string) => {
    try {
      const response = await axiosInstance.delete(`/machines/${machineId}/reviews/${reviewId}`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to delete machine review');
    }
  };

  /**
   * Give up a machine.
   * @param {string} machineId - The ID of the machine.
   * @returns {Promise<Object>} - The response data confirming giving up.
   */
  export const giveUpMachine = async (machineId: string) => {
    try {
      const response = await axiosInstance.post(`/machines/${machineId}/give-up`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to give up machine');
    }
  };

  /**
   * Start playing a machine.
   * @param {string} machineId - The ID of the machine.
   * @returns {Promise<Object>} - The response data confirming starting.
   */
  export const startPlayingMachine = async (machineId: string) => {
    try {
      const response = await axiosInstance.post(`/machines/${machineId}/start-play`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to start playing machine');
    }
  };

  /**
   * Get latest machine.
   * @returns {Promise<Object>} - The response data containing the latest machine.
   */
  export const getLatestMachine = async () => {
    try {
      const response = await axiosInstance.get('/machines/latest');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch latest machine');
    }
  };

  /**
   * Get most played machine.
   * @returns {Promise<Object>} - The response data containing the most played machine.
   */
  export const getMostPlayedMachine = async () => {
    try {
      const response = await axiosInstance.get('/machines/most-played');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch most played machine');
    }
  };