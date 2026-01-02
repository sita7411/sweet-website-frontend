'use client';
import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Riya Patel",
      role: "Healthy Snack Lover",
      text: "The peanut chikki is perfectly crunchy and not overly sweet.",
      img: "/images/user1.png",
    },
    {
      name: "Amit Shah",
      role: "Fitness Enthusiast",
      text: "Best guilt-free snack. Clean ingredients and amazing taste.",
      img: "/images/user2.png",
    },
    {
      name: "Neha Joshi",
      role: "Home Baker",
      text: "Loved the jaggery flavor. Feels completely homemade.",
      img: "/images/user3.png",
    },
    {
      name: "Rahul Mehta",
      role: "Food Blogger",
      text: "Crunch, packaging and taste – everything feels premium.",
      img: "/images/user4.png",
    },
    {
      name: "Sneha Kulkarni",
      role: "Nutrition Coach",
      text: "Perfect energy snack. No artificial aftertaste at all.",
      img: "/images/user5.png",
    },
    {
      name: "Kunal Verma",
      role: "Office Professional",
      text: "I keep these chikkis with me daily. Very filling!",
      img: "/images/user6.png",
    },
  ];

  const [active, setActive] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Show only 3 cards
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      visible.push(
        testimonials[(active + i + testimonials.length) % testimonials.length]
      );
    }
    return visible;
  };

  return (
    <section className="py-32 px-6 bg-[var(--bg-main)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-[var(--text-main)] mb-20">
          What Our Customers Say
        </h2>

        {/* Cards */}
        <div className="flex justify-center items-center gap-10">
          {getVisibleTestimonials().map((item, index) => {
            const isCenter = index === 1;

            return (
              <div
                key={index}
                className={`
                  relative w-full max-w-md rounded-3xl p-10
                  transition-all duration-500 ease-out
                  backdrop-blur-xl
                  bg-gradient-to-br from-white via-[var(--bg-card)] to-[var(--bg-soft)]
                  ${isCenter
                    ? "scale-110 border border-[var(--primary)] shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
                    : "scale-95 opacity-50 blur-[0.4px]"}
                `}
              >
                {/* Quote */}
                <div className="absolute -top-6 -right-6 text-[6rem] text-[var(--primary)] opacity-5 select-none">
                  ❝
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[var(--accent)] text-xl">★</span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg leading-relaxed text-[var(--text-muted)] mb-10">
                  {item.text}
                </p>

                {/* Divider */}
                <div className="w-12 h-[2px] bg-[var(--primary)] mb-8 rounded-full" />

                {/* User */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border border-[var(--primary)] overflow-hidden shadow-md">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[var(--text-main)]">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[var(--secondary)]">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Bottom Accent */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-[var(--primary)] rounded-full opacity-80" />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-16">
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
