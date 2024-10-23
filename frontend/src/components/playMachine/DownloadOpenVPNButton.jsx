import React from 'react';
import { downloadOpenVPNProfile } from '../../api/axiosInstance';

const DownloadOpenVPNButton = ({ machineId }) => {
  const handleDownload = async () => {
    try {
      const data = await downloadOpenVPNProfile(machineId);
      // Assuming the server sends the file as a blob
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `machine-${machineId}-profile.ovpn`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading OpenVPN profile:', error);
      alert(error.msg || 'Failed to download OpenVPN profile.');
    }
  };

  return (
    <button onClick={handleDownload}>
      Download OpenVPN Profile
    </button>
  );
};

export default DownloadOpenVPNButton;