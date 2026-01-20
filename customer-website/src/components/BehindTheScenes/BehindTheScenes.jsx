// BehindTheScenes.jsx
import React from "react";
import { motion } from "framer-motion";

const BehindTheScenes = () => {
  return (
    <section className="relative py-20 px-6 md:px-16 lg:px-24  overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col w-full lg:w-1/2 space-y-6 text-left"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--text-main)] leading-tight">
            How Our Chikkis <br />
            <span className="relative text-[var(--primary)]">
              Come to Life
              <span className="absolute left-0 -bottom-2 w-full h-1.5 bg-[var(--accent)]/70 rounded-full -z-10" />
            </span>
          </h2>

          <p className="text-[var(--text-muted)] text-lg md:text-xl leading-relaxed">
            From selecting the finest ingredients to the careful handmade preparation, every step
            is crafted with love and attention to detail.
          </p>

          <p className="text-[var(--text-muted)] text-lg md:text-xl leading-relaxed">
            Our expert team ensures that each batch is perfect — keeping tradition alive while
            adding a modern touch to Marvel Crunch.
          </p>
        </motion.div>

        {/* Right Side: Blob-shaped Video */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative w-full lg:w-1/2 h-[400px] md:h-[500px] flex items-center justify-center"
        >
          <div
            className="relative w-full h-full overflow-hidden
              rounded-[38%_62%_46%_54%/55%_45%_55%_45%]
              shadow-2xl border border-white/10"
          >
            <video
              src="/making-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-[1.05] transition-transform duration-500 hover:scale-105"
            />
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10 pointer-events-none" />
          </div>

          {/* Decorative Blur Circle */}
          <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-[var(--primary)]/20 rounded-full blur-3xl -z-10" />
        </motion.figure>

      </div>
    </section>
  );
};

export default BehindTheScenes;
