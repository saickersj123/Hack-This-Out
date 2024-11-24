import React from 'react';
import styles from '../../assets/scss/etc/loading.module.scss';

const Loading: React.FC = () => {

  return (
    <div className={styles.glitch}>
      <div className={styles.channel_r}></div>
      <div className={styles.channel_g}></div>
      <div className={styles.channel_b}></div>
    </div>
  );  
};

export default Loading;