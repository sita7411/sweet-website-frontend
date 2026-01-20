'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {

  const testimonials = [
    {
      name: "Riya Patel",
      role: "Healthy Snack Lover",
      text: "The peanut chikki is perfectly crunchy and not overly sweet.",
      img: "/images/user1.png",
      stars: 5,
    },
    {
      name: "Amit Shah",
      role: "Fitness Enthusiast",
      text: "Best guilt-free snack. Clean ingredients and amazing taste.",
      img: "/images/user2.png",
      stars: 4,
    },
    {
      name: "Neha Joshi",
      role: "Home Baker",
      text: "Loved the jaggery flavor. Feels completely homemade.",
      img: "/images/user3.png",
      stars: 5,
    },
    {
      name: "Rahul Mehta",
      role: "Food Blogger",
      text: "Crunch, packaging and taste – everything feels premium.",
      img: "/images/user4.png",
      stars: 4,
    },
    {
      name: "Sneha Kulkarni",
      role: "Nutrition Coach",
      text: "Perfect energy snack. No artificial aftertaste at all.",
      img: "/images/user5.png",
      stars: 5,
    },
    {
      name: "Kunal Verma",
      role: "Office Professional",
      text: "I keep these chikkis with me daily. Very filling!",
      img: "/images/user6.png",
      stars: 4,
    },
  ];

  const [active, setActive] = useState(0);

  // Auto slide (smooth, no jump)
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = [
    testimonials[(active - 1 + testimonials.length) % testimonials.length],
    testimonials[active],
    testimonials[(active + 1) % testimonials.length],
  ];

  return (
    <section className="py-26 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-[var(--text-main)] mb-20">
          What Our Customers Say
        </h2>

        <div className="flex justify-center items-center gap-10">

          {visibleTestimonials.map((item, index) => {
            const isCenter = index === 1;

            return (
              <motion.div
                key={item.name}
                animate={{
                  opacity: isCenter ? 1 : 0.45,
                  scale: isCenter ? 1.08 : 0.92,
                  y: isCenter ? 0 : 12,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                }}
                className={`
                  relative w-full max-w-md rounded-3xl p-8 sm:p-10
                  bg-gradient-to-br from-white via-[var(--bg-card)] to-[var(--bg-soft)]
                  backdrop-blur-xl
                  ${isCenter
                    ? "border border-[var(--primary)] shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
                    : "hidden sm:block"}
                `}
              >
                {/* Quote */}
                <div className="absolute -top-6 -right-6 text-[6rem] text-[var(--primary)] opacity-5 select-none">
                  ❝
                </div>

                {/* Stars */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < item.stars
                            ? "text-[var(--accent)]"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-main)]">
                    {item.stars}.0 / 5.0
                  </span>
                </div>

                <p className="text-base sm:text-lg leading-relaxed text-[var(--text-muted)] mb-7">
                  {item.text}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border border-[var(--primary)] overflow-hidden shadow-md">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
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

                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-[var(--primary)] rounded-full opacity-80" />
              </motion.div>
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
