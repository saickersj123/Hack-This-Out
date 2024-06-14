import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slides from "../../data/banner.js"; 

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Banner = () => {
  return (
    <div className='banner' style={{ fontSize: '32px' }}>
      <div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          className="home-banner"
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img className="home-img" src={slide.imageUrl} alt={slide.altText} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Banner;
