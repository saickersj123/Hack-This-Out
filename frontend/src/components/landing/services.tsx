import React from "react";
import '../../assets/scss/landing/services.scss';

// 데이터 항목 타입 정의
interface Service {
  name: string;
  icon: React.ReactNode;
  text: string;
}

// props 타입 정의
interface ServicesProps {
  data?: Service[];  // 데이터는 배열일 수도 있고 없을 수도 있음
}

export const Services: React.FC<ServicesProps> = ({ data }) => {
  return (
    <div className="services">
      <div className="service-container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div className="row">
          {data ? (
            // 데이터가 존재하면 각 항목을 매핑하여 출력
            data.map((d, i) => (
              <div key={`${d.name}-${i}`} className="col-md-4">
                <div className="service-data">
                  <div className="service-icon">{d.icon}</div>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // 데이터가 없으면 "Loading..." 표시
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};
