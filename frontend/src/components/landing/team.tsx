import React from "react";
import '../../assets/scss/landing/team.scss';
import LoadingIcon from "../public/LoadingIcon";

// 팀 멤버 항목의 타입 정의
interface TeamMember {
  name: string;
  img: string;
  job: string;
}

// props 타입 정의
interface TeamProps {
  data?: TeamMember[];  // data는 배열일 수도 있고 없을 수도 있음
}

export const Team: React.FC<TeamProps> = ({ data }) => {
  return (
    <div className="team">
      <div className="team-container">
        <div className="section-title">
          <h2>Meet the Team</h2>
          <p>
            We are a team of passionate developers and cyber security enthusiasts.
          </p>
        </div>
        <div id="row">
          {data
            ? data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : <LoadingIcon />}
        </div>
      </div>
    </div>
  );
};
