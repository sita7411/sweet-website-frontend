// SubscribeSection.jsx
'use client';

import React from 'react';

export default function SubscribeSection() {
  return (
    <section
      className="relative flex items-center justify-between p- mt-50 rounded-[50px] bg-cover bg-center"
      style={{
        backgroundImage: "url('subscribe-bg.png')", // Replace with your background image path
      }}
    >
      {/* Left Text + Input */}
      <div className="max-w-lg">
        <h2 className="text-4xl font-serif text-[#3a2416] mb-4">
          Subscribe To Our Letter
        </h2>
        <p className="text-[#8a6a52] mb-6">
          Summer Flavors & Giving Back! Try Our New Treats & Support A Local Charity – Every Purchase Counts. Thanks For Choosing Us!
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-4 rounded-l-full border border-gray-300 focus:outline-none"
          />
          <button className="bg-[#c63b2f] text-white px-6 rounded-r-full hover:bg-[#6b3f26] transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="ml-8">
        <img
          src="/images/ladoos.png" // Replace with your ladoos image path
          alt="Ladoos"
          className="w-80 h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}
