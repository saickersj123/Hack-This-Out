import React from 'react';

const PrizeDisplay = ({ prize }) => {
  return (
    <div className="prize-display">
      <h4>Prize: {prize} EXP</h4>
    </div>
  );
};

export default PrizeDisplay;