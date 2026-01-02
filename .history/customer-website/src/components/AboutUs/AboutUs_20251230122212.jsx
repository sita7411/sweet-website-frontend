'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-20 px-6 bg-[var(--bg-main)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-14">

        {/* Left Video Section */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-80 md:h-[420px] overflow-hidden 
            rounded-[60%_40%_55%_45%/45%_55%_45%_55%]
            shadow-xl border-4 border-[var(--bg-soft)]"
          >
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          
          {/* Small Label */}
          <span className="uppercase tracking-widest text-sm font-semibold text-[var(--primary)]">
            About Our Chikki
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] leading-tight">
            Crafted with Tradition, <br />
            Loved for Every Bite
          </h2>

          {/* Accent Line */}
          <div className="w-20 h-1 bg-[var(--accent)] rounded-full"></div>

          {/* Description */}
          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            Our chikki is made using age-old recipes passed down through generations,
            combining the richness of roasted nuts with the natural sweetness of jaggery.
          </p>

          <p className="text-[var(--text-muted)] text-lg leading-relaxed">
            Free from artificial preservatives, each bite delivers authentic taste,
            crunchy texture, and wholesome goodness you can trust.
          </p>

          {/* CTA Button */}
          <a
            href="#"
            className="mt-4 inline-flex items-center justify-center
              bg-[var(--primary)] text-white
              px-8 py-3 rounded-full font-semibold
              hover:bg-[var(--secondary)] transition-all duration-300
              shadow-md w-fit"
          >
            Explore Our Chikki
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
