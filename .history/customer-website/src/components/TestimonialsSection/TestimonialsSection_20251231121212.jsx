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

  const [active, setActive] = useState(1);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-[var(--text-main)] mb-20">
          Hear From Our Satisfied Clients
        </h2>

        {/* Cards */}
        <div className="flex justify-center gap-8 items-center">
          {testimonials.map((item, i) => {
            const isActive = i === active;

            return (
              <div
                key={i}
                className={`
                  relative bg-white rounded-3xl p-10 w-full max-w-md
                  transition-all duration-500
                  shadow-lg
                  ${isActive ? "scale-105 border-2 border-[var(--primary)] shadow-2xl" : "scale-95 opacity-70"}
                `}
              >
                {/* Quote */}
                <div className="absolute top-6 left-6 text-[4.5rem] text-[var(--primary)] opacity-10">
                  ❝
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-[var(--accent)] text-lg">★</span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-[var(--text-muted)] text-base leading-relaxed mb-8 relative z-10">
                  {item.text}
                </p>

                {/* User */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-[var(--primary)] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-main)]">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[var(--secondary)]">{item.role}</p>
                  </div>
                </div>

                {/* Accent */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--primary)] rounded-full" />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-14">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all ${
                active === i
                  ? "w-4 h-4 bg-[var(--primary)]"
                  : "w-3 h-3 bg-[var(--secondary)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
