'use client';

import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
  ShoppingCartIcon as CartSolid,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

const items = [
  {
    id: 1,
    title: 'Classic Nut Chikki',
    subtitle: 'Jaggery & Peanut Blend',
    price: '₹199',
    rating: '5.0',
    img: 'https://myvegetarianroots.com/wp-content/uploads/2020/01/DSC_0054.jpeg', // High-quality peanut chikki
  },
  {
    id: 2,
    title: 'Strawberry Delight',
    subtitle: 'Fruity Crunch Chikki',
    price: '₹149',
    rating: '5.0',
    img: 'https://delicacysweets.com/public/uploads/all/p5sS0MKi6sJO1mhljUNiia8ILmisdUixdzx0XM8s.png', // Strawberry chikki
  },
  {
    id: 3,
    title: 'Mango Fusion',
    subtitle: 'Seasonal Mango Flavor',
    price: '₹179',
    rating: '5.0',
    img: 'https://d3pi03i22pjpvc.cloudfront.net/images/product/400.400/bikaji_mangodryfruit_n.webp', // Mango dry fruit chikki
  },
  {
    id: 4,
    title: 'Chocolate Crunch',
    subtitle: 'Rich Cocoa Coated',
    price: '₹199',
    rating: '5.0',
    img: 'https://img-global.cpcdn.com/recipes/62bd75c0b4ff9176/1200x630cq80/photo.jpg', // Chocolate peanut chikki
  },
  // Bonus item for better scrolling
  {
    id: 5,
    title: 'Pistachio Premium',
    subtitle: 'Rich Green Nut Bliss',
    price: '₹229',
    rating: '5.0',
    img: 'https://www.indianmarketus.com/cdn/shop/products/52CC4982-6B46-4173-93EC-1FB13EEC6036_-_Devanshi_Shah_2048x2048.jpg?v=1571733800', // Pista chikki
  },
];

export default function PopularItems() {
  const [liked, setLiked] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);

  const toggleLike = (id) => {
    setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const toggleCart = (id) => {
    setAddedToCart((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-32 bg-[var(--bg-main)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-main)]">
            Our Popular Picks
          </h2>
          <p className="mt-6 text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Handcrafted with love using premium jaggery and finest nuts — authentic taste, irresistible crunch.
          </p>
        </motion.div>

        {/* Horizontal Scrollable Carousel */}
        <div className="relative group">
          {/* Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex gap-10 overflow-x-auto scrollbar-hide scroll-smooth px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -16, transition: { duration: 0.4 } }}
                className="flex-shrink-0 w-80 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Image Section */}
                <div className="relative h-80 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[var(--text-main)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center justify-between mt-6">
                    <p className="text-3xl font-extrabold text-[var(--secondary)]">
                      {item.price}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="text-sm font-medium text-[var(--text-muted)]">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleCart(item.id)}
                      className="flex items-center gap-3 bg-[var(--accent)] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
                    >
                      {addedToCart.includes(item.id) ? (
                        <CartSolid className="w-5 h-5" />
                      ) : (
                        <ShoppingCartIcon className="w-5 h-5" />
                      )}
                      {addedToCart.includes(item.id) ? 'Added' : 'Add to Cart'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(item.id)}
                      className="p-3 bg-[var(--bg-card)] rounded-full shadow-md"
                    >
                      {liked.includes(item.id) ? (
                        <HeartSolid className="w-6 h-6 text-red-500" />
                      ) : (
                        <HeartIcon className="w-6 h-6 text-[var(--primary)]" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop Arrows (appear on hover) */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur shadow-xl hover:scale-110 transition z-20">
            <ChevronLeftIcon className="w-7 h-7 text-[var(--text-main)]" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur shadow-xl hover:scale-110 transition z-20">
            <ChevronRightIcon className="w-7 h-7 text-[var(--text-main)]" />
          </button>
        </div>
      </div>
    </section>
  );
}