'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function SubscribeSection() {
  return (
    <section className="px-4 md:px-10 py-16 md:py-24 flex justify-center">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-[48px]">

        {/* ================= DESKTOP SVG ================= */}
        <motion.svg
          viewBox="0 0 882 491"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full hidden md:block"
          preserveAspectRatio="xMidYMid slice"
          initial={{ scale: 0.96, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <defs>
            <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFF3E3" />
              <stop offset="35%" stopColor="#FFF7EC" />
              <stop offset="100%" stopColor="#EDD6B8" />
            </linearGradient>

            <clipPath id="shapeClip">
              <path d="M784.5 15.5C834.5 15.5 866.5 47.5 866.5 97.5V392.5C866.5 442.5 834.5 474.5 784.5 474.5H97.5C47.5 474.5 15.5 442.5 15.5 392.5V97.5C15.5 47.5 47.5 15.5 97.5 15.5H784.5Z" />
            </clipPath>
          </defs>

          <path
            d="M784.5 15.5C834.5 15.5 866.5 47.5 866.5 97.5V392.5C866.5 442.5 834.5 474.5 784.5 474.5H97.5C47.5 474.5 15.5 442.5 15.5 392.5V97.5C15.5 47.5 47.5 15.5 97.5 15.5H784.5Z"
            fill="url(#bgGradient)"
          />

          <image
            href="/side-img 3.png"
            x="0"
            y="0"
            width="440"
            height="491"
            clipPath="url(#shapeClip)"
          />
          <image
            href="/side-img 2 (1).png"
            x="440"
            y="0"
            width="442"
            height="491"
            clipPath="url(#shapeClip)"
          />
        </motion.svg>

        {/* ================= MOBILE BG ================= */}
        <div
          className="md:hidden absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/side-img 2 (1).png')" }}
        >
          <div className="absolute inset-0 bg-[#fffaf3]/80" />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative z-10 px-6 sm:px-10 md:px-20 py-16 md:py-24">
          <motion.div
            className="max-w-md space-y-6"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--text-main)] leading-tight">
              Subscribe to <br /> Our Newsletter
            </h2>

            <p className="text-[var(--text-muted)] text-sm sm:text-base">
              Get fresh chikki updates, special offers & healthy treats straight to your inbox.
            </p>

            {/* INPUT + BUTTON (SINGLE CAPSULE LIKE IMAGE) */}
            <div className="flex items-center bg-[#3a2416] rounded-full overflow-hidden shadow-lg w-full max-w-md">
              <div className="flex items-center px-5 gap-2 flex-1">
                <Mail size={18} className="text-white opacity-70" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent outline-none text-white placeholder:text-gray-300 text-sm w-full"
                />
              </div>

              <motion.button
                className="bg-[var(--primary)] text-white px-8 py-4 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
