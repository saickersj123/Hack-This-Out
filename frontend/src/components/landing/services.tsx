import React from "react";
import '../../assets/scss/landing/services.scss';
import LoadingIcon from "../public/LoadingIcon";

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
            <br />
            People say that cybersecurity is hard to learn and boring.
            <br />
            But we believe that cybersecurity can be fun and interesting.
            <br />
            So we created a Hacking Lab for you to practice and learn in a fun and interesting way.
            <br />
            We used a lot of technologies to make this possible.
            <br />
            Let's see what we used.
          </p>
        </div>
        <div className="row">
          {data ? (
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
            <LoadingIcon />
          )}
        </div>
      </div>
    </div>
  );
};
