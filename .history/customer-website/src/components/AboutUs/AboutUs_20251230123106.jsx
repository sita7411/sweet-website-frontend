'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="relative py-32 px-6 bg-[var(--bg-main)] overflow-hidden">
      {/* Background Abstract Shapes */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--primary)]/20 to-[var(--accent)]/20 rounded-[50%_50%_40%_60%] blur-3xl -z-10 animate-slowSpin" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[var(--secondary)]/10 to-[var(--primary)]/10 rounded-[60%_40%_50%_50%] blur-2xl -z-10" />

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-24">
        {/* Video / Visual Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2"
        >
          <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-[42%_58%_46%_54%/55%_45%_55%_45%] shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-white/10">
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 mix-blend-overlay" />
            {/* Abstract Accent Shape */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--primary)]/20 rounded-full blur-3xl" />
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 relative flex flex-col gap-8"
        >
          {/* Glass Card */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl flex flex-col gap-6">
            <span className="uppercase tracking-[0.35em] text-sm font-semibold text-[var(--primary)]">
              Our Story
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] leading-snug">
              Tradition Elevated <br />
              <span className="text-[var(--primary)]">to Art</span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full" />

            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              Crafted with generations of expertise, our chikki blends
              authenticity with modern elegance. Premium nuts and pure jaggery
              deliver unmatched taste and texture.
            </p>

            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              Free from additives, each piece represents clean indulgence, a
              modern classic for refined palates.
            </p>

            <a
              href="#"
              className="mt-6 inline-flex items-center justify-center
              bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
              text-white px-12 py-4 rounded-full font-semibold tracking-wide
              shadow-lg hover:shadow-2xl hover:scale-105
              transition-all duration-300 w-fit"
            >
              Explore the Collection
            </a>
          </div>

          {/* Small Floating Accent Lines */}
          <div className="absolute -top-6 right-0 w-24 h-1 bg-[var(--primary)]/30 rounded-full blur-sm" />
          <div className="absolute bottom-0 left-0 w-32 h-1 bg-[var(--accent)]/30 rounded-full blur-sm" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
