'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <section className="relative py-32 px-6 bg-[var(--bg-main)] overflow-hidden">

      {/* Ambient Background */}
      <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[680px] h-[680px] bg-[var(--accent)]/18 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[440px] h-[440px] bg-[var(--accent)]/12 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-18 lg:gap-26">

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.14 }}
          className="flex flex-col max-w-xl"
        >

          {/* Rounded Pill */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="w-fit mb-6"
          >
            <span className="inline-flex items-center gap-2
              px-5 py-2 rounded-full
              bg-[var(--accent)]/15
              text-[11px] font-semibold tracking-[0.35em]
              text-[var(--primary)]
              border border-[var(--accent)]/30"
            >
              OUR LEGACY
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[40px] md:text-5xl font-bold text-[var(--text-main)] leading-[1.15]"
          >
            Rooted in Tradition,
            <br />
            <span className="relative inline-block text-[var(--primary)]">
              Crafted for the Modern Taste
              <span className="absolute left-0 -bottom-2 w-full h-[5px] bg-[var(--accent)]/70 rounded-full -z-10" />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.65 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed mt-8"
          >
            Our chikki is a celebration of heritage — where generations of
            craftsmanship meet refined modern techniques.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.65 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed mt-4"
          >
            Made using premium nuts and pure jaggery, free from additives,
            each bite delivers warmth, balance, and authenticity.
          </motion.p>

          {/* CTA */}
          <motion.a
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            href="#"
            className="group mt-10 inline-flex items-center gap-4 w-fit
              px-12 py-4 rounded-full
              bg-[var(--accent)]
              text-[var(--text-main)]
              font-semibold tracking-wide
              shadow-[0_10px_28px_rgba(242,183,5,0.35)]
              hover:shadow-[0_16px_38px_rgba(242,183,5,0.55)]
              transition-all duration-300"
          >
            <span>Discover Our Collection</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </motion.a>
        </motion.div>

        {/* Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative w-full h-[400px] md:h-[500px]"
        >
          <div
            className="relative w-full h-full overflow-hidden
            rounded-[40%_60%_46%_54%/56%_44%_56%_44%]
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

          <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-[var(--accent)]/22 rounded-full blur-3xl -z-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;
