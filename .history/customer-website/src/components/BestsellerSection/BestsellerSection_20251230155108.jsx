'use client';

import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const products = [
  {
    title: 'Pista Chocolate Chikki',
    desc: 'Chocolate & Peanut Blend',
    price: '₹250',
    img: 'pista.png',
    hoverImg: 'choclate.png',
    tag: 'Bestseller',
  },
  {
    title: 'Strawberry Delight',
    desc: 'Fruity Crunch Chikki',
    price: '₹350',
    img: 'stwabarry_chikki.png',
    hoverImg: 'mango_chikki.png',
    tag: 'Special Combo',
  },
  {
    title: 'Mango Fusion',
    desc: 'Seasonal Mango Flavor',
    price: '₹179',
    img: 'mango_chikki.png',
    hoverImg: 'pista.png',
    tag: 'Limited',
  },
  {
    title: 'Chocolate Crunch',
    desc: 'Rich Cocoa Coated',
    price: '₹199',
    img: 'choclate.png',
    hoverImg: 'kalakand.png',
    tag: 'Trending',
  },
];

export default function BestSellersEcommerce() {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (i) => {
    setWishlist((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <section className="py-20 bg-[var(--bg-soft)]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-[40px] font-extrabold text-[var(--text-main)]">
            Best Sellers & Special Combos
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)] max-w-xl mx-auto">
            Discover our most loved chikkis and premium combo packs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] relative group overflow-hidden"
            >
              {/* Tag */}
              <span className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[11px] px-3 py-1 rounded-full z-10">
                {item.tag}
              </span>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(i)}
                className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow z-10 transition
                  ${wishlist[i]
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
                  }`}
              >
                <HeartIcon className="w-4 h-4" />
              </button>

              {/* IMAGE CONTAINER */}
              <div className="relative w-full h-48 mb-4 flex items-center justify-center">
                
                {/* Default Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-105"
                />

                {/* Hover Image */}
                <img
                  src={item.hoverImg}
                  alt="hover"
                  className="absolute inset-0 w-full h-full object-contain opacity-0 scale-95 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100"
                />
              </div>

              {/* Content */}
              <h3 className="text-[16px] font-semibold text-[var(--text-main)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {item.desc}
              </p>

              {/* Price + CTA */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-[20px] font-bold text-[var(--secondary)]">
                  {item.price}
                </p>

                <button className="flex items-center gap-2 bg-[var(--bg-main)] text-[var(--primary)] text-xs px-4 py-2 rounded-full font-semibold hover:bg-[var(--primary)] hover:text-white transition">
                  <ShoppingCartIcon className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
