'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <section className="relative py-28 md:py-36 px-6 bg-[var(--bg-main)] overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute inset-x-0 top-[-10%] mx-auto w-[700px] h-[700px] bg-gradient-to-tr from-[var(--primary)]/15 to-[var(--secondary)]/15 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] bg-[var(--accent)]/10 rounded-full blur-2xl -z-10" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-24">
        {/* Content */}
        <div className="flex flex-col gap-6 md:gap-8">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.35em] text-xs font-semibold text-[var(--primary)]"
          >
            Our Legacy
          </motion.span>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-[var(--text-main)] leading-tight"
          >
            Where Tradition Meets
            <span className="block text-[var(--primary)]">
              Modern Excellence
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="h-[3px] bg-[var(--accent)] rounded-full"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed max-w-xl"
          >
            Crafted over generations, our chikki celebrates the richness of
            traditional recipes while embracing modern refinement. Every batch
            is made using premium nuts and pure jaggery for an authentic,
            unforgettable taste.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed max-w-xl"
          >
            With zero additives or artificial preservatives, we deliver a clean,
            honest indulgence—crafted for those who value purity, quality, and
            timeless flavor.
          </motion.p>

          <motion.a
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="#"
            className="mt-6 inline-flex items-center justify-center
              bg-[var(--primary)] text-white
              px-10 py-4 rounded-full font-medium tracking-wide
              hover:bg-[var(--secondary)]
              hover:shadow-xl hover:-translate-y-0.5
              transition-all duration-300 w-fit"
          >
            Explore Our Range
          </motion.a>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-[32px] shadow-2xl border border-white/10"
        >
          <video
            src="chikki.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
