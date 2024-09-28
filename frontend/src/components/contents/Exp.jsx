import React from 'react';

const XP = () => {
  const xpData = {
    level: 1,
    currentXP: 21,
    nextLevelXP: 150,
    dailyXP: 5,
    totalXP: 21,
    earnedXP: 21,
    userRank: 10972,
  };

  const { level, currentXP, nextLevelXP, dailyXP, totalXP, earnedXP, userRank } = xpData;

  return (
    <div className="xp-container">
      <div className="xp-header">
        <h2 className="xp-title">MY EXP</h2>
        <a href="/more/notice/108" target="_blank" className="xp-link">EXP 안내</a>
      </div>
      <div className="xp-level">
        <span>LEVEL {level}</span>
        <span>다음 레벨까지 {nextLevelXP - currentXP} EXP</span>
      </div>
      <div className="xp-bar">
        <div className="xp-bar-inner" style={{ width: `${(currentXP / nextLevelXP) * 100}%` }}>
          {currentXP}/{nextLevelXP} EXP
        </div>
      </div>
      <div className="xp-details">
        <XPDetailItem label="오늘의 EXP" value={`${dailyXP} / 800`} />
        <XPDetailItem label="전체 EXP" value={totalXP} />
        <XPDetailItem label="적립 EXP" value={earnedXP} />
        <XPDetailItem label="순위" value={`${userRank}등`} />
      </div>
    </div>
  );
};

const XPDetailItem = ({ label, value }) => (
  <div className="xp-item">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default XP;
