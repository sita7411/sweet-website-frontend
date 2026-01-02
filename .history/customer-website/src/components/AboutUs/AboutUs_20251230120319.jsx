'use client';

import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Video with Blob Shape */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-80 md:h-[400px] overflow-hidden rounded-[50%_50%_50%_50%/40%_60%_40%_60%]">
            <video
              src="pista"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Master of Italian Cuisine</h2>
          <p className="text-gray-700 text-lg md:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-gray-700 text-lg md:text-xl">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <a
            href="#"
            className="mt-4 inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
