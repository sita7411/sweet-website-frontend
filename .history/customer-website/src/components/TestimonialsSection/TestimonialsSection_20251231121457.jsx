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

  // Get only 3 visible cards
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
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-[var(--text-main)] mb-20">
          What Our Customers Say
        </h2>

        {/* ONLY 3 CARDS */}
        <div className="flex justify-center gap-8 items-center">
          {getVisibleTestimonials().map((item, index) => {
            const isCenter = index === 1;

            return (
              <div
                key={index}
                className={`
                  relative bg-white rounded-3xl p-10 w-full max-w-md
                  transition-all duration-500 ease-out
                  ${isCenter
                    ? "scale-105 border-2 border-[var(--primary)] shadow-2xl"
                    : "scale-95 opacity-60"}
                `}
              >
                {/* Quote */}
                <div className="absolute top-6 left-6 text-[4rem] text-[var(--primary)] opacity-10">
                  ❝
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[var(--accent)] text-lg">★</span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                  {item.text}
                </p>

                {/* User */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-[var(--primary)] overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-main)]">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[var(--secondary)]">
                      {item.role}
                    </p>
                  </div>
                </div>

                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--primary)] rounded-full" />
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
