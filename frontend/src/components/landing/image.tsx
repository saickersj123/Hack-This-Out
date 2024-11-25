import React from "react";

// props의 타입 정의
interface ImageProps {
  title: string;
  largeImage: string;
  smallImage: string;
}

export const Image: React.FC<ImageProps> = ({ title, largeImage, smallImage }) => {
  return (
    <div className="portfolio-item">
      <div className="hover-bg">
        <a href={largeImage} title={title} data-lightbox-gallery="gallery1">
          <div className="hover-text">
            <h4>{title}</h4>
          </div>
          <img src={smallImage} className="img-responsive" alt={title} />
        </a>
      </div>
    </div>
  );
};
