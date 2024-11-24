import React, { useEffect, useState } from 'react';

interface TimerProps {
  endTime: Date;
}

const Timer: React.FC<TimerProps> = ({ endTime }) => {
  const calculateTimeLeft = (): Record<string, number> => {
    const difference = endTime.getTime() - new Date().getTime();
    let timeLeft: Record<string, number> = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Record<string, number>>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.keys(newTimeLeft).length === 0) {
        clearInterval(timer);
      }
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [endTime]);

  const timerComponents: JSX.Element[] = [];

  Object.entries(timeLeft).forEach(([interval, value]) => {
    timerComponents.push(
      <span key={interval} className="timer-segment">
        {value.toString().padStart(2, '0')} {interval}{' '}
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

