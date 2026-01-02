'use client';

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 1,
    name: 'Michele Smith',
    designation: 'CEO at Webelax',
    rating: 5,
    text: 'This plugin is amazing with the current version, I can\'t imagine it, how cool will it be when you finish the all!',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 2,
    name: 'David Anderson',
    designation: 'CEO at SoftwareX',
    rating: 5,
    text: 'This plugin is amazing with the current version, I can\'t imagine it, how cool will it be when you finish the all!',
    img: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    id: 3,
    name: 'Michele Smith',
    designation: 'CEO at Amazon.com',
    rating: 5,
    text: 'This plugin is amazing with the current version, I can\'t imagine it, how cool will it be when you finish the all!',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="bg-[var(--bg-main)] py-16 relative">
      <h2 className="text-[var(--text-main)] text-3xl font-semibold text-center mb-12">
        Why Customer Love Us ?
      </h2>

      <div className="max-w-6xl mx-auto relative flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 bg-[var(--primary)] text-white p-2 rounded-full hover:scale-105 transition-transform"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div className="flex overflow-hidden w-full">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className={`min-w-full transition-transform duration-500 ${
                index === current ? 'translate-x-0' : 'translate-x-full absolute'
              }`}
            >
              <div className="bg-[var(--bg-card)] p-8 rounded-xl shadow-md mx-4 text-center relative">
                <div className="text-[var(--accent)] text-3xl mb-4">“</div>
                <p className="text-[var(--text-muted)] mb-6">{t.text}</p>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-[var(--text-main)] font-semibold">{t.name}</h4>
                    <p className="text-[var(--text-muted)] text-sm">{t.designation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 bg-[var(--primary)] text-white p-2 rounded-full hover:scale-105 transition-transform"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === idx ? 'bg-[var(--primary)]' : 'bg-[var(--secondary)]'
            }`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
}
