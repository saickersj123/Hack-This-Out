import React from 'react';
import { downloadOpenVPNProfile } from '../../api/axiosInstance';

const DownloadVPNProfile = ({ onDownload }) => {
  const handleDownload = async () => {
    try {
      const response = await downloadOpenVPNProfile();
      
      // Create blob URL
      const blob = new Blob([response], { type: 'application/x-openvpn-profile' });
      const url = window.URL.createObjectURL(blob);
      
      // Create and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'vpn-profile.ovpn');
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      if (onDownload) {
        onDownload();
      }
    } catch (error) {
      console.error('Error downloading OpenVPN profile:', error);
      alert(error.response?.data?.msg || 'Failed to download OpenVPN profile.');
    }
  };

  return (
    <button onClick={handleDownload}>
      Download VPN Profile
    </button>
  );
};

export default DownloadVPNProfile;
