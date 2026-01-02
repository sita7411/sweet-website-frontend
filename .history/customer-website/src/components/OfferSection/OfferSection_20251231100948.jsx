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
      className="relative bg-cover bg-center bg-no-repeat py-30"
      style={{ backgroundImage: `url('chikki_offer_banner_mobile.png')` }}
    >
      {/* Desktop BG */}
      <div
        className="hidden sm:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('chikki_banner_offer.png')` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#fffaf3]/30"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">

        {/* ================= MOBILE VIEW ================= */}
        <div className="sm:hidden h-[380px] flex flex-col justify-between px-4 py-6 relative">

          {/* Top heading */}
          <div className="text-center">
            <h2 className="text-3xl -mt-22 font-extrabold text-[#d99a2b] tracking-wide">
              CRUNCHY & SWEET
            </h2>
            <div className="w-16 h-[2px] bg-[#d99a2b] mx-auto my-2"></div>
            <h3 className="text-lg font-extrabold text-[#3a2416]">CHIKKI</h3>
            <p className="mt-2 text-sm text-[#6b4b3a] leading-relaxed">
              Made with jaggery, nuts, and lots of love. Perfect for a healthy snack!
            </p>

            {/* Price badge */}
            <img
              src="/offer_tag.png"
              className="absolute top-4 right-4 w-[110px] rotate-[6deg]"
              alt="₹199"
            />
          </div>

          

          {/* Bottom countdown & button */}
          <div className="text-center">
            <div className="grid mt-69 grid-cols-4 gap-3 text-[#3a2416] mb-4">
              {[
                { label: 'D', value: timeLeft.days },
                { label: 'H', value: timeLeft.hours },
                { label: 'M', value: timeLeft.minutes },
                { label: 'S', value: timeLeft.seconds },
              ].map(item => (
                <div key={item.label}>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-[11px] tracking-widest opacity-70">{item.label}</div>
                </div>
              ))}
            </div>

            <button className="px-6 py-2.5 bg-[#5a2d14] text-white text-sm font-bold rounded-md w-full">
              ORDER NOW
            </button>
          </div>
        </div>

        {/* ================= DESKTOP VIEW ================= */}
        <div className="hidden sm:block">

          <h2 className="text-4xl md:text-5xl font-extrabold mt-9 text-[#d99a2b] tracking-wide">
            CRUNCHY & SWEET
          </h2>

          <div className="w-24 h-[2px] bg-[#d99a2b] mx-auto my-4"></div>

          <h3 className="text-3xl md:text-4xl font-extrabold text-[#3a2416]">
            CHIKKI
          </h3>

          <p className="mt-4 max-w-xl mx-auto text-base text-[#6b4b3a] leading-relaxed">
            Made with jaggery, nuts, and lots of love. <br />
            Perfect for a healthy snack!
          </p>

          <div className="max-w-md mx-auto my-5 h-px bg-gradient-to-r from-transparent via-[#d8cfc4] to-transparent"></div>

          {/* Desktop Countdown */}
          <div className="mt-8 flex justify-center items-center gap-6 text-[#3a2416] font-semibold">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds },
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                <div className="text-center min-w-[70px]">
                  <div className="text-3xl font-bold">{item.value}</div>
                  <div className="text-xs tracking-widest mt-1">
                    {item.label}
                  </div>
                </div>
                {index !== 3 && (
                  <div className="text-xl font-light opacity-40">|</div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="max-w-md mx-auto my-5 h-px bg-gradient-to-r from-transparent via-[#d8cfc4] to-transparent"></div>

          <button className="mt-10 px-10 py-3 bg-[#5a2d14] text-white text-base font-bold rounded-md hover:bg-[#3a1b0d] transition">
            ORDER NOW
          </button>
        </div>

        {/* Price Tag */}
        <img
          src="/offer_tag.png"
          alt="Price ₹199"
          className="absolute top-3 right-3 sm:-top-5 sm:right-10 w-[140px] sm:w-[250px] rotate-[6deg] drop-shadow-lg"
        />
      </div>
    </section>
  );
};

export default OfferSection;
