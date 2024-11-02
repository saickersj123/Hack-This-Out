import React from 'react';
import { downloadOpenVPNProfile } from '../../api/axiosInstance';

/**
 * Component to download the OpenVPN profile.
 */
const DownloadVPNProfile: React.FC = () => {
  /**
   * Handles the VPN profile download.
   */
  const handleDownload = async () => {
    try {
      const response = await downloadOpenVPNProfile();
      
      // Assuming the response is a Blob
      const blob = new Blob([response.data], { type: 'application/x-openvpn-profile' });
      const url = window.URL.createObjectURL(blob);
      
      // Create and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'vpn-profile.ovpn');
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error: any) {
      console.error('Error downloading OpenVPN profile:', error);
      alert(error.response?.data?.msg || 'Failed to download OpenVPN profile.');
    }
  };

  return (
    <button onClick={handleDownload} className="download-vpn-button">
      Download VPN Profile
    </button>
  );
};

export default DownloadVPNProfile;
