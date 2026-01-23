import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = "https://sweet-backend-nhwt.onrender.com/api";

const OfferSection = () => {
  const [offerData, setOfferData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`${API_BASE}/offer/active`);

        if (!res.ok) {
          throw new Error("Failed to fetch offer");
        }

        const result = await res.json();

        if (result.active && result.offer) {
          setOfferData(result.offer);
        } else {
          setOfferData(null);
        }
      } catch (err) {
        console.error("Offer fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();

    const interval = setInterval(fetchOffer, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fallback values when no active offer
  const displayTime = offerData?.timeLeft || {
    days: 95,
    hours: 16,
    minutes: 32,
    seconds: 15,
  };

  const headline = offerData?.headline || "STRAWBERRY CHOCOLATE CHIKKI";
  const description =
    offerData?.description ||
    "Made with jaggery, nuts, and lots of love. Perfect for a healthy snack!";
  const ctaText = offerData?.ctaLabel || "ORDER NOW";
  const priceTagSrc = offerData?.priceTag || "/offer_tag.png";
  const priceAlt = offerData?.displayPrice || "Price ₹199";

  const mobileBg =
    offerData?.mobileBackground || "chikki_offer_banner_mobile.png";
  const desktopBg = offerData?.desktopBackground || "chikki_banner_offer.png";

  // ─── Product link logic ───────────────────────────────────────────────
  const productId = offerData?.relatedProduct?._id || offerData?.relatedProduct;
  const productLink = productId ? `/product/${productId}` : null;

  // Optional fallback route if no product is linked
  const fallbackLink = "/products"; // ← change this to your shop / all products page
  const finalCtaLink = productLink || fallbackLink;

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (loading || !offerData) {
    return null;
  }

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-10"
      style={{ backgroundImage: `url('${mobileBg}')` }}
    >
      {/* Desktop BG */}
      <div
        className="hidden sm:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${desktopBg}')` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#fffaf3]/30"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* ================= MOBILE VIEW ================= */}
        <motion.div
          className="sm:hidden h-[470px] flex flex-col justify-between px-4 py-6 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <motion.div className="text-center" variants={fadeUp}>
            <h2 className="text-4xl -mt-9 font-extrabold text-[#d99a2b] tracking-wide">
              {headline}
            </h2>
            <div className="w-16 h-[2px] bg-[#d99a2b] mx-auto my-5"></div>
            <p className="mt-2 text-sm text-[#6b4b3a] leading-relaxed">
              {description}
            </p>
          </motion.div>

          <motion.div className="text-center" variants={fadeUp}>
            <div className="flex justify-center items-center mt-40 mb-4 gap-2 text-[#3a2416]">
              {[
                { label: "D", value: displayTime.days },
                { label: "H", value: displayTime.hours },
                { label: "M", value: displayTime.minutes },
                { label: "S", value: displayTime.seconds },
              ].map((item, index) => (
                <React.Fragment key={item.label}>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{item.value}</div>
                    <div className="text-[11px] tracking-widest opacity-70">
                      {item.label}
                    </div>
                  </div>
                  {index !== 3 && (
                    <div className="text-[#3a2416] text-lg font-light opacity-40 mx-1">
                      |
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile CTA – now clickable */}
            {finalCtaLink ? (
              <a href={finalCtaLink} className="block w-full">
                <motion.button
                  className="px-6 py-2.5 bg-[#5a2d14] text-white text-sm font-bold rounded-md w-full hover:bg-[#3a1b0d] transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {ctaText}
                </motion.button>
              </a>
            ) : (
              <motion.button
                className="px-6 py-2.5 bg-[#5a2d14] text-white text-sm font-bold rounded-md w-full opacity-70 cursor-not-allowed"
                disabled
              >
                {ctaText}
              </motion.button>
            )}
          </motion.div>

          {/* Mobile Price Tag */}
          <motion.img
            src={priceTagSrc}
            alt={priceAlt}
            className="absolute top-19 -right-5 w-[150px] sm:hidden rotate-[6deg] drop-shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* ================= DESKTOP VIEW ================= */}
        <motion.div
          className="hidden sm:block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <motion.h2
            className="text-3xl md:text-3xl font-extrabold mt-9 text-[#d99a2b] tracking-wide"
            variants={fadeUp}
          >
            {headline}
          </motion.h2>

          <div className="w-24 h-[2px] bg-[#d99a2b] mx-auto my-4"></div>

          <motion.p
            className="mt-4 max-w-xl mx-auto text-base text-[#6b4b3a] leading-relaxed"
            variants={fadeUp}
          >
            {description.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </motion.p>

          <div className="max-w-md mx-auto my-5 -mb-4 h-px bg-gradient-to-r from-transparent via-[#d8cfc4] to-transparent"></div>

          <motion.div
            className="mt-8 flex justify-center items-center gap-6 text-[#3a2416] font-semibold"
            variants={fadeUp}
          >
            {[
              { label: "DAYS", value: displayTime.days },
              { label: "HOURS", value: displayTime.hours },
              { label: "MINUTES", value: displayTime.minutes },
              { label: "SECONDS", value: displayTime.seconds },
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                <div className="text-center min-w-[70px]">
                  <div className="text-3xl font-bold">{item.value}</div>
                  <div className="text-xs tracking-widest mt-1">
                    {item.label}
                  </div>
                </div>
                {index !== 3 && (
                  <div className="text-xl font-light opacity-40">|</div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          <div className="max-w-md mx-auto my-5 h-px bg-gradient-to-r from-transparent via-[#d8cfc4] to-transparent"></div>

          {/* Desktop CTA – now clickable */}
          {finalCtaLink ? (
            <a href={finalCtaLink} className="inline-block">
              <motion.button
                className="mt-2 mb-10 px-10 py-3 bg-[#5a2d14] text-white text-base font-bold rounded-md hover:bg-[#3a1b0d] transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {ctaText}
              </motion.button>
            </a>
          ) : (
            <motion.button
              className="mt-2 mb-10 px-10 py-3 bg-[#5a2d14] text-white text-base font-bold rounded-md opacity-70 cursor-not-allowed"
              disabled
            >
              {ctaText}
            </motion.button>
          )}
        </motion.div>

        {/* Desktop Price Tag with infinite float */}
        <motion.img
          src={priceTagSrc}
          alt={priceAlt}
          className="absolute -top-2 right-3 w-[250px] rotate-[6deg] drop-shadow-lg hidden sm:block"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default OfferSection;
