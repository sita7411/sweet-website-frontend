'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid';

const items = [
  { title: 'Pista Chocolate Chikki', subtitle: 'Chocolate & Peanut Blend', price: '₹250', rating: '5.0', img: 'pista.png' },
  { title: 'Strawberry Delight', subtitle: 'Fruity Crunch Chikki', price: '₹350', rating: '5.0', img: 'stwabarry_chikki.png' },
  { title: 'Mango Fusion', subtitle: 'Seasonal Mango Flavor', price: '₹179', rating: '5.0', img: 'mango_chikki.png' },
  { title: 'Chocolate Crunch', subtitle: 'Rich Cocoa Coated', price: '₹199', rating: '5.0', img: 'choclate.png' },
  { title: 'SP. Dana GUD lADU', subtitle: 'Traditional Sweet', price: '₹280', rating: '5.0', img: 'dana_ladu.png' },
  { title: 'Pineapple Chocolate Chikki', subtitle: 'Exotic Fusion', price: '₹390', rating: '5.0', img: 'mango_chikki.png' },
  { title: 'Ajmeri Kalakand', subtitle: 'Royal Milk Sweet', price: '₹280', rating: '5.0', img: 'kalakand.png' },
];

export default function PopularItems() {
  const [index, setIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const scrollRef = useRef(null);

  /* ------------------ Desktop arrows ------------------ */
  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  /* ------------------ Mobile auto scroll ------------------ */
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 280,
          behavior: 'smooth',
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(items[(index + i) % items.length]);
    }
    return visible;
  };

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-[42px] font-extrabold text-[var(--text-main)]">
            Our Popular Picks
          </h2>
          <p className="mt-4 text-[15px] text-[var(--text-muted)] max-w-xl mx-auto">
            Handcrafted chikki made with premium ingredients.
          </p>
        </motion.div>

        {/* Container */}
        <div
          className="relative rounded-[60px] px-6 lg:px-13 py-16 bg-cover bg-center"
          style={{ backgroundImage: "url('Group 57.png')" }}
        >
          {/* Desktop Arrows */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute -left-3 top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow items-center justify-center hover:scale-110"
          >
            <ChevronLeftIcon className="w-7 h-7" />
          </button>

          {/* MOBILE SCROLL */}
          <div
            ref={scrollRef}
            className="flex lg:hidden gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="snap-start min-w-[260px]"
              >
                <Card item={item} i={i} />
              </div>
            ))}
          </div>

          {/* DESKTOP GRID */}
          <div className="hidden lg:flex gap-10 justify-center">
            {getVisibleItems().map((item, i) => (
              <Card key={i} item={item} i={i} />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow items-center justify-center hover:scale-110"
          >
            <ChevronRightIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------ Card Component ------------------ */
function Card({ item, i }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative bg-white rounded-[28px] px-6 pt-28 pb-7 shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
    >
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-24 h-24 bg-[var(--bg-card)] rounded-full flex items-center justify-center shadow">
        <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded-full" />
      </div>

      <h3 className="text-[15px] font-semibold mt-2">{item.title}</h3>
      <p className="text-xs text-[var(--text-muted)]">{item.subtitle}</p>

      <div className="flex justify-between items-center mt-3">
        <p className="text-[22px] font-bold text-[var(--secondary)]">{item.price}</p>
        <HeartIcon className="w-4 h-4 text-[var(--primary)]" />
      </div>

      <button className="mt-4 w-full flex items-center justify-center gap-2 bg-[var(--bg-soft)] rounded-full py-2 text-xs font-semibold">
        <ShoppingCartIcon className="w-4 h-4" />
        Add to Cart
      </button>

      <p className="text-xs mt-2 text-center">★ {item.rating}</p>
    </motion.div>
  );
}
