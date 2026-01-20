import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

  // Framer Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-10"
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
        <motion.div
          className="sm:hidden h-[470px] flex flex-col justify-between px-4 py-6 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <motion.div className="text-center" variants={fadeUp}>
            <h2 className="text-4xl -mt-9 font-extrabold text-[#d99a2b] tracking-wide">
              STRAWBERRY CHOCOLATE CHIKKI
            </h2>
            <div className="w-16 h-[2px] bg-[#d99a2b] mx-auto my-5"></div>
            <p className="mt-2 text-sm text-[#6b4b3a] leading-relaxed">
              Made with jaggery, nuts, and lots of love. Perfect for a healthy snack!
            </p>
          </motion.div>

          <motion.div className="text-center" variants={fadeUp}>
            <div className="flex justify-center items-center mt-40 mb-4 gap-2 text-[#3a2416]">
              {[
                { label: 'D', value: timeLeft.days },
                { label: 'H', value: timeLeft.hours },
                { label: 'M', value: timeLeft.minutes },
                { label: 'S', value: timeLeft.seconds },
              ].map((item, index) => (
                <React.Fragment key={item.label}>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{item.value}</div>
                    <div className="text-[11px] tracking-widest opacity-70">{item.label}</div>
                  </div>
                  {index !== 3 && (
                    <div className="text-[#3a2416] text-lg font-light opacity-40 mx-1">|</div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <motion.button
              className="px-6 py-2.5 bg-[#5a2d14] text-white text-sm font-bold rounded-md w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ORDER NOW
            </motion.button>
          </motion.div>

          {/* Mobile Price Tag */}
          <motion.img
            src="/offer_tag.png"
            alt="Price ₹199"
            className="absolute top-15 -right-4 w-[150px] sm:hidden rotate-[6deg] drop-shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* ================= DESKTOP VIEW ================= */}
        <motion.div
          className="hidden sm:block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <motion.h2
            className="text-3xl md:text-3xl font-extrabold mt-9 text-[#d99a2b] tracking-wide"
            variants={fadeUp}
          >
            STRAWBERRY CHOCOLATE CHIKKI
          </motion.h2>

          <div className="w-24 h-[2px] bg-[#d99a2b] mx-auto my-4"></div>

        

          <motion.p className="mt-4 max-w-xl mx-auto text-base text-[#6b4b3a] leading-relaxed" variants={fadeUp}>
            Made with jaggery, nuts, and lots of love. <br />
            Perfect for a healthy snack!
          </motion.p>

          <div className="max-w-md mx-auto my-5 -mb-4 h-px bg-gradient-to-r from-transparent via-[#d8cfc4] to-transparent"></div>

          <motion.div className="mt-8 flex justify-center items-center gap-6 text-[#3a2416] font-semibold" variants={fadeUp}>
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
                {index !== 3 && <div className="text-xl font-light opacity-40">|</div>}
              </React.Fragment>
            ))}
          </motion.div>

          <div className="max-w-md mx-auto my-5 h-px bg-gradient-to-r from-transparent via-[#d8cfc4] to-transparent"></div>

          <motion.button
            className="mt-2 mb-10 px-10 py-3 bg-[#5a2d14] text-white text-base font-bold rounded-md hover:bg-[#3a1b0d] transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ORDER NOW
          </motion.button>
        </motion.div>

        {/* Desktop Price Tag with infinite float */}
        <motion.img
          src="/offer_tag.png"
          alt="Price ₹199"
          className="absolute top-3 right-3 w-[250px] rotate-[6deg] drop-shadow-lg hidden sm:block"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
};

export default OfferSection;
