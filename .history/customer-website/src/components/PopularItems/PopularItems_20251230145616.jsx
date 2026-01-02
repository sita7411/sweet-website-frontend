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
    title: 'SP Dana GUD LADU',
    subtitle: 'Traditional Sweet',
    price: '₹280',
    rating: '5.0',
    img: 'dana_ladu.png',
  },
  {
    title: 'Pineapple Chocolate Chikki',
    subtitle: 'Tropical Cocoa Twist',
    price: '₹390',
    rating: '5.0',
    img: 'mango_chikki.png',
  },
  {
    title: 'Ajmeri Kalakand',
    subtitle: 'Classic Milk Sweet',
    price: '₹280',
    rating: '5.0',
    img: 'kalakand.png',
  },
];

export default function PopularItems() {
  const [index, setIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const [itemsPerView, setItemsPerView] = useState(4);

  /* ---------------- Responsive Logic ---------------- */
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else if (window.innerWidth < 1280) setItemsPerView(3);
      else setItemsPerView(4);
    };

    updateView();
    window.addEventListener('resize', updateView);
    return () => window.removeEventListener('resize', updateView);
  }, []);

  /* ---------------- Slider Controls ---------------- */
  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? items.length - itemsPerView : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) =>
      prev + itemsPerView >= items.length ? 0 : prev + 1
    );
  };

  const handleAddToCart = (i) => {
    setAddedItems((prev) => ({ ...prev, [i]: true }));
  };

  const handleWishlist = (i) => {
    setWishlistItems((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < itemsPerView; i++) {
      visible.push(items[(index + i) % items.length]);
    }
    return visible;
  };

  /* ---------------- UI ---------------- */
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)]">
            Our Popular Picks
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] text-[var(--text-muted)] max-w-xl mx-auto">
            Handcrafted chikki made with premium ingredients, loved for its
            authentic taste and perfect crunch.
          </p>
        </motion.div>

        {/* Slider Wrapper */}
        <div
          className="
            relative
            rounded-[30px] sm:rounded-[40px] lg:rounded-[60px]
            px-4 sm:px-8 lg:px-14
            py-10 sm:py-14 lg:py-18
            bg-cover bg-center bg-no-repeat
          "
          style={{ backgroundImage: "url('Group 57.png')" }}
        >
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2
              w-14 h-14 lg:w-18 lg:h-18 rounded-full bg-white shadow
              items-center justify-center hover:scale-110 transition"
          >
            <ChevronLeftIcon className="w-7 h-7 text-[var(--text-main)]" />
          </button>

          {/* Cards */}
          <div
            className="
              grid gap-6 sm:gap-8 lg:gap-10
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            "
          >
            {getVisibleItems().map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="
                  relative bg-white
                  rounded-[24px] sm:rounded-[28px]
                  px-5 sm:px-6
                  pt-24 sm:pt-28
                  pb-6 sm:pb-7
                  shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                "
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  className="
                    absolute -top-12 sm:-top-14
                    left-1/2 -translate-x-1/2
                    w-20 h-20 sm:w-24 sm:h-24
                    rounded-full bg-white shadow-md
                    flex items-center justify-center
                  "
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-sm sm:text-[15px] font-semibold text-[var(--text-main)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {item.subtitle}
                </p>

                {/* Price & Wishlist */}
                <div className="flex justify-between items-center mt-3">
                  <p className="text-lg sm:text-[22px] font-bold text-[var(--secondary)]">
                    {item.price}
                  </p>

                  <motion.button
                    onClick={() => handleWishlist(i)}
                    whileHover={{ scale: 1.15 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow ${
                      wishlistItems[i]
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-card)] text-[var(--primary)]'
                    }`}
                  >
                    <HeartIcon className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Cart */}
                <div className="flex justify-between items-center mt-4">
                  <motion.button
                    onClick={() => handleAddToCart(i)}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center gap-2 text-xs px-4 py-1.5 rounded-full font-semibold shadow ${
                      addedItems[i]
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-soft)] text-[var(--primary)]'
                    }`}
                  >
                    <ShoppingCartIcon className="w-4 h-4" />
                    {addedItems[i] ? 'Added' : 'Add to Cart'}
                  </motion.button>

                  <span className="text-xs text-[var(--text-muted)]">
                    ★ {item.rating}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2
              w-14 h-14 lg:w-18 lg:h-18 rounded-full bg-white shadow
              items-center justify-center hover:scale-110 transition"
          >
            <ChevronRightIcon className="w-7 h-7 text-[var(--text-main)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
