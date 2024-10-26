import React from 'react';

const DisplayReward = ({ reward }) => {
  return (
    <div className="prize-display">
      <h4>Reward: {reward} EXP</h4>
    </div>
  );
};

export default DisplayReward;