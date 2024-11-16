import axiosInstance from './axiosInit';

// ------- Contest related ------

/**
 * Get all contests.
 * @returns {Promise<Object>} - The response data containing all contests.
 * Admin only
 */
export const getContests = async () => {
    try {
      const response = await axiosInstance.get('/contest/');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch contests');
    }
  };
  
  /**
   * Create a new contest.
   * @param {Object} contestData - The data of the contest to create.
   * @returns {Promise<Object>} - The response data containing the created contest.
   */
  export const createContest = async (contestData: any) => {
    try {
      const response = await axiosInstance.post('/contest/', contestData);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to create contest');
    }
  };
  
  /**
   * Participate in a specific contest.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data confirming participation.
   */
  export const participateInContest = async (contestId: string) => {
    try {
      const response = await axiosInstance.post(`/contest/${contestId}/participate`);
      return response.data;
    } catch (error: any) {
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
  export const submitFlagForContest = async (contestId: string, machineId: string, flag: string) => {
    try {
      const response = await axiosInstance.post(`/contest/${contestId}/${machineId}/submit-flag`, { flag });
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to submit flag for contest');
    }
  };
  
  /**
   * Get hints for a specific machine in a contest.
   * @param {string} contestId - The ID of the contest.
   * @param {string} machineId - The ID of the machine.
   * @returns {Promise<Object>} - The response data containing hints.
   */
  export const getHintInContest = async (contestId: string, machineId: string) => {
    try {
      const response = await axiosInstance.get(`/contest/${contestId}/${machineId}/hints`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch hints for contest');
    }
  };
  
  /**
   * Update a specific contest.
   * @param {string} contestId - The ID of the contest to update.
   * @param {Object} updateData - The data to update.
   * @returns {Promise<Object>} - The response data containing the updated contest.
   * Admin only
   */
  export const updateContest = async (contestId: string, updateData: any) => {
    try {
      const response = await axiosInstance.put(`/contest/${contestId}`, updateData);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to update contest');
    }
  };
  
  /**
   * Delete a specific contest.
   * @param {string} contestId - The ID of the contest to delete.
   * @returns {Promise<Object>} - The response data confirming deletion.
   * Admin only
   */
  export const deleteContest = async (contestId: string) => {
    try {
      const response = await axiosInstance.delete(`/contest/${contestId}`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to delete contest');
    }
  };
  
  /**
   * Get leaderboard by contest.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data containing leaderboard.
   */
  export const getLeaderboardByContest = async (contestId: string) => {
    try {
      const response = await axiosInstance.get(`/contest/${contestId}/leaderboard`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch leaderboard by contest');
    }
  };
  
  /**
   * Get contest status.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data containing contest status.
   */
  export const getContestStatus = async (contestId: string) => {
    try {
      const response = await axiosInstance.get(`/contest/${contestId}/status`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch contest status');
    }
  };
  
  /**
   * Get contest details.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data containing contest details.
   * Admin only
   */
  export const getContestDetails = async (contestId: string) => {
    try {
      const response = await axiosInstance.get(`/contest/${contestId}`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch contest details');
    }
  };
  
  /**
   * Get user contest participation.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data containing user contest participation.
   */
  export const getUserContestParticipation = async (contestId: string) => {
    try {
      const response = await axiosInstance.get(`/contest/${contestId}/participate`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch user contest participation');
    }
  };
  
  /**
   * Activate a specific contest.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data confirming activation.
   * Admin only
   */
  export const ActivateContest = async (contestId: string) => {
    try {
      const response = await axiosInstance.post(`/contest/${contestId}/active`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to activate contest');
    }
  };
  
  /**
   * Deactivate a specific contest.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data confirming deactivation.
   * Admin only
   */
  export const DeactivateContest = async (contestId: string) => { 
    try {
      const response = await axiosInstance.post(`/contest/${contestId}/deactive`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to deactivate contest');
    }
  };
  
  /**
   * Get active contest details.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data containing active contest details.
   */
  export const getActiveContestDetails = async (contestId: string) => {
    try {
      const response = await axiosInstance.get(`/contest/active/${contestId}`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch active contest details');
    }
  };
  
  /**
   * Get all active contests.
   * @returns {Promise<Object>} - The response data containing all active contests.
   */
  export const getActiveContests = async () => {
    try {
      const response = await axiosInstance.get('/contest/active');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch active contests');
    }
  };
  
  /**
   * Get all inactive contests.
   * @returns {Promise<Object>} - The response data containing all inactive contests.
   * Admin only
   */
  export const getInactiveContests = async () => {
    try {
      const response = await axiosInstance.get('/contest/inactive');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch inactive contests');
    }
  };
  
  /**
   * Get inactive contest details.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data containing inactive contest details.
   * Admin only
   */
  export const getInactiveContestDetails = async (contestId: string) => {
    try {
      const response = await axiosInstance.get(`/contest/inactive/${contestId}`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch inactive contest details');
    }
  };
  
  /**
   * Get used hints in a contest.
   * @param {string} contestId - The ID of the contest.
   * @param {string} machineId - The ID of the machine.
   * @returns {Promise<Object>} - The response data containing used hints.
   */
  export const getUsedHintsInContest = async (contestId: string, machineId: string) => {
    try {
      const response = await axiosInstance.get(`/contest/${contestId}/${machineId}/used-hints`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch used hints in contest');
    }
  };

  /**
   * Give up a contest.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data confirming giving up.
   */
  export const giveUpContest = async (contestId: string) => {
    try {
      const response = await axiosInstance.post(`/contest/${contestId}/give-up`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to give up contest');
    }
  };

  /**
   * Get my rank in contest.
   * @param {string} contestId - The ID of the contest.
   * @returns {Promise<Object>} - The response data containing my rank in contest.
   */
  export const getMyRankinContest = async (contestId: string) => {
    try {
      const response = await axiosInstance.get(`/contest/${contestId}/my-rank`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch my rank in contest');
    }
  };


  /**
   * Get started contests.
   * @returns {Promise<Object>} - The response data containing started contests.
   */
  export const getStartedContest = async () => {
    try {
      const response = await axiosInstance.get('/contest/started');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch started contests');
    }
  };

  /**
   * Get latest contest.
   * @returns {Promise<Object>} - The response data containing latest contest.
   */
  export const getLatestContest = async () => {
    try {
      const response = await axiosInstance.get('/contest/latest');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch latest contest');
    }
  };
