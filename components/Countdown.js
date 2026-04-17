"use client";

import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const targetDate = new Date('2026-11-24T00:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimerCard = ({ label, value }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="w-20 h-24 md:w-24 md:h-28 bg-forest border-2 border-gold rounded-xl flex items-center justify-center shadow-xl animate-pulse-soft">
        <span className="text-4xl md:text-5xl font-bold font-heading text-white">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-gold font-script text-xl">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-6 py-12">
      <TimerCard label="Days" value={timeLeft.days} />
      <TimerCard label="Hours" value={timeLeft.hours} />
      <TimerCard label="Minutes" value={timeLeft.minutes} />
      <TimerCard label="Seconds" value={timeLeft.seconds} />
    </div>
  );
}
