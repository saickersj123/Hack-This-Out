import axiosInstance from './axiosInit';

// ------- Instance related ------

/**
 * Start a new EC2 instance with the specified machineId.
 * @param {string} machineId - The ID of the machine to start.
 * @returns {Promise<Object>} - The response data containing instance details.
 */
export const startInstance = async (machineId: string) => {
    try {
      const response = await axiosInstance.post(`/inst/start-instance/${machineId}`);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to start instance');
    }
  };
  
  /**
   * Get details of all instances(Admin only)
   * @returns {Promise<Object>} - The response data containing instance details.
   * Admin only
   */
  export const getAllInstances = async () => {
    try {
      const response = await axiosInstance.get('/inst/');
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch all instances');
    }
  };
  
  /**
   * Get details of all instances by machine.
   * @param {string} machineId - The ID of the machine to get instances.
   * @returns {Promise<Object>} - The response data containing instance details.
   */
  export const getInstanceByMachine = async (machineId: string) => {
    try {
      const response = await axiosInstance.get(`/inst/${machineId}`);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch instances');
    }
  };
  
  /**
   * Get details of a specific instance.
   * @param {string} instanceId - The ID of the instance to retrieve details for.
   * @returns {Promise<Object>} - The response data containing instance details.
   */
  export const getInstanceDetails = async (instanceId: string) => {
    try {
      const response = await axiosInstance.get(`/inst/${instanceId}`);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to fetch instance details');
    }
  };
  
  /**
   * Submit a flag for a specific instance.
   * @param {string} machineId - The ID of the machine.
   * @param {string} flag - The flag to submit.
   * @returns {Promise<Object>} - The response data confirming submission.
   */
  export const submitFlagInstance = async (machineId: string, flag: string) => {
    try {
      const response = await axiosInstance.post(`/inst/${machineId}/submit-flag`, { flag });
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to submit flag');
    }
  };
  
  /**
   * Terminate a specific instance.
   * @param {string} instanceId - The ID of the instance to terminate.
   * @returns {Promise<Object>} - The response data confirming termination.
   * Admin only
  */
  export const TerminateInstanceById = async (instanceId: string) => {
    try {
      const response = await axiosInstance.post(`/inst/terminate-admin/${instanceId}`);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to terminate instance');
    }
  };
  
  /**
   * Terminate all instances by machine.
   * @param {string} machineId - The ID of the machine to terminate.
   * @returns {Promise<Object>} - The response data confirming termination.
   */
  export const TerminateInstance = async (machineId: string) => {
    try {
      const response = await axiosInstance.post(`/inst/terminate/${machineId}`);
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to terminate instance');
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
  export const receiveVpnIp = async (instanceId: string, vpnIp: string) => {
    try {
      const response = await axiosInstance.post(`/inst/${instanceId}/receive-vpn-ip`, {
        vpnIp,
      });
      return response.data; // Return the data received from the server
    } catch (error: any) {
      throw error.response ? error.response.data : new Error('Failed to receive VPN IP');
    }
  };
  
  /**
   * Download OpenVPN profile for a specific instance.
   * @returns {Promise<Blob>} - The OpenVPN profile file blob.
   */
  export const downloadOpenVPNProfile = async () => {
    try {
      const response = await axiosInstance.get(`/inst/download-ovpn`, {
        responseType: 'blob', // Important for handling binary data
      });
      return response.data; // This is the blob
    } catch (error: any) {
      throw error.response?.data || new Error('Failed to download OpenVPN profile');
    }
  };