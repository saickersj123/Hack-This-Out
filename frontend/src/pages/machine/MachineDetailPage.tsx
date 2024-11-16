import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import MachineDetail from '../../components/machine/MachineDetail';
import Main from '../../components/main/Main';
import { getActiveMachineDetails, startPlayingMachine } from '../../api/axiosMachine';
import { MachineDetail as MachineDetailType } from '../../types/Machine';
import '../../assets/scss/machine/MachineDetailPage.scss';
import MachineReviewList from '../../components/machine/MachineReviewList';

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
        const response = await getActiveMachineDetails(machineId);
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
  const handlePlay = async () => {
    if (machineDetail && machineDetail._id) {
      await startPlayingMachine(machineDetail._id);
      navigate(`/machine/${machineDetail._id}/play`);
    } else {
      alert('Invalid machine details.');
    }
  };

  const handleRegisterReview = () => {
    if (machineId) {
      navigate(`/machine/${machineId}/review/new`);
    } else {
      alert('Invalid machine ID.');
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
      <div className='machine-detail-container'>
        <div className="machine-detail-page">
          <div className="detail">
            <MachineDetail machineDetail={machineDetail} />
          </div>
          <button onClick={handlePlay} className="play-button">
            Play
          </button>
        </div>
        <div className='machine-detail-page-review'>
          <MachineReviewList machineId={machineId || ''} />
          <div className='machine-detail-page-new-review'>
            <button onClick={handleRegisterReview} className='machine-detail-page-new-review-button'>
              Add New Review
            </button>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default MachineDetailPage;