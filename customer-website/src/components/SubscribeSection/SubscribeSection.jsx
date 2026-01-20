'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function SubscribeSection() {
  return (
    <>
      {/* ================= DESKTOP SUBSCRIBE ================= */}
      <motion.section
        className="hidden md:flex px-4 md:px-10 py-16 md:py-24 justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="relative w-full max-w-6xl min-h-[420px] md:min-h-[480px]">

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

            <image
              href="/side-img 3.png"
              x="0"
              y="0"
              width="440"
              height="491"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#shapeClip)"
              opacity="0.9"
            />

            <image
              href="/side-img 2 (1).png"
              x="440"
              y="0"
              width="442"
              height="491"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#shapeClip)"
            />
          </motion.svg>

          {/* CONTENT */}
          <div className="relative z-10 grid grid-cols-2 h-full px-20 py-24">
            <div className="flex flex-col justify-center gap-6 max-w-md">
              <h2 className="text-5xl font-serif text-[var(--text-main)]">
                Subscribe to <br /> Our Newsletter
              </h2>
              <p className="text-[var(--text-muted)]">
                Get fresh chikki updates, special offers & healthy treats straight to your inbox.
              </p>

              <div className="flex gap-4">
                <div className="flex items-center bg-[#3a2416] rounded-full px-5 py-4 w-80">
                  <Mail size={18} className="text-white mr-3 opacity-70" />
                  <input
                    className="bg-transparent outline-none text-white w-full"
                    placeholder="Enter your email"
                  />
                </div>
                <button className="bg-[var(--primary)] text-white px-10 py-4 rounded-full">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================= MOBILE SUBSCRIBE (CAPSULE) ================= */}
<motion.section
  className="md:hidden px-4 py-16"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <motion.div
    className="relative max-w-md mx-auto rounded-[40px] overflow-hidden shadow-xl"
    initial={{ scale: 0.92, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
  >
    {/* IMAGE BACKGROUND */}
    <div className="absolute inset-0">
      <img
        src="/side-img 3.png"
        className="w-full h-full object-cover opacity-80"
        alt=""
      />
      <img
        src="/side-img 2 (1).png"
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
        alt=""
      />
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />
    </div>

    {/* CONTENT INSIDE CAPSULE */}
    <div className="relative z-10 px-6 py-10  text-center text-white flex flex-col gap-4">
      <h2 className="text-2xl font-serif leading-snug">
        Subscribe to <br /> Our Newsletter
      </h2>

      <p className="text-sm text-white/90">
        Get fresh chikki updates & special offers straight to your inbox.
      </p>

      {/* INPUT */}
      <div className="flex items-center bg-white/95 rounded-full px-5 py-3 mt-4">
        <Mail size={16} className="text-[#3a2416] mr-3" />
        <input
          type="email"
          placeholder="Enter your email"
          className="bg-transparent outline-none text-sm w-full text-[#3a2416]"
        />
      </div>

      {/* BUTTON */}
      <motion.button
        className="bg-[var(--primary)] text-white py-3 rounded-full font-medium mt-2"
        whileTap={{ scale: 0.95 }}
      >
        Subscribe
      </motion.button>
    </div>
  </motion.div>
</motion.section>
    </>
  );
}
