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
      className="relative bg-cover bg-center bg-no-repeat py-16 md:py-0"
      style={{ backgroundImage: `url('chikki_banner_offer.png')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#fffaf3]/30"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-6 text-[#d99a2b] tracking-wide">
          CRUNCHY & SWEET
        </h2>

        <div className="w-20 md:w-24 h-[2px] bg-[#d99a2b] mx-auto my-4"></div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3a2416]">
          CHIKKI
        </h3>

        <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[#6b4b3a] leading-relaxed">
          Made with jaggery, nuts, and lots of love. <br className="hidden sm:block" />
          Perfect for a healthy snack!
        </p>

        {/* Divider */}
        <div className="max-w-md mx-auto my-5 h-px bg-gradient-to-r from-transparent via-[#d8cfc4] to-transparent"></div>

        {/* Countdown – Single Line */}
        <div className="mt-6 flex justify-center items-center gap-3 sm:gap-6 text-[#3a2416] font-semibold flex-nowrap overflow-x-auto">

          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MIN', value: timeLeft.minutes },
            { label: 'SEC', value: timeLeft.seconds },
          ].map(item => (
            <div
              key={item.label}
              className="flex flex-col items-center bg-white/70 backdrop-blur rounded-lg px-4 py-3 min-w-[70px] sm:min-w-[80px]"
            >
              <div className="text-2xl sm:text-3xl font-bold">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs tracking-widest mt-1">
                {item.label}
              </div>
            </div>
          ))}

        </div>

        <div className="max-w-md mx-auto my-6 h-px bg-gradient-to-r from-transparent via-[#d8cfc4] to-transparent"></div>

        {/* Button */}
        <button className="mt-6 sm:mt-8 px-8 sm:px-10 py-3 rounded-md bg-[#5a2d14] text-white font-bold tracking-wide hover:bg-[#3a1b0d] transition">
          ORDER NOW
        </button>

        {/* Price Badge */}
        <img
          src="/offer_tag.png"
          alt="Price ₹199"
          className="
            absolute 
            top-4 right-4
            sm:top-6 sm:right-6
            md:-top-6 md:right-10
            w-[140px] sm:w-[180px] md:w-[230px]
            rotate-[6deg]
            drop-shadow-xl
          "
        />

      </div>
    </section>
  );
};

export default OfferSection;
