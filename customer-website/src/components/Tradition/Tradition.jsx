// RootedInTradition.jsx
import { motion } from "framer-motion";

export default function RootedInTradition() {
  return (
    <section className="py-20 sm:py-24 lg:py-20 bg-transparent">
      <div className="
        max-w-7xl mx-auto px-4 sm:px-6
        grid grid-cols-1 md:grid-cols-2
        gap-14 md:gap-20
        items-center
      ">

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="/thalli.png"
            alt="Traditional Chikki Craftsmanship"
            className="
              w-full
              max-w-[260px] sm:max-w-sm md:max-w-md
              drop-shadow-2xl
            "
          />
        </motion.div>

        {/* Narrative */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } }
          }}
          className="
            max-w-xl mx-auto md:mx-0
            text-center md:text-left
          "
        >

          {/* Eyebrow */}
          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="
              inline-flex items-center justify-center
              px-4 sm:px-5 py-2 mb-4 sm:mb-5
              text-[10px] sm:text-xs
              tracking-[0.25em] sm:tracking-[0.3em]
              uppercase
              text-[var(--secondary)]
              bg-[var(--bg-soft)]
              rounded-full
              shadow-[0_0_0_6px_rgba(242,183,5,0.08)]
            "
          >
            ABOUT MARVEL CRUNCH
          </motion.span>

          {/* Heading */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="
              text-3xl sm:text-4xl md:text-5xl
              font-serif
              text-[var(--primary)]
              leading-snug
              mb-5 sm:mb-6
            "
          >
            Taste the Crunch,
            <br />Feel the Marvel
          </motion.h2>

          {/* Divider */}
          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
              origin-left
              w-14 sm:w-20
              h-[3px]
              bg-[var(--accent)]
              rounded-full
              mb-6 sm:mb-8
              mx-auto md:mx-0
            "
          />

          {/* Paragraph */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            className="
              text-[var(--text-muted)]
              text-sm sm:text-base
              leading-relaxed
              mb-5 sm:mb-6
            "
          >
            At Marvel Crunch Chikki, we craft premium traditional chikki made from
            freshly roasted peanuts and pure jaggery. Every bite delivers rich flavor,
            satisfying crunch, and the authentic taste of heritage you can trust.
          </motion.p>

          {/* Closing Line */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            className="
              text-[var(--text-main)]
              text-sm sm:text-base
              font-medium
              tracking-wide
            "
          >
            No shortcuts. No compromises.
            <br className="hidden sm:block" />
            Only honest ingredients and enduring tradition.
          </motion.p>

        </motion.div>
      </div>
    </section>
  );
}
