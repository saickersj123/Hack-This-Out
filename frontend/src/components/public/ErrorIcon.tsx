import Box from '@mui/material/Box';
import React from 'react';
import UseAnimation from "react-useanimations";
import alertTriangle from "react-useanimations/lib/alertTriangle";

const ErrorIcon: React.FC = () => {

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}>
      <UseAnimation
        animation={alertTriangle}
        size={50}
        strokeColor={"#fff"}
        fillColor={"var(--primary)"}
      />
    </Box>
  );
};

export default ErrorIcon;