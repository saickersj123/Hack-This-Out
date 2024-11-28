import React, { useState } from 'react';
import { downloadOpenVPNProfile } from '../../api/axiosInstance';
import { TbBrandOpenvpn } from "react-icons/tb";
import '../../assets/scss/play/DownloadVPNProfile.scss';
import { usePlayContext } from '../../contexts/PlayContext';

/**
 * Component to download the OpenVPN profile.
 */
const DownloadVPNProfile: React.FC = () => {
  const { downloadStatus, setDownloadStatus, instanceStatus } = usePlayContext();
  const [isClicked, setIsClicked] = useState(false);

  /**
   * Handles the VPN profile download.
   */
  const handleDownload = async () => {
    setIsClicked(true);
    setDownloadStatus('inProgress');

    try {
      const blob = await downloadOpenVPNProfile();
      const url = window.URL.createObjectURL(blob);

      // Create and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'hto-profile.ovpn');
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadStatus('completed');
    } catch (error: any) {
      console.error('Error downloading OpenVPN profile:', error);
      alert(error.response?.data?.msg || 'Failed to download OpenVPN profile.');
      setDownloadStatus('idle');
      setIsClicked(false);
    }
  };

  // Determine label classes based on status
  const getLabelClasses = () => {
    const classes = ['download-label'];
    if (instanceStatus === 'running' || instanceStatus === 'pending') {
      classes.push('instance-started');
    }
    if (isClicked) {
      classes.push('clicked');
    }
    return classes.join(' ');
  };

  return (
    <div className="download-container">
      <div className='text-button-container'>
        <div className="upper-text">
          <TbBrandOpenvpn color="white" size={40} />
          <h2><b>Connect</b></h2>
        </div>
        <h3>Connect using OpenVPN
          <br />Download your VPN configuration
          <br />and connect from your own environment.
        </h3>
        <div className='download-btn'>
          <label className={getLabelClasses()}>
            <input
              type="checkbox"
              className="download-input"
              onClick={handleDownload}
              disabled={downloadStatus === 'inProgress'}
              checked={isClicked || instanceStatus === 'running' || instanceStatus === 'pending'}
              readOnly
            />
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
      </div>
    </div>
  );
};

export default DownloadVPNProfile;
