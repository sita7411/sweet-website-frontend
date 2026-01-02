'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="bg-[var(--bg-main)] py-24 md:py-32 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl shadow-xl"
        >
          <img
            src="/images/chikki-about.jpg"
            alt="About Chikki"
            className="w-full h-[380px] md:h-[460px] object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] font-medium">
            About Us
          </span>

          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-main)]">
            Crafted with Tradition,<br />
            Refined for Today
          </h2>

          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed max-w-lg">
            We bring generations of chikki-making expertise together with
            modern quality standards. Every batch is prepared using premium
            nuts and pure jaggery, ensuring authentic taste and consistency.
          </p>

          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed max-w-lg">
            No artificial preservatives. No additives. Just honest flavours
            crafted with care for everyday indulgence.
          </p>

          <a
            href="#"
            className="mt-4 inline-flex items-center text-sm font-medium
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
