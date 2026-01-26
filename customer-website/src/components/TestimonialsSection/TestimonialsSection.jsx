"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_BASE = "https://sweet-backend-nhwt.onrender.com";

export default function TestimonialsSection({ productId }) {
  // Hardcoded fallback (used only if no real reviews are found)
  const fallbackTestimonials = [
    {
      name: "Riya Patel",
      role: "Healthy Snack Lover",
      text: "The peanut chikki is perfectly crunchy and not overly sweet.",
      stars: 5,
    },
    {
      name: "Amit Shah",
      role: "Fitness Enthusiast",
      text: "Best guilt-free snack. Clean ingredients and amazing taste.",
      stars: 4,
    },
    {
      name: "Neha Joshi",
      role: "Home Baker",
      text: "Loved the jaggery flavor. Feels completely homemade.",
      stars: 5,
    },
    {
      name: "Rahul Mehta",
      role: "Food Blogger",
      text: "Crunch, packaging and taste – everything feels premium.",
      stars: 4,
    },
    {
      name: "Sneha Kulkarni",
      role: "Nutrition Coach",
      text: "Perfect energy snack. No artificial aftertaste at all.",
      stars: 5,
    },
    {
      name: "Kunal Verma",
      role: "Office Professional",
      text: "I keep these chikkis with me daily. Very filling!",
      stars: 4,
    },
  ];

  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);

      try {
        let url;
        let source = "";

        if (productId) {
          // Product-specific reviews
          url = `${BACKEND_BASE}/api/reviews/product/${productId}`;
          source = "product";
        } else {
          // Homepage → recent reviews from all products
          url = `${BACKEND_BASE}/api/reviews/all?limit=12&page=1`;
          source = "all";
        }

        console.log(`Fetching ${source} reviews from: ${url}`);

        const res = await axios.get(url);

        console.log("API status:", res.status);
        console.log("API full response:", res.data);

        if (res.data?.success && Array.isArray(res.data.reviews)) {
          const mapped = res.data.reviews
            .filter((r) => (r.comment || "").trim().length > 0) // skip empty comments
            .map((r) => ({
              name: r.guestName || r.user?.name || "Anonymous",
              role:
                r.title ||
                (r.isVerifiedPurchase ? "Verified Buyer" : "Customer"),
              text: r.comment.trim(),
              stars: Number(r.rating) || 0,
            }))
            .filter((item) => item.stars >= 1 && item.text.length > 10); // basic quality filter

          console.log(`Loaded ${mapped.length} valid reviews`);

          if (mapped.length > 0) {
            setTestimonials(mapped);
          } else {
            console.log("No valid reviews found → using fallback");
            setTestimonials(fallbackTestimonials);
          }
        } else {
          console.log("Response not successful or no reviews array → fallback");
          setTestimonials(fallbackTestimonials);
        }
      } catch (err) {
        console.error("Failed to load reviews:", err.message);
        if (err.response) {
          console.error("Status:", err.response.status);
          console.error("Server message:", err.response.data);
        }
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, [productId]);

  // Auto-rotate carousel
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000); // changed to 5 seconds for better readability

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const visibleTestimonials = [
    testimonials[(active - 1 + testimonials.length) % testimonials.length],
    testimonials[active],
    testimonials[(active + 1) % testimonials.length],
  ];

  if (loading) {
    return (
      <section className="py-24 px-4 text-center">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading real customer stories...
        </p>
      </section>
    );
  }

  return (
    <section className="py-24 -mt-23 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-[var(--text-main)] mb-20">
          What Our Customers Say
        </h2>

        {testimonials.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No reviews available yet. Be the first to share your experience!
          </p>
        ) : (
          <>
            <div className="flex justify-center items-center gap-6 md:gap-10 flex-wrap md:flex-nowrap">
              {visibleTestimonials.map((item, index) => {
                const isCenter = index === 1;
                return (
                  <motion.div
                    key={`${item?.name || "review"}-${index}`}
                    animate={{
                      opacity: isCenter ? 1 : 0.5,
                      scale: isCenter ? 1.08 : 0.9,
                      y: isCenter ? 0 : 16,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className={`
                      relative w-full max-w-[380px] sm:max-w-md rounded-3xl p-6 sm:p-10
                      bg-gradient-to-br from-white via-gray-50 to-gray-100/80
                      backdrop-blur-md border border-gray-200/60
                      shadow-xl
                      ${isCenter ? "z-10 shadow-2xl border-[var(--primary)]/40" : "hidden sm:block"}
                    `}
                  >
                    <div className="absolute -top-5 -right-5 text-8xl text-[var(--primary)] opacity-[0.07] select-none pointer-events-none">
                      ❝
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-2xl ${i < (item?.stars || 0) ? "text-yellow-500" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {item?.stars?.toFixed(1) || "–"} / 5
                      </span>
                    </div>

                    <p className="text-base sm:text-xs leading-relaxed text-gray-700 mb-8 min-h-[90px]">
                      {item?.text}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white font-bold text-xl flex items-center justify-center shadow-md">
                        {item?.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <h4 className="font-semibold text-base sm:text-lg text-gray-900">
                          {item?.name}
                        </h4>
                        <p className="text-sm text-gray-600">{item?.role}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-4 h-4 bg-[var(--primary)] shadow-md"
                      : "w-3 h-3 bg-gray-300 hover:bg-[var(--primary)]/60"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
