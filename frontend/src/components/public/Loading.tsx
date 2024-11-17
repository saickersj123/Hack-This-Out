import React from 'react';
import UseAnimation from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import styles from '../../assets/scss/etc/loading.module.scss';

const Loading: React.FC = () => {

  return (
    <div className={styles.loading_overlay}>
      <div className={styles.loading_content}>
        <UseAnimation
          animation={loading2}
          size={100}
          strokeColor={"#fff"}
          fillColor={"var(--primary)"}
        />
      </div>
    </div>
  );
};

export default Loading;