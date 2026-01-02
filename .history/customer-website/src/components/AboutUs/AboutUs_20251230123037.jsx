'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="relative py-32 px-6 bg-[var(--bg-main)] overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full blur-2xl -z-10" />

      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24">
        {/* Right – Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.4em] text-sm font-semibold text-[var(--primary)]"
          >
            Our Legacy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-[var(--text-main)] leading-snug"
          >
            From Tradition <br />
            <span className="text-[var(--primary)]">to Modern Excellence</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-1 bg-[var(--accent)] rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed"
          >
            Our chikki embodies decades of craftsmanship, blending the rich
            heritage of traditional recipes with a modern twist. Each bite
            delivers unmatched flavor, carefully curated with the finest nuts
            and pure jaggery.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed"
          >
            Free from additives and artificial preservatives, our products
            promise a clean, premium indulgence. Taste the harmony of
            tradition and innovation in every piece.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="#"
            className="mt-6 inline-flex items-center justify-center
            bg-[var(--primary)] text-white
            px-12 py-4 rounded-full font-medium tracking-wide
            hover:bg-[var(--secondary)]
            hover:shadow-2xl hover:-translate-y-1
            transition-all duration-300 w-fit"
          >
            Explore Our Range
          </motion.a>
        </div>

        {/* Left – Video / Image */}
        <div className="w-full md:w-1/2 relative">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-[38%_62%_42%_58%/55%_45%_55%_45%] shadow-2xl border border-white/10"
          >
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--primary)]/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
