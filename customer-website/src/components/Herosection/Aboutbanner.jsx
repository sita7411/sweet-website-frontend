import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative bg-[#fff6e8] overflow-hidden pt-20 md:pt-24 pb-36 md:pb-48">

      {/* Floating Icons (hidden on small screens) */}
      <img
        src="/nuts.png"
        className="hidden md:block absolute bottom-32 left-6 md:left-10 w-40 md:w-60 opacity-24 animate-float"
        alt=""
      />
      <img
        src="/sesame.png"
        className="hidden md:block absolute bottom-32 right-6 md:right-10 w-40 md:w-60 opacity-24 animate-floatSlow"
        alt=""
      />

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 text-center relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#c63b2f] font-semibold md:-mt-10 text-lg sm:text-xl md:text-2xl tracking-wide mb-2"
        >
          Our Story
        </motion.h3>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3a2416]"
        >
          Tradition of Taste & Purity
        </motion.h1>

        <p className="max-w-xl sm:max-w-2xl mx-auto mt-4 mb-10 text-sm sm:text-base text-[#8a6a52] leading-relaxed">
          At Marvel Crunch Chikki, we honor tradition with every bite. Crafted using premium ingredients and time-tested techniques, our chikkis deliver authentic taste, rich texture, and the trusted quality our customers love.
        </p>
      </div>

      {/* Center Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-1 md:-bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <img
          src="/aboutimg.png"
          alt="Traditional Chikki"
          className="w-[400px] sm:w-[500px]  md:w-[490px]"
        />
      </motion.div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          className="block w-full h-20 sm:h-24 md:h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39 56.44C187.48 76.15 0 32.77 0 32.77V120h1200V0s-153.68 72.05-305.24 79.28C764.59 86.77 545.2 23.52 321.39 56.44z"
            className="fill-white"
          />
        </svg>
      </div>

    </section>
  );
}
