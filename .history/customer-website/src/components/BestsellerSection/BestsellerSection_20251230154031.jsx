'use client';
import React from 'react';

const bestsellers = [
  {
    id: 1,
    name: 'Classic Peanut Chikki',
    price: '₹120',
    image: '/images/chikki-classic.png',
  },
  {
    id: 2,
    name: 'Dry Fruit Special Combo',
    price: '₹299',
    image: '/images/chikki-combo.png',
    tag: 'Best Value',
  },
  {
    id: 3,
    name: 'Sesame Jaggery Chikki',
    price: '₹140',
    image: '/images/chikki-sesame.png',
  },
  {
    id: 4,
    name: 'Mixed Nuts Chikki',
    price: '₹180',
    image: '/images/chikki-mixed.png',
  },
];

export default function BestSellers() {
  return (
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#3a2416]">
            Our Bestsellers
          </h2>
          <p className="mt-3 text-[#8a6a4f] max-w-xl mx-auto">
            Discover our most loved chikkis and special combos, made with
            pure jaggery and premium nuts.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestsellers.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 relative"
            >
              {/* Tag */}
              {item.tag && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.tag}
                </span>
              )}

              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 object-contain mb-4"
              />

              {/* Content */}
              <h3 className="text-lg font-semibold text-[#3a2416]">
                {item.name}
              </h3>
              <p className="text-[#c63b2f] font-bold mt-1">
                {item.price}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-[#c63b2f] text-white py-2 rounded-full text-sm hover:bg-[#a83228] transition">
                  Add to Cart
                </button>
                <button className="flex-1 border border-[#c63b2f] text-[#c63b2f] py-2 rounded-full text-sm hover:bg-[#c63b2f] hover:text-white transition">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
