import React from 'react';

/**
 * Props interface for DisplayReward component.
 */
interface DisplayRewardProps {
  reward: number;
}

/**
 * Component to display the user's reward.
 */
const DisplayReward: React.FC<DisplayRewardProps> = ({ reward }) => {
  return (
    <div className="reward-display">
      <h4>Reward: {reward} EXP</h4>
    </div>
  );
};

export default DisplayReward;