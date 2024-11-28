import React, { useEffect, useRef, useState } from 'react';
import styles from '../../assets/scss/etc/loading.module.scss';
import fullscreenBlack from '../../assets/img/Fullscreen_black.png';
import fullscreen from '../../assets/img/Fullscreen.png';

const images = [
  fullscreenBlack,
  fullscreen,
];

const Loading: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPreGlitch, setIsPreGlitch] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Start pre-glitch effect
      setIsPreGlitch(true);
      
      // Start main transition after pre-glitch
      setTimeout(() => {
        setIsPreGlitch(false);
        setIsTransitioning(true);
        
        // Update image after transition starts
        setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
          setIsTransitioning(false);
        }, 500);
      }, 350); // Pre-glitch duration
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const currentImage = images[currentImageIndex];
  const style = {
    backgroundImage: `url(${currentImage})`,
  };

  return (
    <div 
      className={`${styles.glitch} ${isTransitioning ? styles.transitioning : ''} ${isPreGlitch ? styles.preGlitch : ''}`} 
      ref={containerRef} 
      style={style}
    >
      <div className={`${styles.channel} ${styles.r} ${isTransitioning ? styles.active : ''}`}></div>
      <div className={`${styles.channel} ${styles.g} ${isTransitioning ? styles.active : ''}`}></div>
      <div className={`${styles.channel} ${styles.b} ${isTransitioning ? styles.active : ''}`}></div>
      <div className={styles.noise}></div>
    </div>
  );
};

export default Loading;