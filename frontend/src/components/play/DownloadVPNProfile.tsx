import React from 'react';
import { downloadOpenVPNProfile } from '../../api/axiosInstance';
import { TbBrandOpenvpn } from "react-icons/tb";
import '../../assets/scss/play/DownloadVPNProfile.scss';


interface DownloadVPNProfileProps {
  downloadStatus: 'idle' | 'inProgress' | 'completed';
  setDownloadStatus: React.Dispatch<React.SetStateAction<'idle' | 'inProgress' | 'completed'>>;
}
/**
 * Component to download the OpenVPN profile.
 */
const DownloadVPNProfile: React.FC<DownloadVPNProfileProps> = ({ downloadStatus, setDownloadStatus }) => {
  /**
   * Handles the VPN profile download.
   */
  const handleDownload = async () => {
    setDownloadStatus('inProgress'); // 상태: 진행 중

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

      setDownloadStatus('completed'); // 상태: 완료
    } catch (error: any) {
      console.error('Error downloading OpenVPN profile:', error);
      alert(error.response?.data?.msg || 'Failed to download OpenVPN profile.');
      setDownloadStatus('idle'); // 상태: 대기로 복구
    }
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
          <label className="download-label">
            <input type="checkbox" className="download-input" onClick={handleDownload} disabled={downloadStatus === 'inProgress'}/>
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
