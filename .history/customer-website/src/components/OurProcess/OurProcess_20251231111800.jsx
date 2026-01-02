'use client';

import React from 'react';

const varieties = [
  {
    title: "Soft & Sweet",
    desc: "Aas Chiki Choos Karo!",
    img: "/images/chikki-soft.png",
  },
  {
    title: "Crunchy Delight",
    desc: "Perfectly roasted peanuts",
    img: "/images/chikki-crunchy.png",
  },
  {
    title: "Nutty Special",
    desc: "Almonds & cashews mix",
    img: "/images/chikki-nutty.png",
  },
];

const ChikkiVarieties = () => {
  return (
    <section className="bg-[#fffaf3] py-16 px-4 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#c63b2f]">Our Varieties</h2>
        <p className="mt-2 text-gray-700 max-w-xl mx-auto">
          Explore our delicious chikki varieties made with love and premium ingredients.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {varieties.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform"
          >
            <img src={item.img} alt={item.title} className="w-32 h-32 object-contain mb-4" />
            <h3 className="text-xl font-semibold text-[#3a2416] mb-2">{item.title}</h3>
            <p className="text-gray-600 text-center">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChikkiVarieties;
