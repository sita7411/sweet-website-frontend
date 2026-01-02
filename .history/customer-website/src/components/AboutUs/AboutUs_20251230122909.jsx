'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-32 px-6 bg-[var(--bg-main)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-24">

        {/* Visual – Clean & Controlled */}
        <div className="w-full md:w-1/2">
          <div
            className="relative w-full h-80 md:h-[480px] overflow-hidden
            rounded-[40%_60%_50%_50%/55%_45%_55%_45%]
            shadow-xl"
          >
            <video
              src="chikki.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Minimal Contrast Layer */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>

        {/* Content – Corporate Tone */}
        <div className="w-full md:w-1/2 flex flex-col gap-10">

          {/* Section Tag */}
          <span className="uppercase tracking-[0.4em] text-xs font-medium text-[var(--primary)]">
            About Us
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-medium text-[var(--text-main)] leading-snug">
            A Legacy of Quality, <br />
            Built on Trust
          </h2>

          {/* Divider */}
          <div className="w-28 h-[2px] bg-[var(--accent)]"></div>

          {/* Formal Copy */}
          <p className="text-[var(--text-muted)] text-lg leading-loose">
            We specialize in producing traditionally crafted chikki using
            carefully sourced nuts and natural jaggery. Our methods remain
            rooted in heritage, while our standards align with modern quality
            and safety expectations.
          </p>

          <p className="text-[var(--text-muted)] text-lg leading-loose">
            Each product is prepared in controlled batches, ensuring uniform
            taste, texture, and freshness. With a strict focus on ingredient
            integrity, we do not use artificial preservatives, additives, or
            refined sugars.
          </p>

          <p className="text-[var(--text-muted)] text-lg leading-loose">
            This commitment allows us to deliver a product that reflects
            consistency, reliability, and authentic flavor—qualities our
            customers value and trust.
          </p>

          {/* Action */}
          <a
            href="#"
            className="mt-4 inline-flex items-center justify-center
            border border-[var(--primary)]
            text-[var(--primary)]
            px-10 py-3.5 rounded-full font-medium tracking-wide
            hover:bg-[var(--primary)] hover:text-white
            transition-all duration-300 w-fit"
          >
            View Our Products
          </a>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
