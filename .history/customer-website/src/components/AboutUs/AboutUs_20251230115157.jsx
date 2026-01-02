'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-16 px-6 bg-[#fff7e6]">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Video */}
        <div className="w-full md:w-1/2">
          <video
            src="/videos/chikki-making.mp4"
            autoPlay
            loop
            muted
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8B4513]">About Us</h2>
          <p className="text-[#5a4630] text-lg md:text-xl">
            At <strong>SweetChikki</strong>, we craft traditional chikkis using the finest nuts, seeds, and natural jaggery. Our recipes have been passed down through generations, ensuring every bite is a perfect blend of taste and health.
          </p>
          <p className="text-[#5a4630] text-lg md:text-xl">
            Handmade with love, our chikkis are free from preservatives, artificial flavors, and refined sugars. Experience the authentic taste of healthy snacking with every bite.
          </p>

          {/* Highlights / Features */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex items-center gap-2">
              <img src="/icons/icon-natural.png" alt="Natural Ingredients" className="w-6 h-6"/>
              <span>100% Natural</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icons/icon-handmade.png" alt="Handmade" className="w-6 h-6"/>
              <span>Handmade</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icons/icon-healthy.png" alt="Healthy" className="w-6 h-6"/>
              <span>Healthy</span>
            </div>
          </div>

          <a
            href="#popular-items"
            className="mt-6 inline-block bg-[#f5a623] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e5941e] transition"
          >
            Explore Flavors
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
