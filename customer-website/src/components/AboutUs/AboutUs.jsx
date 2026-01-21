'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <section className="relative py-22 mt-16 px-6 bg-[var(--bg-main)] overflow-hidden">

      {/* Soft Ambient Background */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[640px] h-[640px] bg-gradient-to-tr from-[var(--primary)]/14 to-[var(--accent)]/16 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[420px] h-[420px] bg-[var(--accent)]/12 rounded-full blur-[110px] -z-10" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:gap-24">

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.14 }}
          className="flex flex-col max-w-xl"
        >
          {/* Pill */}
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit px-5 py-2 rounded-full
              bg-[var(--primary)]/10
              text-[11px] font-semibold tracking-[0.35em]
              text-[var(--primary)] mb-5"
          >
            OUR LEGACY
          </motion.span>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[40px] md:text-5xl font-bold text-[var(--text-main)] leading-[1.12]"
          >
            Rooted in Tradition,
            <br />
            <span className="relative inline-block text-[var(--primary)]">
              Crafted for Today
              <span className="absolute left-0 -bottom-2 w-full h-[5px] bg-[var(--accent)]/70 rounded-full -z-10" />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.65 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed mt-7"
          >
            Our chikkis celebrates generations of craftsmanship — where
            time-honored recipes meet refined modern techniques.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.65 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed mt-4"
          >
            Made with premium nuts and pure jaggery, free from additives,
            every bite delivers warmth, balance, and authenticity.
          </motion.p>

          {/* Button */}
          <motion.button
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="
              mt-10
              bg-[var(--accent)]
              text-[var(--secondary)]
              px-10 py-4
              rounded-full
              font-semibold tracking-wide
              shadow-[0_12px_30px_rgba(0,0,0,0.18)]
              hover:brightness-105
              transition
              w-fit
            "
          >
            Explore Our Chikki
          </motion.button>
        </motion.div>

        {/* Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative w-full h-[400px] md:h-[500px]"
        >
          <div
            className="relative w-full h-full overflow-hidden
            rounded-[38%_62%_46%_54%/55%_45%_55%_45%]
            shadow-xl border border-white/10"
          >
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-black/12" />
          </div>

          <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-[var(--primary)]/18 rounded-full blur-3xl -z-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;
