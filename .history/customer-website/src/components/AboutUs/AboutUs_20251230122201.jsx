'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-24 px-6 bg-[var(--bg-main)] overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Video Section - More elegant container */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl border border-[var(--bg-soft)/50]">
              <video
                src="chikki.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-110"
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Right Content - Cleaner, more professional layout */}
          <div className="order-1 lg:order-2 flex flex-col gap-8">
            
            {/* Small Label */}
            <span className="uppercase tracking-wider text-sm font-medium text-[var(--primary)]">
              About Our Chikki
            </span>

            {/* Heading - Refined typography */}
            <h2 className="text-4xl lg:text-5xl font-bold text-[var(--text-main)] leading-tight">
              Handcrafted Tradition,<br />
              Timeless Flavor in Every Bite
            </h2>

            {/* Accent Line - Subtler and modern */}
            <div className="w-24 h-1 bg-[var(--accent)] rounded-full"></div>

            {/* Description - Better flow and spacing */}
            <div className="space-y-6 text-[var(--text-muted)] text-lg leading-relaxed">
              <p>
                Rooted in generations-old family recipes, our chikki is meticulously crafted using premium roasted nuts and pure, natural jaggery — delivering an authentic taste that honors India's rich culinary heritage.
              </p>
              <p>
                We commit to quality with no artificial preservatives, colors, or flavors. Every piece offers the perfect balance of crunch, sweetness, and wholesome nutrition you can feel good about.
              </p>
            </div>

            {/* Optional: Add subtle feature highlights for professionalism */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--primary)/10] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[var(--text-main)] font-medium">100% Natural</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--primary)/10] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[var(--text-main)] font-medium">Handcrafted Daily</span>
              </div>
            </div>

            {/* CTA Button - Elevated design */}
            <a
              href="#products" // Change to your actual link/section
              className="mt-6 inline-flex items-center justify-center w-fit
                bg-[var(--primary)] text-white
                px-8 py-4 rounded-full font-semibold text-lg
                hover:bg-[var(--secondary)] hover:scale-105
                transition-all duration-300
                shadow-lg"
            >
              Discover Our Range
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;