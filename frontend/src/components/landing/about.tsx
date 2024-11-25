import React from "react";
import '../../assets/scss/landing/about.scss';
import { GrFormCheckmark } from "react-icons/gr";

// data의 타입을 정의
interface AboutProps {
  data: {
    paragraph: string;
    Why: string[];
    Why2: string[];
  }
}

export const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <div className="about">
      <div className="about-container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img src="img/about.jpg" className="img-responsive" alt="" />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>{data ? data.paragraph : "loading..."}</p>
              <h3>Why Choose Us?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {data
                      ? data.Why.map((d, i) => (
                        <div className="list-text">
                          <GrFormCheckmark color="blue"/>
                          <li key={`${d}-${i}`}>{d}</li>
                        </div>
                      ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {data
                      ? data.Why2.map((d, i) => (
                        <div className="list-text">
                          <GrFormCheckmark color="blue"/>
                          <li key={`${d}-${i}`}>{d}</li>
                        </div>
                      ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
