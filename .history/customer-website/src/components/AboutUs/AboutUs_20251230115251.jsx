'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Video */}
        <div className="w-full md:w-1/2">
          <video
            src="/videos/chikki-making.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Us</h2>
          
          <p className="text-gray-700 text-lg md:text-xl">
            At <strong>SweetChikki</strong>, we craft traditional chikkis using the finest nuts, seeds, and natural jaggery. Our recipes have been passed down through generations, ensuring every bite is a perfect blend of taste and health.
          </p>
          
          <p className="text-gray-700 text-lg md:text-xl">
            Handmade with love, our chikkis are free from preservatives, artificial flavors, and refined sugars. Experience the authentic taste of healthy snacking with every bite.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2 text-gray-700">
              <img src="/icons/icon-natural.png" alt="Natural" className="w-5 h-5"/>
              <span>100% Natural</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <img src="/icons/icon-handmade.png" alt="Handmade" className="w-5 h-5"/>
              <span>Handmade</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <img src="/icons/icon-healthy.png" alt="Healthy" className="w-5 h-5"/>
              <span>Healthy</span>
            </div>
          </div>

          <a
            href="#popular-items"
            className="mt-6 inline-block bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition"
          >
            Explore Flavors
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
