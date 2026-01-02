"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Handmade Fresh Chikki",
    description: "Every piece is freshly made with love using traditional recipes.",
    icon: "chikki.png",
  },
  {
    id: 2,
    title: "Nutritious & Healthy",
    description: "Packed with nuts, seeds, and natural jaggery for a healthy snack.",
    icon: "nuts_icon.png",
  },
  {
    id: 3,
    title: "Variety of Flavors",
    description: "From classic peanut to pistachio and chocolate, we have it all!",
    icon: "flavors.png",
  },
  {
    id: 4,
    title: "Special Offers Daily",
    description: "Enjoy exciting discounts and promotions every day.",
    icon: "discount.png",
  },
];

// container animation
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// item animation
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function FeaturesSection() {
  return (
    <section className="bg-white py-12 -mt-10  sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 text-center"
        >
          {features.map((itemData) => (
            <motion.div
              key={itemData.id}
              variants={item}
              className="flex flex-col items-center px-4 sm:px-0"
            >
              {/* Icon */}
              <motion.img
                src={itemData.icon}
                alt={itemData.title}
                className="w-16 h-16 sm:w-20 sm:h-20 opacity-90 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text-main)] mb-1">
                {itemData.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-[220px] sm:max-w-[180px]">
                {itemData.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
    