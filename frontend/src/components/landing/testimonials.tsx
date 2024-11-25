import React from "react";

// 테스트몬셜 항목의 타입 정의
interface Testimonial {
  name: string;
  img: string;
  text: string;
}

// props 타입 정의
interface TestimonialsProps {
  data?: Testimonial[];  // data는 배열일 수도 있고 없을 수도 있음
}

export const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>
        <div className="row">
          {data
            ? data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="testimonial">
                    <div className="testimonial-image">
                      <img src={d.img} alt={d.name} />
                    </div>
                    <div className="testimonial-content">
                      <p>"{d.text}"</p>
                      <div className="testimonial-meta"> - {d.name} </div>
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
