'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShoppingCartIcon,
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
  {
    title: 'SP Dana GUD lADU',
    subtitle: 'Rich Cocoa Coated',
    price: '₹280',
    rating: '5.0',
    img: 'dana_ladu.png',
  },
  {
    title: 'Pineapple Chocolate Chikki',
    subtitle: 'Rich Cocoa Coated',
    price: '₹390',
    rating: '5.0',
    img: 'mango_chikki.png',
  },
  {
    title: 'Ajmeri Kalakand',
    subtitle: 'Rich Cocoa Coated',
    price: '₹280',
    rating: '5.0',
    img: 'kalakand.png',
  },
];

export default function PopularItems() {
  const [index, setIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const [cardsToShow, setCardsToShow] = useState(4);

  // Detect screen size and set number of visible cards
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(4);
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? items.length - cardsToShow : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === items.length - cardsToShow ? 0 : prev + 1));
  };

  const handleAddToCart = (itemIndex) => {
    setAddedItems((prev) => ({ ...prev, [itemIndex]: true }));
  };

  const handleWishlist = (itemIndex) => {
    setWishlistItems((prev) => ({ ...prev, [itemIndex]: !prev[itemIndex] }));
  };

  // Get visible items based on current index and cardsToShow
  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < cardsToShow; i++) {
      visible.push(items[(index + i) % items.length]);
    }
    return visible;
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
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
          <p className="mt-4 text-[15px] text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            Handcrafted chikki made with premium ingredients, loved for its
            authentic taste and perfect crunch.
          </p>
        </motion.div>

        {/* Cards Container */}
        <div
          className="relative rounded-[60px] px-8 py-18 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('Group 57.png')" }}
        >
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-all"
          >
            <ChevronLeftIcon className="w-7 h-7 md:w-8 md:h-8 text-[var(--text-main)]" />
          </button>

          {/* Cards Wrapper */}
          <div className="overflow-hidden">
            <div className="flex justify-center gap-6 md:gap-8 lg:gap-10">
              {visibleItems.map((item, i) => {
                const globalIndex = (index + i) % items.length;
                return (
                  <motion.div
                    key={`${index}-${i}`} // Unique key for animation
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="
                      flex-shrink-0 w-full sm:w-72 md:w-64 lg:w-72
                      relative bg-white rounded-[28px]
                      px-6 pt-28 pb-7
                      shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                    "
                  >
                    {/* Image */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 4 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="
                        absolute -top-14 left-1/2 -translate-x-1/2
                        w-32 h-32 md:w-36 md:h-36 bg-[var(--bg-card)]
                        rounded-full shadow-md
                        flex items-center justify-center overflow-hidden
                      "
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-[15px] -mt-12 font-semibold text-[var(--text-main)] text-center">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 text-center">
                      {item.subtitle}
                    </p>

                    {/* Price + Wishlist */}
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-[22px] font-bold text-[var(--secondary)]">
                        {item.price}
                      </p>

                      <motion.button
                        onClick={() => handleWishlist(globalIndex)}
                        whileHover={{ scale: 1.15 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow transition ${
                          wishlistItems[globalIndex]
                            ? 'bg-[var(--accent)] text-white'
                            : 'bg-[var(--bg-card)] text-[var(--primary)]'
                        }`}
                      >
                        <HeartIcon className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Add to Cart */}
                    <div className="flex items-center justify-between mt-4 gap-3">
                      <motion.button
                        onClick={() => handleAddToCart(globalIndex)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 text-xs px-5 py-1.5 rounded-full font-semibold shadow transition flex-1 ${
                          addedItems[globalIndex]
                            ? 'bg-[var(--accent)] text-white'
                            : 'bg-[var(--bg-soft)] text-[var(--primary)] hover:brightness-105'
                        }`}
                      >
                        <ShoppingCartIcon className="w-4 h-4" />
                        {addedItems[globalIndex] ? 'Added' : 'Add to Cart'}
                      </motion.button>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[var(--text-muted)]">
                          ★ {item.rating}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-all"
          >
            <ChevronRightIcon className="w-7 h-7 md:w-8 md:h-8 text-[var(--text-main)]" />
          </button>
        </div>
      </div>
    </section>
  );
}