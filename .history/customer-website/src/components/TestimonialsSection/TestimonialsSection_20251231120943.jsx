'use client';
import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michelle Smith",
      role: "CEO - Weblabs",
      text: "This plugin is amazing with the current version. I am impressed and will be using it again.",
      img: "/images/user1.png",
    },
    {
      name: "David Anderson",
      role: "CEO - Softwares",
      text: "The support and quality are top-notch. Highly recommend to any business!",
      img: "/images/user2.png",
    },
    {
      name: "Alex Johnson",
      role: "CTO - Amazon",
      text: "A game-changing plugin that boosted our productivity and customer engagement.",
      img: "/images/user3.png",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-[var(--text-main)] mb-20">
          Hear From Our Satisfied Clients
        </h2>

        {/* Slider container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full px-4"
              >
                <div className="bg-white rounded-3xl p-12 shadow-xl relative">
                  {/* Quote inside card */}
                  <div className="text-[5rem] text-[var(--primary)] opacity-10 absolute top-6 left-6 select-none">
                    ❝
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <span
                        key={idx}
                        className="text-[var(--accent)] text-lg transition-transform duration-300 hover:scale-125"
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-8 relative z-10">
                    {item.text}
                  </p>

                  {/* User info */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-16 h-16 rounded-full border-2 border-[var(--primary)] overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--text-main)] text-base">
                        {item.name}
                      </h4>
                      <p className="text-[var(--secondary)] text-sm">{item.role}</p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-[var(--primary)] rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`rounded-full transition-all duration-300 ${
                  current === idx
                    ? "w-4 h-4 bg-[var(--primary)] shadow-lg"
                    : "w-3 h-3 bg-[var(--secondary)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
