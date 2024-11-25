import React from "react";
import '../../assets/scss/landing/team.scss';

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div id="row">
          {data
            ? data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    <img src={d.img} alt={d.name} className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
