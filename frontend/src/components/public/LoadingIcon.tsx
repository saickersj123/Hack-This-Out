import Box from '@mui/material/Box';
import React from 'react';
import UseAnimation from "react-useanimations";
import loading from "react-useanimations/lib/loading2";

const LoadingIcon: React.FC = () => {

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}>
      <UseAnimation
        animation={loading}
        size={50}
        strokeColor={"#fff"}
        fillColor={"var(--primary)"}
      />
    </Box>
  );
};

export default LoadingIcon;