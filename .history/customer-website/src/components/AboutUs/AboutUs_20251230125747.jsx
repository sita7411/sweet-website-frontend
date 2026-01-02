'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="bg-[var(--bg-main)] py-16 md:py-20 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl shadow-lg"
        >
          <img
            src="/images/chikki-about.jpg"
            alt="About Chikki"
            className="w-full h-[300px] md:h-[360px] object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <span className="text-[11px] tracking-[0.28em] uppercase text-[var(--primary)] font-medium">
            About Us
          </span>

          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-main)] leading-snug">
            Crafted with Tradition,<br />
            Refined for Today
          </h2>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md">
            Generations of chikki-making expertise combined with modern quality
            standards, using premium nuts and pure jaggery.
          </p>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md">
            No additives. No preservatives. Just honest flavours.
          </p>

          <a
            href="#"
            className="mt-2 inline-flex items-center text-sm font-medium
              text-[var(--primary)] hover:underline underline-offset-4"
          >
            View Our Products →
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;
