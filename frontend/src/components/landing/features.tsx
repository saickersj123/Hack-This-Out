import React from "react";
import '../../assets/scss/landing/features.scss';
import LoadingIcon from "../public/LoadingIcon";

// 타입 정의
type FeatureProps = {
  data: {
    icon: React.ReactNode;
    title: string;
    text: string;
  }[]; // 배열로 전달되는 Features 데이터
};

export const Features: React.FC<FeatureProps> = ({ data }) => {
  return (
    <div className="features">
      <div className="features-container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>
        <div className="row">
          {data && data.length > 0 ? (
            data.map((d, i) => (
              <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                <div className="features-data">
                  <div className="features-icon">{d.icon}</div>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
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
