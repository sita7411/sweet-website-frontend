'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function SubscribeSection() {
  return (
    <motion.section
      className="px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-24 flex justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="relative w-full max-w-6xl min-h-[400px] sm:min-h-[440px] md:min-h-[480px]">

        {/* SVG BACKGROUND */}
        <motion.svg
          viewBox="0 0 882 491"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full z-0"
          preserveAspectRatio="none"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <defs>
            <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFF3E3" />
              <stop offset="35%" stopColor="#FFF7EC" />
              <stop offset="100%" stopColor="#EDD6B8" />
            </linearGradient>

            <clipPath id="shapeClip">
              <path d="M784.5 15.5C834.5 15.5 866.5 47.5 866.5 97.5C866.5 137.5 842.5 157.5 881.5 197.5V292.5C842.5 332.5 866.5 352.5 866.5 392.5C866.5 442.5 834.5 474.5 784.5 474.5H97.5C47.5 474.5 15.5 442.5 15.5 392.5C15.5 352.5 39.5 332.5 0.5 292.5V197.5C39.5 157.5 15.5 137.5 15.5 97.5C15.5 47.5 47.5 15.5 97.5 15.5H784.5Z" />
            </clipPath>
          </defs>

          <path
            d="M784.5 15.5C834.5 15.5 866.5 47.5 866.5 97.5C866.5 137.5 842.5 157.5 881.5 197.5V292.5C842.5 332.5 866.5 352.5 866.5 392.5C866.5 442.5 834.5 474.5 784.5 474.5H97.5C47.5 474.5 15.5 442.5 15.5 392.5C15.5 352.5 39.5 332.5 0.5 292.5V197.5C39.5 157.5 15.5 137.5 15.5 97.5C15.5 47.5 47.5 15.5 97.5 15.5H784.5Z"
            fill="url(#bgGradient)"
          />

          {/* LEFT IMAGE */}
          <image
            href="/side-img 3.png"
            x="0"
            y="0"
            width="440"
            height="491"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#shapeClip)"
            className="opacity-90"
          />

          {/* RIGHT IMAGE */}
          <image
            href="/side-img 2 (1).png"
            x="440"
            y="0"
            width="442"
            height="491"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#shapeClip)"
            className="hidden sm:block"
          />
        </motion.svg>

        {/* CONTENT */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full px-4 sm:px-6 md:px-20 py-12 sm:py-16 md:py-24">

          {/* LEFT CONTENT */}
          <motion.div
            className="flex flex-col justify-center gap-5 max-w-md mx-auto md:mx-0"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--text-main)] leading-tight"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Subscribe to <br /> Our Newsletter
            </motion.h2>

            <motion.p
              className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed"
              initial={{ y: 15, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              viewport={{ once: true }}
            >
              Get fresh chikki updates, special offers & healthy treats straight to your inbox.
            </motion.p>

            {/* INPUT + BUTTON */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mt-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } },
              }}
            >
              {/* INPUT */}
              <motion.div
                className="flex items-center bg-[#3a2416] rounded-full px-4 py-3 w-full sm:w-80 shadow-md"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Mail size={18} className="text-white opacity-70 mr-2 sm:mr-3" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent outline-none text-white placeholder:text-gray-300 text-sm w-full"
                />
              </motion.div>

              {/* BUTTON */}
              <motion.button
                className="bg-[var(--primary)] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium shadow-md whitespace-nowrap"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT SPACE (hidden on small screens) */}
          <div className="hidden md:block" />
        </div>
      </div>
    </motion.section>
  );
}
