'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-24 px-6 bg-[var(--bg-main)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Left Video Section */}
        <div className="w-full md:w-1/2">
          <div
            className="relative w-full h-80 md:h-[440px] overflow-hidden
            rounded-[48%_52%_38%_62%/58%_44%_56%_42%]
            shadow-2xl border border-white/20"
          >
            {/* Video */}
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105"
            />

            {/* Premium Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/10" />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-7">

          {/* Label */}
          <span className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--primary)]">
            About Our Craft
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] leading-tight">
            Tradition Crafted, <br />
            <span className="text-[var(--primary)]">Taste Remembered</span>
          </h2>

          {/* Divider */}
          <div className="w-24 h-[3px] bg-[var(--accent)] rounded-full"></div>

          {/* Description */}
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            Rooted in tradition, our chikki is handcrafted using time-honored
            recipes that celebrate the purity of roasted nuts and the natural
            sweetness of jaggery.
          </p>

          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            With no artificial preservatives or shortcuts, every bite delivers
            authentic crunch, balanced flavor, and wholesome nourishment.
          </p>

          {/* CTA */}
          <a
            href="#"
            className="mt-6 inline-flex items-center justify-center
            bg-[var(--primary)] text-white
            px-9 py-3.5 rounded-full font-semibold tracking-wide
            hover:bg-[var(--secondary)]
            hover:shadow-xl hover:-translate-y-0.5
            transition-all duration-300 w-fit"
          >
            Explore Our Collection
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
