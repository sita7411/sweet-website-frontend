'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="relative py-32 px-6 bg-[var(--bg-main)] overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-[-100px] left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-full blur-3xl -z-10 animate-slowSpin" />
      <div className="absolute bottom-[-120px] right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-[var(--accent)]/10 to-[var(--primary)]/10 rounded-full blur-2xl -z-10" />

      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-20">
        {/* Right – Content Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col gap-6 md:gap-8 shadow-xl"
        >
          <span className="uppercase tracking-[0.35em] text-sm font-semibold text-[var(--primary)]">
            Our Legacy
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] leading-snug">
            Tradition Meets <br />
            <span className="text-[var(--primary)]">Luxury Craft</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full" />

          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            Our chikki is crafted with generations of expertise, blending
            authenticity with modern finesse. Premium nuts and natural jaggery
            create a taste that’s unmatched in texture and flavor.
          </p>

          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            Free from artificial additives, each piece is a testament to clean,
            honest indulgence. A modern classic redefined for discerning palates.
          </p>

          <a
            href="#"
            className="mt-6 inline-flex items-center justify-center
            bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
            text-white px-12 py-4 rounded-full font-semibold tracking-wide
            shadow-lg hover:shadow-2xl hover:scale-105
            transition-all duration-300 w-fit"
          >
            Discover the Collection
          </a>
        </motion.div>

        {/* Left – Premium Video with Floating Particles */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 relative group"
        >
          <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-[38%_62%_42%_58%/55%_45%_55%_45%] shadow-2xl border border-white/10 transform-gpu transition-transform duration-500 group-hover:scale-105">
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10 mix-blend-overlay" />

            {/* Floating Nut Particles */}
            <div className="absolute w-full h-full pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -50, 0],
                    x: [0, 30, -20],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6 + i,
                    delay: i * 0.3,
                  }}
                  className={`absolute w-4 h-4 bg-[var(--accent)] rounded-full`}
                  style={{
                    top: `${Math.random() * 90}%`,
                    left: `${Math.random() * 90}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
