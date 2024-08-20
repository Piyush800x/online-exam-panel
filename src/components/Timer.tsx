import React, { useEffect, useState } from 'react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Timer({ time }: { time: string }) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = endTime - new Date().getTime();
    let timeLeft: TimeLeft = { hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [endTime] = useState(new Date().getTime() + Number(time) * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval as keyof TimeLeft]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg cursor-not-allowed">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}