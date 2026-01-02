'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  return (
    <section className="relative py-28 px-6 bg-[var(--bg-main)] overflow-hidden">

      {/* Ambient Signature Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[620px] h-[620px] bg-[var(--accent)]/18 rounded-full blur-[130px] -z-10" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:gap-24">

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.14 }}
          className="flex flex-col max-w-xl"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="uppercase tracking-[0.45em] text-[11px] font-semibold text-[var(--primary)] mb-4"
          >
            Our Story
          </motion.span>

          {/* Unique Headline */}
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[40px] md:text-5xl font-bold text-[var(--text-main)] leading-[1.1]"
          >
            Tradition First,
            <br />
            <span className="relative inline-block text-[var(--primary)]">
              Taste Always
              <span className="absolute -bottom-2 left-0 w-full h-[6px] bg-[var(--accent)]/70 rounded-full -z-10" />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed mt-6"
          >
            Our chikki carries forward a legacy of patience, purity and balance —
            blending age-old recipes with refined craftsmanship.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-[var(--text-muted)] text-lg leading-relaxed mt-4"
          >
            Every batch is handmade using premium nuts and natural jaggery,
            delivering warmth, nostalgia, and honest flavor.
          </motion.p>

          {/* Unique CTA */}
          <motion.a
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            href="#"
            className="group mt-8 inline-flex items-center gap-3 w-fit
              text-[var(--text-main)] font-semibold tracking-wide"
          >
            <span className="relative">
              Explore Our Craft
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </span>
            <span className="text-[var(--accent)] text-xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </motion.a>
        </motion.div>

        {/* Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-[380px] md:h-[480px]"
        >
          <div
            className="relative w-full h-full overflow-hidden
            rounded-[40%_60%_45%_55%/55%_45%_55%_45%]
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
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-black/10" />
          </div>

          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--accent)]/20 rounded-full blur-3xl -z-10" />
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;
