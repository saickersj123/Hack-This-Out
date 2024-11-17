import React, { useEffect, useState } from 'react';
import Main from '../../components/main/Main';
import { useParams } from 'react-router-dom';
import { ContestDetail as ContestDetailType } from '../../types/Contest';
import { getContestDetails, participateInContest } from '../../api/axiosContest';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import Modal from '../../components/modal/Modal'; // Importing the Modal component
import styles from '../../assets/scss/contest/PreContestPage.module.scss';
import Loading from '../../components/public/Loading';


const PreContestPage: React.FC = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const [contestDetail, setContestDetail] = useState<ContestDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control Modal visibility
  const navigate: NavigateFunction = useNavigate();

  /**
   * Fetches the contest details from the API.
   */
  useEffect(() => {
    const fetchContestDetail = async () => {
      if (!contestId) {
        setError('Contest ID is missing.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true); // Start loading
        const response = await getContestDetails(contestId);
        setContestDetail(response.contest);
      } catch (error: any) {
        console.error('Error fetching contest details:', error.message || error);
        setError('Failed to fetch contest details.');
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchContestDetail();
  }, [contestId]);

  if (isLoading) {
    return (
      <Main title="Contest Detail" description="Loading contest details.">
        <div className="contest-detail-page loading">
          <Loading />
        </div>
      </Main>
    );
  }

  if (error || !contestDetail) {
    return (
      <Main title="Contest Detail" description="Failed to load contest details.">
        <div className="contest-detail-page error">
          <p className="error-message">{error || 'Contest not found.'}</p>
        </div>
      </Main>
    );
  }

  const handleStartContest = async () => {
    try {
      if (!contestId) {
        setError('Contest ID is missing.');
        return;
      }

      const participation = await participateInContest(contestId);
      if (participation) {
        navigate(`/contest/${contestId}/play`);
      } else {
        setError(participation.msg);
      }
    } catch (error: any) {
      // Check if the error response exists
      if (error.message === "FOUND") {
        // User has already participated and completed the contest
        setIsModalOpen(true); // Open the modal instead of redirecting immediately
        return;
      }
      // Handle other specific status codes if needed
      setError(error.response.data.msg || 'Failed to start contest.');
      console.error('Error starting contest:', error.message || error);
      setError('Failed to start contest.');

    }
  };

  // Handler to close the modal and redirect to main
  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(`/contest`);
  };

  return (
    <Main title="Pre Contest" description="Pre Contest 화면입니다.">
      <div className={styles.pre_contest_page}>
        <div className={styles.contest_basic_info}>
          <h1 className={styles.contest_name}>{contestDetail.name}</h1>
          <h2 className={styles.contest_description}>{contestDetail.description}</h2>
          <h3 className={styles.contest_exp}> 보상: EXP {contestDetail.contestExp}</h3>
        </div>
        <div className={styles.under_box}>
          <div className={styles.contest_rules}>
            <p>규칙 설명</p>
            <ul>
              <li>1. 한 번에 하나의 머신만 플레이할 수 있습니다.</li>
              <li>2. 플레이 중인 머신에는 힌트가 제공됩니다.</li>
              <li>3. 플레이 중인 머신의 플래그를 제출해야 합니다.</li>
              <li>4. 콘테스트 모드를 클리어 하려면 모든 머신을 진행해야 합니다.</li>
              <li>5. 콘테스트 모드는 시간이 지남에 따라 보상이 감소합니다.</li>
              <li>6. 콘테스트 모드는 시간이 끝나면 종료됩니다.</li>
              <li>7. 콘테스트를 클리어 하면 경험치(EXP)를 얻을 수 있습니다.</li>
              <li>8. Good luck!</li>
            </ul>
          </div>
          <button className={styles.contest_start} onClick={handleStartContest}>Start Contest</button>
        </div>
      </div>
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={styles.modal_body}>
          <div className={styles.contest_warning}>
            <h3>* 경고 *</h3>
            <p>
              시작 버튼을 누를 시 즉시 기록이 시작 됩니다.
              <br />
              컨테스트 화면을 떠날 시, 실격 됩니다.
            </p>
          </div>
          <button onClick={handleCloseModal} className={styles.modal_button}>
            시작
          </button>
        </div>
      </Modal>
    </Main>
  );
};

export default PreContestPage;
