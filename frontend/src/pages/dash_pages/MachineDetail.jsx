import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Main from '../../components/section/Main'
import { getMachine } from '../../api/axiosInstance';
import '../../css/MachineDetail.scss';

const MachineDetail = () => {
  const { machineName, tabName } = useParams();
  const [machineData, setMachineData] = useState();
  const navigate = useNavigate();

  // 문제 데이터를 가져오는 useEffect
  useEffect(() => {
    const getMachineData = async () => {
      try {
        const data = await getMachine(machineName);
        setMachineData(data);
      } catch (err) {
        console.error('Error fetching challenges:', err.message || err);
      }
    };

    getMachineData();
  }, [machineName]);

  // 탭 내용이 변경될 때 강제 리렌더링 (탭 이동 시 내용 변경)
  useEffect(() => { }, [tabName]);

  const handleTabClick = (newTabName) => {
    navigate(`/machine/${machineName}/${newTabName}`); // 경로 변경 (탭 변경 시)
  };

  return (
    <Main title={`Machine: ${machineName}`} description="Machine 상세 정보 화면">
      <div className='machine-main'>
        {machineData ? (
          <div className='machine-info'>
            <div className='machine-info-upper'>
              <div className='back-btn-container'>
                <Link to='/machine'>
                  <button className='back-button'></button>
                </Link>
              </div>
              <div className='info-container'>
                {/* 상단 정보 (이름, 카테고리, EXP, 평점) */}
                <div className='machine-image'></div>
                <div className='name-category'>
                  <p className='machine-name'>{machineData.data.name}</p>
                  <p className='machine-category'>{machineData.data.category}</p>
                </div>
                <div className='exp-repute'>
                  <p className='machine-exp'>EXP: {machineData.data.exp}</p>
                  <p className='machine-repute'>Repute: {machineData.data.repute}</p>
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
              {tabName === 'information' && (
                <div>
                  <h2>Machine Information</h2>
                  <p>{machineData.data.info}</p> {/* 머신의 정보 표시 */}
                </div>
              )}

              {tabName === 'reviews' && (
                <div>
                  <h2>Reviews</h2>
                  <ul>
                    {machineData.data.reviews.map((review, index) => (
                      <li key={index}>{review}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 기본 요약 정보 (탭이 없는 경우, /machine/:machineName 경로에 표시될 정보) */}
              {!tabName && (
                <div>
                  <h2>Basic Overview</h2>
                  <p>This is a summary of the {machineName} machine.</p>
                </div>
              )}
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
