import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useShop } from "../../context/ShopContext";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function PopularItems() {
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState({}); // temporary visual feedback
  const [selectedWeights, setSelectedWeights] = useState({}); // track per-product weight

  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  // Fetch popular products
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/products/popular/`);
        setProducts(res.data || []);
        // initialize selected weight as first variant for each product
        const initialWeights = {};
        res.data.forEach((p) => {
          if (p.weights?.length) initialWeights[p._id] = p.weights[0];
        });
        setSelectedWeights(initialWeights);
      } catch (err) {
        console.error("Failed to load popular products:", err);
        toast.error("Couldn't load popular items");
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  // Auto-play only on mobile
  useEffect(() => {
    let interval;

    const startAutoPlay = () => {
      if (window.innerWidth < 768 && products.length > 0) {
        interval = setInterval(() => {
          setIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
        }, 4000);
      }
    };

    startAutoPlay();

    const handleResize = () => {
      clearInterval(interval);
      startAutoPlay();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [products.length]);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));

  const nextSlide = () =>
    setIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));

  const getVisibleItems = (count = 4) => {
    if (!products.length) return [];
    const visible = [];
    for (let i = 0; i < count; i++) {
      visible.push(products[(index + i) % products.length]);
    }
    return visible;
  };

  const handleAddToCart = async (product) => {
    const variant = selectedWeights[product._id];
    if (!variant?.weight || !variant?.price) {
      toast.warn("Please select a valid weight variant");
      return;
    }

    const key = `${product._id}-${variant.weight}`;
    setAdding((prev) => ({ ...prev, [key]: true }));

    try {
      await addToCart(product, variant, 1);
    } catch (err) {
      // handled in context
    } finally {
      setTimeout(() => {
        setAdding((prev) => ({ ...prev, [key]: false }));
      }, 1500);
    }
  };

  if (loading) {
    return (
      <section className="py-10 -mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[15px] text-[var(--text-muted)]">
            Loading popular picks...
          </p>
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="py-10 -mt-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-[42px] font-extrabold text-[var(--text-main)]">
            Our Popular Picks
          </h2>
          <p className="mt-4 text-[15px] text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            Handcrafted chikki made with premium ingredients, loved for its
            authentic taste and perfect crunch.
          </p>
        </motion.div>

        {/* Desktop Carousel */}
        <div
          className="hidden md:flex relative rounded-[60px] px-1 py-15 -mt-8 bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: "url('Group 57.png')" }}
        >
          <button
            onClick={prevSlide}
            className="absolute -left-11 top-1/2 -translate-y-1/2 w-19 h-19 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronLeftIcon className="w-8 h-8 text-[var(--text-main)]" />
          </button>

          <div className="flex grid-cols-4 gap-6 mt-13 justify-center">
            {getVisibleItems(4).map((product, i) => {
              const wishlisted = isInWishlist(product._id);
              const variant =
                selectedWeights[product._id] || product.weights?.[0];
              const isAdding = adding[`${product._id}-${variant?.weight}`];

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="relative bg-white rounded-[28px] px-6 pt-28 pb-7 shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 4 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 w-25 h-25 bg-[var(--bg-card)] rounded-full shadow-md flex items-center justify-center"
                  >
                    <img
                      src={product.images?.[0]?.url || "/placeholder.png"}
                      alt={product.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </motion.div>
                  <h3 className="text-[15px] -mt-12 font-semibold text-[var(--text-main)]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {product.subtitle ||
                      product.description?.slice(0, 35) ||
                      "Premium handmade"}
                  </p>

                  {/* Weight Selection */}
                  <div className="flex gap-2 mt-2">
                    {product.weights?.map((w) => (
                      <button
                        key={w.weight}
                        className={`px-2 py-1 rounded-full border text-xs ${
                          variant.weight === w.weight
                            ? "bg-[var(--accent)] text-white"
                            : "bg-white text-[var(--primary)]"
                        }`}
                        onClick={() =>
                          setSelectedWeights((prev) => ({
                            ...prev,
                            [product._id]: w,
                          }))
                        }
                      >
                        {w.weight} - ₹{w.sellingPrice || w.price}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-[22px] font-bold text-[var(--secondary)]">
                      ₹{variant.sellingPrice || variant.price}
                    </p>
                    <motion.button
                      onClick={() => toggleWishlist(product, variant?.weight)}
                      whileHover={{ scale: 1.15 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow transition ${
                        wishlisted
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--bg-card)] text-[var(--primary)]"
                      }`}
                    >
                      <HeartIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <div className="flex items-center justify-between mt-4 -ml-2 gap-3">
                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 text-xs px-5 py-1.5 rounded-full font-semibold shadow transition ${
                        isAdding
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--bg-soft)] text-[var(--primary)] hover:brightness-105"
                      }`}
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                      {isAdding ? "Adding..." : "Add to Cart"}
                    </motion.button>
                    <span className="text-xs font-medium text-[var(--text-muted)]">
                      ★ {product.rating || "5.0"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            className="absolute -right-11 top-1/2 -translate-y-1/2 w-19 h-19 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronRightIcon className="w-8 h-8 text-[var(--text-main)]" />
          </button>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden py-1 px-4">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {products.map((product) => {
                const variant =
                  selectedWeights[product._id] || product.weights?.[0];
                const wishlisted = isInWishlist(product._id);
                const isAdding = adding[`${product._id}-${variant?.weight}`];

                return (
                  <div key={product._id} className="w-full flex-shrink-0 px-2">
                    <motion.div
                      className="bg-white rounded-2xl shadow-md p-2 text-center"
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden bg-[var(--bg-card)] shadow-md"
                      >
                        <img
                          src={product.images?.[0]?.url || "/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      <h3 className="text-lg font-bold text-[var(--text-main)]">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] mt-1">
                        {product.subtitle || "Handcrafted delight"}
                      </p>

                      {/* Weight Selection */}
                      <div className="flex gap-2 mt-2 justify-center flex-wrap">
                        {product.weights?.map((w) => (
                          <button
                            key={w.weight}
                            className={`px-2 py-1 rounded-full border text-xs ${
                              variant.weight === w.weight
                                ? "bg-[var(--accent)] text-white"
                                : "bg-white text-[var(--primary)]"
                            }`}
                            onClick={() =>
                              setSelectedWeights((prev) => ({
                                ...prev,
                                [product._id]: w,
                              }))
                            }
                          >
                            {w.weight} - ₹{w.sellingPrice || w.price}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-[var(--secondary)]">
                          ₹{variant.sellingPrice || variant.price}
                        </span>
                        <motion.button
                          onClick={() =>
                            toggleWishlist(product, variant?.weight)
                          }
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
                            wishlisted
                              ? "bg-[var(--accent)] text-white"
                              : "bg-[var(--bg-card)] text-[var(--primary)]"
                          }`}
                        >
                          <HeartIcon className="w-5 h-5" />
                        </motion.button>
                      </div>

                      <div className="flex items-center justify-between mt-5">
                        <motion.button
                          onClick={() => handleAddToCart(product)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all ${
                            isAdding
                              ? "bg-[var(--accent)] text-white"
                              : "bg-[var(--bg-soft)] text-[var(--primary)]"
                          }`}
                        >
                          <ShoppingCartIcon className="w-5 h-5" />
                          {isAdding ? "Adding..." : "Add to Cart"}
                        </motion.button>

                        <span className="text-sm font-medium text-[var(--text-muted)]">
                          ★ {product.rating || "5.0"}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`transition-all duration-300 ${
                  i === index
                    ? "w-10 h-3 bg-[var(--primary)] rounded-full"
                    : "w-3 h-3 bg-gray-300 rounded-full"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
