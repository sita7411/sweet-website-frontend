'use client';

import React, { useEffect, useState } from 'react';

const OfferSectionMobile = () => {
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
      className="relative md:hidden bg-cover bg-center bg-no-repeat py-14"
      style={{ backgroundImage: `url('chikki_banner_offer.png')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#fffaf3]/30"></div>

      <div className="relative z-10 px-4 text-center">

        {/* Badge */}
        <img
          src="/offer_tag.png"
          alt="Price ₹199"
          className="mx-auto mb-4 w-[180px] rotate-[4deg]"
        />

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-[#d99a2b]">
          CRUNCHY & SWEET
        </h2>

        <div className="w-20 h-[2px] bg-[#d99a2b] mx-auto my-3"></div>

        <h3 className="text-2xl font-bold text-[#3a2416]">
          CHIKKI
        </h3>

        {/* Text */}
        <p className="mt-3 text-sm text-[#6b4b3a] leading-relaxed">
          Made with jaggery, nuts, and lots of love.  
          Perfect for a healthy snack!
        </p>

        {/* Countdown */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-[#3a2416]">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map(item => (
            <div
              key={item.label}
              className="bg-white/70 rounded-lg py-3 shadow"
            >
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-xs tracking-widest mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="mt-8 w-full py-3 rounded-md bg-[#5a2d14] text-white font-bold tracking-wide hover:bg-[#3a1b0d] transition">
          ORDER NOW
        </button>

      </div>
    </section>
  );
};

export default OfferSectionMobile;
