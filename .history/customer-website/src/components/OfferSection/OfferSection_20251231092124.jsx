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
          prev.days * 86400 +
          prev.hours * 3600 +
          prev.minutes * 60 +
          prev.seconds - 1;

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
      className="relative bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: `url('chikki_banner_offer.png')` }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-[#fffaf3]/20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mt-9 text-[#d99a2b] tracking-wide">
          CRUNCHY & SWEET
        </h2>

        {/* Divider */}
        <div className="w-24 h-[2px] bg-[#d99a2b] mx-auto my-4"></div>

        <h3 className="text-3xl md:text-4xl font-extrabold text-[#3a2416]">
          CHIKKI
        </h3>

        {/* Sub text */}
        <p className="mt-4 max-w-xl mx-auto text-[#6b4b3a] leading-relaxed">
          Made with jaggery, nuts, and lots of love. <br />
          Perfect for a healthy snack!
        </p>

        <div className="w-120 mx-auto my-4 -mb-5 h-px bg-gradient-to-r from-transparent via-[#d8cfc4] to-transparent"></div>

        {/* Countdown */}
        <div className="mt-8 flex justify-center items-center gap-4 text-[#3a2416] font-semibold">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item, index) => (
            <React.Fragment key={item.label}>
              <div className="text-center min-w-[70px]">
                <div className="text-3xl font-bold">{item.value}</div>
                <div className="text-xs tracking-widest mt-1">{item.label}</div>
              </div>

              {index !== 3 && (
                <div className="text-xl font-light opacity-40">|</div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="w-120 mx-auto my-4 h-px bg-gradient-to-r from-transparent via-[#d8cfc4] to-transparent"></div>

        {/* Button */}
        <button className="mt-10 px-10 py-3 rounded-md bg-[#5a2d14] text-white font-bold tracking-wide hover:bg-[#3a1b0d] transition">
          ORDER NOW
        </button>

        {/* Price Badge */}
        {/* Price Image */}
        <img
          src="/price-tag.png"   // <-- apni image ka path
          alt="Price ₹199"
          className="absolute top-10 right-10 w-28 md:w-32 rotate-[-10deg] drop-shadow-lg"
        />

      </div>
    </section>
  );
};

export default OfferSection;
