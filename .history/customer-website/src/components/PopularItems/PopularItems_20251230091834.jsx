'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

const items = [
  {
    title: 'Berries Salad',
    price: '₹199',
    rating: '5.0',
    bg: 'bg-[#f4a6a0]',
    img: 'pista.png',
  },
  {
    title: 'Healthy Salad',
    price: '₹149',
    rating: '5.0',
    bg: 'bg-[#f7b267]',
    img: 'stwabarry_chikki.png',
  },
  {
    title: 'Nutri Bowl',
    price: '₹179',
    rating: '5.0',
    bg: 'bg-[#8fd694]',
    img: 'mango.png',
  },
  {
    title: 'Fresh Mix',
    price: '₹199',
    rating: '5.0',
    bg: 'bg-[#9fa8ff]',
    img: '/images/salad2.png',
  },
];

export default function PopularItems() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto">

        {/* ===== Heading ===== */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--text-main)]">
            Our Popular Dishes
          </h2>
          <p className="mt-4 text-[var(--text-muted)] max-w-xl mx-auto">
            Handcrafted with premium ingredients, loved by customers across India
          </p>
        </div>

        {/* ===== Slider Box ===== */}
        <div className="relative bg-[var(--bg-soft)] rounded-[60px] px-20 py-16 shadow-lg">

          {/* Left Arrow */}
          <button className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[var(--accent)] transition">
            <ChevronLeftIcon className="w-6 h-6 text-[var(--text-main)]" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-8">
            {items.map((item, index) => (
              <div
                key={index}
                className={`relative ${item.bg} rounded-[28px] px-6 pt-20 pb-6 text-white shadow-xl`}
              >
                {/* Image */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-white rounded-full shadow-md flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-2xl font-bold mt-2">{item.price}</p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-5">
                  
                  {/* Order Button */}
                  <button className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white text-sm px-5 py-2 rounded-full font-medium transition shadow">
                    Order Now
                  </button>

                  {/* Wishlist + Rating */}
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition">
                      <HeartIcon className="w-5 h-5 text-[var(--primary)]" />
                    </button>
                    <span className="text-sm font-medium">★ {item.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[var(--accent)] transition">
            <ChevronRightIcon className="w-6 h-6 text-[var(--text-main)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
