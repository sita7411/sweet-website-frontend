'use client';

import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

const items = [
  {
    title: 'Classic Nut Chikki',
    subtitle: 'Jaggery & Peanut Blend',
    price: '₹199',
    rating: '5.0',
    img: 'pista.png',
  },
  {
    title: 'Strawberry Delight',
    subtitle: 'Fruity Crunch Chikki',
    price: '₹149',
    rating: '5.0',
    img: 'stwabarry_chikki.png',
  },
  {
    title: 'Mango Fusion',
    subtitle: 'Seasonal Mango Flavor',
    price: '₹179',
    rating: '5.0',
    img: 'mango_chikki.png',
  },
  {
    title: 'Chocolate Crunch',
    subtitle: 'Rich Cocoa Coated',
    price: '₹199',
    rating: '5.0',
    img: 'choclate.png',
  },
];

export default function PopularItems() {
  return (
    <section className="py-28 bg-[var(--bg-main)]">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-[42px] font-extrabold">
            Our Popular Picks
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Handcrafted chikki made with premium ingredients.
          </p>
        </div>

        {/* ===== SHAPED CONTAINER ===== */}
        <div className="relative px-50">

          {/* WHITE MASKED BACKGROUND */}
          <div
            className="
              absolute inset-0
              bg-white
              shadow-[0_30px_70px_rgba(0,0,0,0.15)]
            "
            style={{
              borderRadius: '140px',
              WebkitMaskImage: `
                radial-gradient(circle 120px at % 50%, transparent 98%, black 100%),
                radial-gradient(circle 120px at 100% 50%, transparent 98%, black 100%),
                linear-gradient(black, black)
              `,
              WebkitMaskComposite: 'destination-out, destination-out, source-over',
              maskComposite: 'exclude',
            }}
          />


        </div>
      </div>
    </section>
  );
}
