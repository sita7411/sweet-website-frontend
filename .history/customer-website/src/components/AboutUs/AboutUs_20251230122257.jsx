'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-20 px-6 bg-[var(--bg-main)]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 max-w-7xl">

        {/* Left Video Section - Professional Organic Blob Shape */}
        <div className="w-full lg:w-1/2 relative">
          <div 
            className="relative w-full aspect-video overflow-hidden shadow-2xl"
            style={{
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 20%, 100% 80%, 85% 100%, 15% 100%, 0% 80%, 0% 20%)',
            }}
          >
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Right Content - Enhanced Professional Look */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          
          {/* Small Label */}
          <span className="uppercase tracking-widest text-sm font-semibold text-[var(--primary)]">
            About Our Chikki
          </span>

          {/* Heading - Larger and more elegant */}
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--text-main)] leading-tight">
            Crafted with Tradition,<br />
            Loved for Every Bite
          </h2>

          {/* Accent Line - Slightly longer and modern */}
          <div className="w-32 h-1 bg-[var(--accent)] rounded-full"></div>

          {/* Description - Better spacing and readability */}
          <div className="space-y-6 text-[var(--text-muted)] text-lg leading-relaxed">
            <p>
              Our chikki is made using age-old recipes passed down through generations,
              combining the richness of roasted nuts with the natural sweetness of jaggery.
            </p>
            <p>
              Free from artificial preservatives, each bite delivers authentic taste,
              crunchy texture, and wholesome goodness you can trust.
            </p>
          </div>

          {/* CTA Button - More prominent */}
          <a
            href="#"
            className="inline-flex items-center justify-center
              bg-[var(--primary)] text-white
              px-10 py-4 rounded-full font-semibold text-lg
              hover:bg-[var(--secondary)] hover:scale-105 transition-all duration-300
              shadow-lg w-fit"
          >
            Explore Our Chikki
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;