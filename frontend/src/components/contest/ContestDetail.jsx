import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Main from '../../components/section/Main'
import { getMachineDetails } from '../../api/axiosInstance';
import '../../assets/scss/contest/ContestDetail.scss';
import emptyStar from '../../assets/img/icon/empty_star.png';
import halfStar from '../../assets/img/icon/half_star.png';
import fullStar from '../../assets/img/icon/full_star.png';


const MachineDetail = () => {
  const { machineName, tabName } = useParams(); // URL에서 name과 tabName 추출
  const [machineData, setMachineData] = useState();
  const navigate = useNavigate();

  // 문제 데이터를 가져오는 useEffect
  useEffect(() => {
    const getMachineData = async () => {
      try {
        const { machine } = await getMachineDetails(machineName); // 백엔드에서 machine 객체 받기
        setMachineData(machine);
      } catch (err) {
        console.error('Error fetching machine details:', err.message || err);
      }
    };

    getMachineData();
  }, [machineName]);

  // 탭 내용이 변경될 때 강제 리렌더링 (탭 이동 시 내용 변경)
  useEffect(() => { }, [tabName]);

  const handleTabClick = (newTabName) => {
    navigate(`/Contest/${machineName}/${newTabName}`); // 경로 변경 (탭 변경 시)
  };

  const renderStars = (repute) => {
    const stars = [];

    // 정수 부분과 소수 부분 구분
    const fullStars = Math.floor(repute);
    const hasHalfStar = repute % 1 !== 0;

    // full stars 추가
    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={`full-${i}`} src={fullStar} alt="Full Star" />);
    }

    // half star 추가
    if (hasHalfStar) {
      stars.push(<img key="half" src={halfStar} alt="Half Star" />);
    }

    // empty stars 추가 (최대 5개)
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<img key={`empty-${i}`} src={emptyStar} alt="Empty Star" />);
    }

    return stars;
  };

  return (
    <Main title={`Machine: ${machineName}`} description="Machine 상세 정보 화면">
      <div className='machine-main'>
        {machineData ? (
          <div className='machine-info'>
            <div className='machine-info-upper'>
              <div className='back-btn-container'>
                <Link to='/Contest'>
                  <button className='back-button'></button>
                </Link>
              </div>
              <div className='info-container'>
                {/* 상단 정보 (이름, 카테고리, EXP, 평점) */}
                <div className='machine-image'></div>
                <div className='name-category'>
                  <p className='machine-name'>{machineData.name}</p>
                  <p className='machine-category'>{machineData.category}</p>
                </div>
                <div className='exp-repute'>
                  <p className='machine-exp'>EXP : {machineData.exp}</p>
                  <div className='repute-star-container'>
                    <div className='star-image'>{renderStars(machineData.repute)}</div>
                    <p className='machine-repute'>Repute : {machineData.repute}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='machine-info-lower'>
              <div className='machine-tabs'>
                {/* 탭 버튼 */}
                <button
                  onClick={() => handleTabClick('')}
                  className={tabName === '' ? 'active' : ''}
                >
                  Basic Info
                </button>
                <button
                  onClick={() => handleTabClick('information')}
                  className={tabName === 'information' ? 'active' : ''}
                >
                  Machine Info
                </button>
                <button
                  onClick={() => handleTabClick('reviews')}
                  className={tabName === 'reviews' ? 'active' : ''}
                >
                  Reviews
                </button>
              </div>
              {/* 탭에 따른 조건부 렌더링 */}
              <div className='detail-info'>
                {tabName === 'information' && (
                  <div>
                    <h2>Machine Information</h2>
                    <p>{machineData.info}</p> {/* 머신의 정보 표시 */}
                  </div>
                )}

                {tabName === 'reviews' && (
                  <div>
                    <h2>Reviews</h2>
                    <ul>
                      {machineData.reviews.map((review, index) => (
                        <li key={index}>{review}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 기본 요약 정보 (탭이 없는 경우, /machine/:machineName 경로에 표시될 정보) */}
                {!tabName && (
                  <div>
                    <h2>Basic Overview</h2>
                    <p>This is a summary of the {machineData.name} machine.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Main >
  );
};

export default MachineDetail;
