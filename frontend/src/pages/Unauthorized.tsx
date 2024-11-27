import React from 'react';
import { Link } from 'react-router-dom';
import UseAnimation from "react-useanimations";
import alertOctagon from "react-useanimations/lib/alertOctagon";

import '../assets/scss/admin/Unauthorized.scss';

const Unauthorized: React.FC = () => {
  return (
    <div className="unauthorized-page">
      <h1>403 - Unauthorized</h1>
      <UseAnimation
        animation={alertOctagon}
        size={200}
        strokeColor={"#fff"}
        fillColor={"var(--primary)"}
      />
      <p>You do not have permission to access this page.</p>
      <button className="unauthorized_button"><Link to="/">Go to Home</Link></button>
    </div>
  );
};

export default Unauthorized; 