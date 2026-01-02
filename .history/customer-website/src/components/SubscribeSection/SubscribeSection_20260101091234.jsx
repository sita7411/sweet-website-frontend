'use client';

import { motion } from 'framer-motion';

export default function SubscribeSection() {
  return (
    <motion.section
      className="px-4 md:px-10 py-20 flex justify-center items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="relative w-full max-w-6xl min-h-[460px]">

  <motion.svg
  viewBox="0 0 882 491"
  xmlns="http://www.w3.org/2000/svg"
  className="absolute inset-0 w-full h-full z-0"
  preserveAspectRatio="none"
  initial={{ scale: 0.96, opacity: 0 }}
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

  {/* SHAPE BG */}
  <path
    d="M784.5 15.5C834.5 15.5 866.5 47.5 866.5 97.5C866.5 137.5 842.5 157.5 881.5 197.5V292.5C842.5 332.5 866.5 352.5 866.5 392.5C866.5 442.5 834.5 474.5 784.5 474.5H97.5C47.5 474.5 15.5 442.5 15.5 392.5C15.5 352.5 39.5 332.5 0.5 292.5V197.5C39.5 157.5 15.5 137.5 15.5 97.5C15.5 47.5 47.5 15.5 97.5 15.5H784.5Z"
    fill="url(#bgGradient)"
  />

  {/* LEFT IMAGE */}
  <image
    href="/unnamed().png"
    x="0"
    y="0"
    width="440"
    height="491"
    preserveAspectRatio="xMidYMid slice"
    clipPath="url(#shapeClip)"
    opacity="0.9"
  />

  {/* RIGHT IMAGE */}
  <image
    href="/image 60.png"
    x="440"
    y="0"
    width="442"
    height="491"
    preserveAspectRatio="xMidYMid slice"
    clipPath="url(#shapeClip)"
  />
</motion.svg>


        {/* CONTENT */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full px-10 md:px-24 py-27">
          <motion.div
            className="flex flex-col justify-center gap-6"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)]">
              Subscribe to <br /> Our Newsletter
            </h2>

            <p className="text-[var(--text-muted)] max-w-sm">
              Get fresh chikki updates, offers & healthy treats straight to your inbox.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } },
              }}
            >
              <motion.div
                className="flex items-center bg-[#3a2416] rounded-full px-5 py-3.5 w-full sm:w-80"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <span className="text-white mr-3 opacity-70">✉</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent outline-none text-white placeholder:text-gray-300 text-sm w-full"
                />
              </motion.div>

              <motion.button
                className="bg-[var(--primary)] text-white px-10 py-3.5 rounded-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>

          <div />
        </div>
      </div>
    </motion.section>
  );
}
