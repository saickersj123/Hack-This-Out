import React from "react";
import { Image } from "./image";
import styles from '../../assets/scss/landing/gallery.module.scss';
import LoadingIcon from "../public/LoadingIcon";

// 각 gallery 항목의 타입 정의
interface GalleryItem {
  title: string;
  largeImage: string;
  smallImage: string;
}

// props의 data 타입 정의
interface GalleryProps {
  data: GalleryItem[] | null;
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  return (
    <div id="portfolio" className={styles.textCenter}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>Gallery</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.
          </p>
        </div>
        <div className="row">
          <div className={styles.portfolioItems}>
            {data ? (
              data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                  <div className={styles.portfolioItem}>
                    <Image
                      title={d.title}
                      largeImage={d.largeImage}
                      smallImage={d.smallImage}
                    />
                  </div>
                </div>
              ))
            ) : (
              <LoadingIcon />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
