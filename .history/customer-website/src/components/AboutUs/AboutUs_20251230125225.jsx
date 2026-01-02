'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  // Replace these with your own professional high-quality images
  const craftImages = [
    { url: '/images/chikki-process-1.jpg', alt: 'Selecting premium nuts' },
    { url: '/images/chikki-process-2.jpg', alt: 'Pure jaggery preparation' },
    { url: '/images/chikki-process-3.jpg', alt: 'Handcrafted blending' },
    { url: '/images/chikki-process-4.jpg', alt: 'Traditional cooking method' },
    { url: '/images/chikki-process-5.jpg', alt: 'Artisanal shaping' },
    { url: '/images/chikki-process-6.jpg', alt: 'Premium finished chikki' },
  ];

  return (
    <section className="relative py-32 px-6 bg-[var(--bg-main)] overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Staggered Image Grid (Professional Gallery) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6 auto-rows-[200px]"
          >
            {/* Staggered layout: alternate heights for elegance */}
            {craftImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl shadow-xl group ${
                  index % 2 === 0 ? 'row-span-1' : 'row-span-2'
                } ${index === 4 ? 'col-span-2' : ''}`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Content */}
          <div className="flex flex-col gap-10">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="uppercase tracking-[0.35em] text-xs md:text-sm font-medium text-[var(--primary)]"
            >
              Our Heritage
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-main)] leading-tight"
            >
              From Tradition <br />
              <span className="text-[var(--primary)]">to Timeless Excellence</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-32 h-px bg-[var(--accent)] origin-left"
            />

            <div className="space-y-6 text-[var(--text-muted)] text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Rooted in decades of artisanal expertise, our chikki represents the perfect harmony of time-honored recipes and contemporary craftsmanship. We meticulously select the finest nuts and purest jaggery to create a product of unparalleled quality and flavor.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Committed to authenticity, we use no artificial additives or preservatives—delivering a clean, premium indulgence that honors tradition while meeting modern standards of excellence.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8"
            >
              <a
                href="#"
                className="inline-flex items-center justify-center bg-[var(--primary)] text-white px-10 py-4 rounded-full font-medium tracking-wide hover:bg-[var(--secondary)] hover:shadow-xl transition-all duration-300"
              >
                Discover Our Collection
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;