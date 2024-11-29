import React, { useState, useEffect } from "react";
import Navigation from "../../components/landing/navigation";
import { Header } from "../../components/landing/header";
import { Features } from "../../components/landing/features";
import { About } from "../../components/landing/about";
import { Services } from "../../components/landing/services";
// import { Gallery } from "../../components/landing/gallery";
// import { Testimonials } from "../../components/landing/testimonials";
import { Team } from "../../components/landing/team";
import { Contact } from "../../components/landing/contact";
import { landingPageData } from "../../data/landingPageData"; // TSX 데이터 임포트
import LoadingIcon from "../../components/public/LoadingIcon";
const LandingPage: React.FC = () => {
  const [data, setData] = useState(landingPageData);

  useEffect(() => {
    // fetch data from backend. but now, it's just static data.
    if (!data) {
      setData(landingPageData);
    }
  }, [data]);

  if (!data) return <div><LoadingIcon /></div>;

  return (
    <div
      id="scroll-container"
      style={{
        overflowY: "scroll",
        height: "100vh",
        scrollBehavior: "smooth",
        scrollbarWidth: "none"
      }}
    >
      <div className="landingpage">
        <Navigation />
        <Header data={data.Header} />
        <div id="features">
          <Features data={data.Features} />
        </div>
        <div id="about">
          <About data={data.About} />
        </div>
        <div id="services">
          <Services data={data.Services} />
        </div>
        {/* Uncomment if needed */}
        {/* 
      <div id="gallery" className={styles.gallery}>
        <Gallery data={data.Gallery} />
      </div>
      <div id="testimonials" className={styles.testimonials}> 
        <Testimonials data={data.Testimonials} />
      </div>
      */}
        <div id="team">
          <Team data={data.Team} />
        </div>
        <div>
          <Contact data={data.Contact} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
