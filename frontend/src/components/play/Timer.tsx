import React, { useEffect, useState } from 'react';

interface TimerProps {
  endTime: string;
}

const Timer: React.FC<TimerProps> = ({ endTime }) => {
  const calculateTimeLeft = (): Record<string, number> => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft: Record<string, number> = {};

    if (difference > 0) {
      timeLeft = {
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Record<string, number>>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup
    return () => clearTimeout(timer);
  }, [endTime]);

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="timer">
      {timerComponents.length ? timerComponents : <span>Contest Ended</span>}
    </div>
  );
};

export default Timer;

