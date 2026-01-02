'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-28 px-6 bg-[var(--bg-main)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-20">

        {/* Left – Crafted Visual */}
        <div className="w-full md:w-1/2">
          <div
            className="relative w-full h-80 md:h-[460px] overflow-hidden
            rounded-[42%_58%_46%_54%/55%_45%_55%_45%]
            shadow-2xl border border-white/15"
          >
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-110"
            />

            {/* Soft Premium Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/15" />
          </div>
        </div>

        {/* Right – Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">

          {/* Brand Label */}
          <span className="uppercase tracking-[0.35em] text-xs font-semibold text-[var(--primary)]">
            Our Story
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--text-main)] leading-tight">
            Rooted in Tradition. <br />
            <span className="text-[var(--primary)]">Refined for Today.</span>
          </h2>

          {/* Divider */}
          <div className="w-24 h-[3px] bg-[var(--accent)] rounded-full"></div>

          {/* Professional Brand Copy */}
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            Our chikki is a reflection of generations of craftsmanship, prepared
            using traditional methods that honor authenticity, quality, and taste.
            Every batch is carefully made with premium nuts and natural jaggery,
            ensuring consistency in flavor and texture.
          </p>

          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            We believe true goodness requires no shortcuts. That is why our
            products are free from artificial preservatives, additives, or
            processed sugars—delivering a clean, honest indulgence you can trust.
          </p>

          {/* CTA */}
          <a
            href="#"
            className="mt-6 inline-flex items-center justify-center
            bg-[var(--primary)] text-white
            px-10 py-3.5 rounded-full font-medium tracking-wide
            hover:bg-[var(--secondary)]
            hover:shadow-2xl hover:-translate-y-0.5
            transition-all duration-300 w-fit"
          >
            Discover Our Range
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
