'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const AboutUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Replace these with your actual image URLs
  const craftImages = [
    { url: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=2754528384764293', alt: 'Handcrafted with finest nuts' },
    { url: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3780140775649818637', alt: 'Traditional jaggery preparation' },
    { url: 'https://desigud.in/wp-content/uploads/2023/09/Cooking-with-Jaggery.jpg', alt: 'Melting pure jaggery' },
    { url: 'https://pureheart.com/cdn/shop/articles/WhatsApp_Image_2022-03-22_at_4.20.54_PM_1024x1024.jpg?v=1648447871', alt: 'Dry fruit chikki close-up' },
    { url: 'https://namdarfoods.com/wp-content/uploads/2025/02/dryfruit-chikki.jpg', alt: 'Premium dry fruit chikki' },
    { url: 'https://m.media-amazon.com/images/I/614UYCnEOvL._AC_UF1000,1000_QL80_.jpg', alt: 'Modern premium packaging' },
  ];

  return (
    <section className="relative py-32 px-6 bg-[var(--bg-main)] overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left - Image Grid with Timeline */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {craftImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>

            {/* Subtle Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 hidden lg:block -translate-y-1/2 pointer-events-none">
              <div className="h-0.5 bg-[var(--primary)]/30 w-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--primary)] rounded-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--accent)] rounded-full" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
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
              Our chikki embodies decades of craftsmanship, blending the rich heritage of traditional recipes with a modern twist. Each bite delivers unmatched flavor, carefully curated with the finest nuts and pure jaggery.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[var(--text-muted)] text-lg leading-relaxed"
            >
              Free from additives and artificial preservatives, our products promise a clean, premium indulgence. Taste the harmony of tradition and innovation in every piece.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              href="#"
              className="mt-6 inline-flex items-center justify-center bg-[var(--primary)] text-white px-12 py-4 rounded-full font-medium tracking-wide hover:bg-[var(--secondary)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-fit"
            >
              Explore Our Range
            </motion.a>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={ref} className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { end: 80, label: 'Years of Tradition' },
            { end: 100, label: '% Natural Ingredients', suffix: '%' },
            { end: 50, label: 'Varieties of Chikki', suffix: '+' },
            { end: 1000, label: 'Happy Customers Daily', suffix: '+' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <span className="text-4xl md:text-5xl font-bold text-[var(--primary)]">
                {inView && <CountUp end={stat.end} duration={2.5} suffix={stat.suffix || ''} />}
              </span>
              <span className="text-[var(--text-muted)] mt-2">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Optional Founder Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center max-w-4xl mx-auto italic text-xl text-[var(--text-muted)]"
        >
          "We believe in preserving the authentic taste passed down through generations, while embracing innovation to bring joy to every home."
          <footer className="mt-4 text-[var(--primary)] font-semibold not-italic">
            — Founder, [Your Brand Name]
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default AboutUs;