import React from 'react';
import UseAnimation from "react-useanimations";
import alertCircle from "react-useanimations/lib/alertOctagon";
import styles from '../../assets/scss/etc/notfound.module.scss';
import { Button } from '@mui/material';
import { useNavigate, NavigateFunction } from 'react-router-dom';
const NotFound: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div className={styles.notfound_overlay}>
        <div className={styles.notfound_content}>
            <div className={styles.notfound_title}>
                404 - Not Found
            </div>
            <UseAnimation animation={alertCircle} size={200} strokeColor="#fff"/>
            <p>The page you are looking for does not exist.</p>
            <Button 
                variant="contained" 
                color="primary"
                className={styles.notfound_content_button}
                onClick={() => navigate('/')}
            >Go Home</Button>
        </div>
    </div>
  );
};

export default NotFound;