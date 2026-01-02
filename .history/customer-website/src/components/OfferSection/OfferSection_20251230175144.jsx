// CrunchyChikkiSection.jsx
'use client';

import React, { useEffect, useState } from 'react';

const OfferSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 95,
    hours: 16,
    minutes: 32,
    seconds: 15,
  });

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        let totalSeconds =
          prev.days * 86400 + prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(countdown);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        const days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <section
      className="relative py-24 md:py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('e2d9deb2-3496-4cce-9921-a6600708eb36.png')`,
        minHeight: '200px',
      }}
    >
      {/* Optional overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Container with spacing */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[var]">CRUNCHY & SWEET</h2>
        <h3 className="text-2xl md:text-4xl font-extrabold text-gray-800 mt-2">CHIKKI</h3>
        <p className="text-gray-700 mt-2 max-w-3xl mx-auto">
          Made with jaggery, nuts, and lots of love. Perfect for a healthy snack!
        </p>

        {/* Countdown */}
        <div className="flex justify-center gap-6 mt-6 text-gray-800 font-semibold flex-wrap">
          <div>
            <span className="text-2xl md:text-3xl">{timeLeft.days}</span>
            <div className="text-sm">DAYS</div>
          </div>
          <div>
            <span className="text-2xl md:text-3xl">{timeLeft.hours}</span>
            <div className="text-sm">HOURS</div>
          </div>
          <div>
            <span className="text-2xl md:text-3xl">{timeLeft.minutes}</span>
            <div className="text-sm">MINUTES</div>
          </div>
          <div>
            <span className="text-2xl md:text-3xl">{timeLeft.seconds}</span>
            <div className="text-sm">SECONDS</div>
          </div>
        </div>

        {/* Order Button */}
        <button className="mt-6 px-8 py-3 bg-yellow-600 text-white font-bold rounded hover:bg-yellow-700 transition">
          ORDER NOW
        </button>
      </div>
    </section>
  );
};

export default OfferSection;
