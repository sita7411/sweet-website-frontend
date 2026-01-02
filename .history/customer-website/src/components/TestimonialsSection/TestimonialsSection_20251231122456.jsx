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

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-[var(--text-main)] mb-20">
          What Our Customers Say
        </h2>

        <div className="relative flex justify-center items-center h-[420px]">

          {testimonials.map((item, index) => {

            const position =
              index === active
                ? "center"
                : index === (active - 1 + testimonials.length) % testimonials.length
                ? "left"
                : index === (active + 1) % testimonials.length
                ? "right"
                : "hidden";

            const variants = {
              center: {
                opacity: 1,
                scale: 1.08,
                x: 0,
                zIndex: 10,
              },
              left: {
                opacity: 0.45,
                scale: 0.92,
                x: -260,
                zIndex: 5,
              },
              right: {
                opacity: 0.45,
                scale: 0.92,
                x: 260,
                zIndex: 5,
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                x: 0,
                zIndex: 0,
              },
            };

            return (
              <motion.div
                key={index}
                variants={variants}
                animate={position}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute w-full max-w-md rounded-3xl p-8 sm:p-10
                bg-gradient-to-br from-white via-[var(--bg-card)] to-[var(--bg-soft)]
                backdrop-blur-xl"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
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

                {/* Text */}
                <p className="text-lg text-[var(--text-muted)] mb-7">
                  {item.text}
                </p>

                {/* User */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    className="w-14 h-14 rounded-full border border-[var(--primary)]"
                  />
                  <div>
                    <h4 className="font-semibold text-[var(--text-main)]">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[var(--secondary)]">
                      {item.role}
                    </p>
                  </div>
                </div>
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
