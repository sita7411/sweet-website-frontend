// Wishlist.jsx
'use client';

import { useState } from 'react';
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';

const initialWishlist = [
  { id: 1, title: 'Pista Chocolate Chikki', desc: 'Chocolate & Peanut Blend', price: 120, img: '/images/pista.png' },
  { id: 2, title: 'Strawberry Chikki', desc: 'Fruity strawberry crunch delight', price: 150, img: '/images/chikki-strawberry.png' },
  { id: 3, title: 'Classic Peanut Chikki', desc: 'Traditional jaggery & peanut', price: 100, img: '/images/chikki-classic.png' },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeItem = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-10 px-4 md:px-20">
      <h1 className="text-3xl font-bold text-[var(--text-main)] mb-8">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-[var(--text-muted)] text-lg">Your wishlist is empty 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map(item => (
            <div
              key={item.id}
              className="bg-[var(--bg-card)] rounded-2xl shadow-md overflow-hidden relative hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-[var(--text-main)]">{item.title}</h2>
                <p className="text-[var(--text-muted)] text-sm mt-1">{item.desc}</p>
                <p className="text-[var(--primary)] font-bold mt-2">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 bg-[var(--primary)] text-white p-2 rounded-full hover:bg-[var(--secondary)] transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
              <div className="absolute top-3 left-3 bg-[var(--accent)] p-2 rounded-full">
                <HeartIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
