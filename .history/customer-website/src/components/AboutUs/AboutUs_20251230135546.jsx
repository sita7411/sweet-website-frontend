'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <section className="relative py-36 px-6 bg-[var(--bg-main)] overflow-hidden">

      {/* Ambient Background */}
      <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-gradient-to-tr from-[var(--accent)]/20 to-[var(--primary)]/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[460px] h-[460px] bg-[var(--accent)]/15 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-20 lg:gap-28">

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="flex flex-col max-w-xl"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.4em] text-xs font-semibold text-[var(--primary)] mb-5"
          >
            Our Legacy
          </motion.span>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[42px] md:text-5xl font-bold text-[var(--text-main)] leading-tight"
          >
            Rooted in Tradition,
            <br />
            <span className="text-[var(--primary)]">
              Crafted for the Modern Taste
            </span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="w-24 h-[3px] bg-[var(--accent)] rounded-full my-8"
          />

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed mb-6"
          >
            Our chikki is a celebration of heritage — where generations of
            craftsmanship blend seamlessly with refined modern techniques.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed"
          >
            Crafted using premium nuts and pure jaggery, free from additives,
            each bite delivers authenticity, warmth, and indulgence.
          </motion.p>

          {/* CTA */}
          <motion.a
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            href="#"
            className="group relative mt-12 inline-flex items-center gap-3
              bg-[var(--accent)] text-[var(--text-main)]
              px-14 py-4 rounded-full font-semibold tracking-wide
              shadow-[0_10px_30px_rgba(242,183,5,0.35)]
              overflow-hidden
              hover:shadow-[0_18px_40px_rgba(242,183,5,0.55)]
              transition-all duration-300 w-fit"
          >
            {/* Glow Animation */}
            <span className="absolute inset-0 bg-white/30 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />

            <span className="relative z-10">
              Discover Our Collection
            </span>

            <motion.span
              className="relative z-10 text-xl"
              initial={{ x: 0 }}
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative w-full h-[420px] md:h-[520px]"
        >
          <div
            className="relative w-full h-full overflow-hidden
            rounded-[38%_62%_45%_55%/55%_45%_55%_45%]
            shadow-2xl border border-white/10"
          >
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-[1.05]"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/15" />
          </div>

          <div className="absolute -bottom-14 -right-14 w-48 h-48 bg-[var(--accent)]/25 rounded-full blur-3xl -z-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;
