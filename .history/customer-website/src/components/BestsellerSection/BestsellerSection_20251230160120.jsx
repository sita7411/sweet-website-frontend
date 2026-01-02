'use client';

import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

const products = [
  { title: 'Pista Chocolate Chikki', desc: 'Chocolate & Peanut Blend', price: 250, img: 'pista.png', hoverImg: 'choclate.png', tag: 'Bestseller' },
  { title: 'Strawberry Delight', desc: 'Fruity Crunch Chikki', price: 350, img: 'stwabarry_chikki.png', hoverImg: 'mango_chikki.png', tag: 'Special' },
  { title: 'Mango Fusion', desc: 'Seasonal Mango Flavor', price: 179, img: 'mango_chikki.png', hoverImg: 'pista.png', tag: 'Limited' },
  { title: 'Chocolate Crunch', desc: 'Rich Cocoa Coated', price: 199, img: 'choclate.png', hoverImg: 'kalakand.png', tag: 'Trending' },
  { title: 'Classic Peanut', desc: 'Traditional Taste', price: 149, img: 'pista.png', hoverImg: 'choclate.png', tag: 'Classic' },
  { title: 'Dryfruit Mix', desc: 'Premium Nuts', price: 399, img: 'kalakand.png', hoverImg: 'pista.png', tag: 'Premium' },
  { title: 'Rose Almond', desc: 'Royal Flavor', price: 289, img: 'stwabarry_chikki.png', hoverImg: 'mango_chikki.png', tag: 'New' },
  { title: 'Jaggery Special', desc: 'Pure Desi Gud', price: 129, img: 'mango_chikki.png', hoverImg: 'pista.png', tag: 'Healthy' },
];

export default function BestSellersEcommerce() {
  const [wishlist, setWishlist] = useState({});
  const [qty, setQty] = useState({});

  const toggleWishlist = (i) => {
    setWishlist(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const increaseQty = (i) => {
    setQty(prev => ({ ...prev, [i]: (prev[i] || 0) + 1 }));
  };

  const decreaseQty = (i) => {
    setQty(prev => {
      if (!prev[i] || prev[i] === 1) {
        const copy = { ...prev };
        delete copy[i];
        return copy;
      }
      return { ...prev, [i]: prev[i] - 1 };
    });
  };

  return (
    <section className="py-24 ">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-[40px] font-extrabold text-[var(--text-main)]">
            Best Sellers & Special Combos
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)]">
            Discover our most loved chikkis and premium combo packs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((item, i) => (
            <div
              key={i}
              className="
                bg-[var(--bg-card)]
                rounded-3xl p-5
                relative group
                transition-all duration-300
                shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                hover:-translate-y-1
                hover:shadow-[0_25px_60px_rgba(198,59,47,0.25)]
              "
            >

              {/* Tag */}
              <span className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[11px] px-3 py-1 rounded-full z-10">
                {item.tag}
              </span>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(i)}
                className={`
                  absolute top-4 right-4 w-9 h-9 rounded-full
                  flex items-center justify-center
                  shadow transition-all duration-300 z-10
                  ${wishlist[i]
                    ? 'bg-[var(--primary)] text-white scale-110'
                    : 'bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white'
                  }
                `}
              >
                <HeartIcon className="w-4 h-4" />
              </button>

              {/* Image */}
              <div className="relative h-44 mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="
                    absolute inset-0 w-full h-full object-contain
                    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    group-hover:opacity-0
                    group-hover:scale-95
                    will-change-transform
                  "
                />
                <img
                  src={item.hoverImg}
                  alt="hover"
                  className="
                    absolute inset-0 w-full h-full object-contain
                    opacity-0 scale-105
                    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    group-hover:opacity-100
                    group-hover:scale-100
                    will-change-transform
                  "
                />
              </div>

              {/* Info */}
              <h3 className="text-sm font-semibold text-[var(--text-main)]">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {item.desc}
              </p>

              {/* Price + Cart */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-bold text-[var(--secondary)]">
                  ₹{item.price}
                </p>

                {!qty[i] ? (
                  <button
                    onClick={() => increaseQty(i)}
                    className="
                      px-5 py-2 rounded-full text-xs font-semibold
                      bg-[var(--primary)] text-white
                      hover:bg-[var(--secondary)]
                      transition
                    "
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex items-center gap-3 bg-[var(--bg-main)] px-4 py-1.5 rounded-full shadow-inner">
                    <button
                      onClick={() => decreaseQty(i)}
                      className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold text-[var(--text-main)]">
                      {qty[i]}
                    </span>
                    <button
                      onClick={() => increaseQty(i)}
                      className="text-lg font-bold text-[var(--primary)] hover:scale-110 transition"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
