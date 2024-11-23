import React from 'react';
import { downloadOpenVPNProfile } from '../../api/axiosInstance';
import '../../assets/scss/play/DownloadVPNProfile.scss';
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
    <div className="download-container">
      <label className="download-label">
        <input type="checkbox" className="download-input" onClick={handleDownload} />
        <span className="download-circle">
          <svg
            className="download-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 19V5m0 14-4-4m4 4 4-4"
            ></path>
          </svg>
          <div className="download-square"></div>
        </span>
        <p className="download-title">Download</p>
        <p className="download-title">Downloaded</p>
      </label>
    </div>
  );
};

export default DownloadVPNProfile;
