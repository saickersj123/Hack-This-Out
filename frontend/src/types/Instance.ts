/**
 * Interface representing the Instance details.
 */
export interface Instance {
    status: 'stopped' | 'pending' | 'running' | null;
    vpnIp: string;
    // Add other instance properties as needed
  }