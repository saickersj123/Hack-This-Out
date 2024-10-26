import React from 'react';
import { downloadOpenVPNProfile } from '../../api/axiosInstance';

const DownloadOpenVPNButton = () => {
  const handleDownload = async () => {
    try {
      const response = await downloadOpenVPNProfile();
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `vpn-profile.ovpn`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
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

export default DownloadOpenVPNButton;