'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <section className="relative py-36 px-6 bg-[var(--bg-main)] overflow-hidden">
      
      {/* Soft Ambient Background */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[var(--primary)]/15 to-[var(--secondary)]/15 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[420px] h-[420px] bg-[var(--accent)]/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-20 lg:gap-28">
        
        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="flex flex-col max-w-xl"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="uppercase tracking-[0.35em] text-xs font-semibold text-[var(--primary)] mb-4"
          >
            Our Legacy
          </motion.span>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-bold text-[var(--text-main)] leading-[1.15]"
          >
            Rooted in Tradition,
            <br />
            <span className="text-[var(--primary)]">
              Crafted for Today
            </span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="w-20 h-[3px] bg-[var(--accent)] rounded-full my-8"
          />

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed mb-5"
          >
            Our chikki celebrates generations of craftsmanship — where
            time-honored recipes meet refined modern techniques. Every batch
            reflects our commitment to purity, flavor, and balance.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed"
          >
            Made using premium nuts and natural jaggery, without additives or
            preservatives, each bite delivers an authentic yet elevated
            experience.
          </motion.p>

          <motion.a
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            href="#"
            className="mt-10 inline-flex items-center justify-center
              bg-[var(--primary)] text-white
              px-12 py-4 rounded-full font-medium tracking-wide
              hover:bg-[var(--secondary)]
              hover:shadow-xl hover:-translate-y-[2px]
              transition-all duration-300 w-fit"
          >
            Discover Our Collection
          </motion.a>
        </motion.div>

        {/* Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative w-full h-[420px] md:h-[520px]"
        >
          <div className="relative w-full h-full overflow-hidden 
            rounded-[36%_64%_46%_54%/54%_44%_56%_46%]
            shadow-2xl border border-white/10"
          >
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-[1.04]"
            />

            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-black/10" />
          </div>

          {/* Floating Accent */}
          <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-[var(--primary)]/20 rounded-full blur-3xl -z-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;
