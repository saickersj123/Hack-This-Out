import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import MachineDetail from '../../components/machine/MachineDetail';
import Main from '../../components/main/Main';
import { getMachineDetails } from '../../api/axiosInstance';
import { MachineDetail as MachineDetailType } from '../../types/Machine';
//import '../../assets/scss/machine/MachineDetailPage.scss';

/**
 * Component representing the Machine Detail Page.
 * 
 * @returns {JSX.Element} The rendered MachineDetailPage component.
 */
const MachineDetailPage: React.FC = () => {
  const { machineId } = useParams<{ machineId: string }>();
  const navigate: NavigateFunction = useNavigate();

  const [machineDetail, setMachineDetail] = useState<MachineDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the machine details from the API.
   */
  useEffect(() => {
    const fetchMachineDetail = async () => {
      if (!machineId) {
        setError('Machine ID is missing.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await getMachineDetails(machineId);
        setMachineDetail(response.machine);
      } catch (error: any) {
        console.error('Error fetching machine details:', error.message || error);
        setError('Failed to fetch machine details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachineDetail();
  }, [machineId]);

  /**
   * Handles navigation to the play page.
   */
  const handlePlay = () => {
    if (machineDetail && machineDetail._id) {
      navigate(`/machine/${machineDetail._id}/play`);
    } else {
      alert('Invalid machine details.');
    }
  };

  if (isLoading) {
    return (
      <Main title="Machine Detail" description="Loading machine details.">
        <div className="machine-detail-page loading">
          <p>Loading...</p>
        </div>
      </Main>
    );
  }

  if (error || !machineDetail) {
    return (
      <Main title="Machine Detail" description="Failed to load machine details.">
        <div className="machine-detail-page error">
          <p className="error-message">{error || 'Machine not found.'}</p>
        </div>
      </Main>
    );
  }

  return (
    <Main title="Machine Detail" description="Machine Detail 화면입니다.">
      <div className="machine-detail-page">
        <MachineDetail machineDetail={machineDetail} />
        <button onClick={handlePlay} className="play-button">
          Play
        </button>
      </div>
    </Main>
  );
};

export default MachineDetailPage;