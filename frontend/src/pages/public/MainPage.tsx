import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../assets/scss/etc/MainPage.module.scss';
import fullscreenBlack from '../../assets/img/Fullscreen_black.png';
import fullscreen from '../../assets/img/Fullscreen.png';

const images = [
  fullscreenBlack,
  fullscreen,
];

const MainPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPreGlitch, setIsPreGlitch] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleTransition = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      navigate('/tutorial');
    }, 500);
  };

  useEffect(() => {
    // Add keyboard event listener
    const handleKeyPress = () => {
      handleTransition();
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsPreGlitch(true);
      
      setTimeout(() => {
        setIsPreGlitch(false);
        setIsTransitioning(true);
        
        setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
          setIsTransitioning(false);
        }, 500);
      }, 350);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // If we're coming from login, automatically trigger transition after a delay
    if (location.state?.fromLogin) {
      // Wait for 6 seconds (1 full image transition cycle + extra time to see effects)
      setTimeout(() => {
        handleTransition();
      }, 6000);
    }
  }, []);

  const handleClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      navigate('/tutorial');
    }, 500);
  };

  const currentImage = images[currentImageIndex];
  const style = {
    backgroundImage: `url(${currentImage})`,
  };

  return (
    <div 
      className={`
        ${styles.glitch} 
        ${isTransitioning ? styles.transitioning : ''} 
        ${isPreGlitch ? styles.preGlitch : ''} 
        ${isFadingOut ? styles.fadeOut : ''}
      `} 
      ref={containerRef} 
      style={style}
      onClick={handleClick}
    >
      <div className={`${styles.channel} ${styles.r} ${isTransitioning ? styles.active : ''}`}></div>
      <div className={`${styles.channel} ${styles.g} ${isTransitioning ? styles.active : ''}`}></div>
      <div className={`${styles.channel} ${styles.b} ${isTransitioning ? styles.active : ''}`}></div>
      <div className={styles.noise}></div>
    </div>
  );
};

export default MainPage;
