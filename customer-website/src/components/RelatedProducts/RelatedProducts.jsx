import { useState, useEffect } from "react";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useShop } from "../../context/ShopContext";

const MAX_DISPLAY = 8;

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState({});
  const [selectedWeights, setSelectedWeights] = useState({});

  const { addToCart, cartItems, updateQty, removeFromCart } = useShop();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://sweet-backend-nhwt.onrender.com/api/products",
        );

        if (!res.ok) throw new Error("Failed to load products");

        const result = await res.json();
        const list = Array.isArray(result.data) ? result.data : result || [];

        const limitedList = list.slice(0, MAX_DISPLAY);
        setProducts(limitedList);

        const initialWeights = {};
        limitedList.forEach((p) => {
          if (p.weights?.length > 0) {
            initialWeights[p._id] = p.weights[0].weight;
          }
        });
        setSelectedWeights(initialWeights);
      } catch (err) {
        console.error("Related products fetch error:", err);
        toast.error("Could not load related products");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const goToProduct = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  const handleWeightChange = (productId, weight) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  const getCurrentPrice = (product) => {
    const selected = selectedWeights[product._id];
    if (!selected) return 0;
    const variant = product.weights?.find((w) => w.weight === selected);
    return variant?.sellingPrice || variant?.mrp || variant?.price || 0;
  };

  const getDisplayImage = (product) => {
    return product.images?.[0] || "/placeholder.png";
  };

  if (loading) {
    return (
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg text-[var(--text-muted)] animate-pulse">
            Loading related products...
          </p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg text-[var(--text-muted)]">
            No related products available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-[40px] font-extrabold text-[var(--text-main)]">
            Top Picks for You
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)]">
            Discover more flavours that have earned the trust and loyalty of our
            customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item, i) => {
            const selectedWeight = selectedWeights[item._id];
            const currentPrice = getCurrentPrice(item);
            const displayImage = getDisplayImage(item);

            const cartItem = cartItems.find(
              (ci) =>
                String(ci.productId) === String(item._id) &&
                String(ci.weight) === String(selectedWeight),
            );
            const quantity = cartItem?.qty || 0;

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="
                  rounded-3xl p-5 relative group
                  shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                  hover:shadow-[0_25px_60px_rgba(198,59,47,0.12)]
                  bg-white cursor-pointer
                "
              >
                {item.tag && (
                  <span className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[11px] px-3 py-1 rounded-full z-10">
                    {item.tag}
                  </span>
                )}

                <button
                  onClick={() =>
                    setWishlist((p) => ({ ...p, [item._id]: !p[item._id] }))
                  }
                  className={`
                    absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10
                    transition-all duration-300 shadow-[0_8px_18px_rgba(0,0,0,0.18)] ring-1 ring-black/10
                    ${
                      wishlist[item._id]
                        ? "bg-[var(--accent)] text-white shadow-[0_10px_25px_rgba(198,59,47,0.45)]"
                        : "bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white"
                    }
                  `}
                >
                  <HeartIcon className="w-4 h-4" />
                </button>

                <div onClick={() => goToProduct(item._id)}>
                  <div className="relative h-44 mb-4 flex items-center justify-center overflow-hidden">
                    <motion.img
                      src={displayImage}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-500"
                    />
                    <motion.img
                      src={item.images?.[1] || displayImage}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">
                    {item.shortDescription || "Premium Chikki"}
                  </p>
                </div>

                {item.weights?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.weights.map((w) => (
                      <button
                        key={w.weight}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWeightChange(item._id, w.weight);
                        }}
                        className={`
                          text-xs px-3 py-1.5 rounded-full border transition-all duration-200
                          ${
                            selectedWeight === w.weight
                              ? "bg-[var(--primary)] text-white border-transparent shadow-sm"
                              : "border-gray-300 text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                          }
                        `}
                      >
                        {w.weight}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-5">
                  <p className="text-lg font-bold text-[var(--secondary)]">
                    ₹{currentPrice.toFixed(0)}
                  </p>

                  {quantity === 0 ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!selectedWeight) {
                          toast.warn("Please select a weight first");
                          return;
                        }
                        const selectedVariant = item.weights?.find(
                          (w) => w.weight === selectedWeight,
                        );
                        if (!selectedVariant) {
                          toast.error("Selected variant not found");
                          return;
                        }
                        addToCart(item, selectedVariant, 1);
                      }}
                      className="
                        flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold
                        bg-[var(--bg-soft)] text-[var(--primary)] 
                        hover:bg-[var(--bg-main)] transition
                      "
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-[var(--bg-main)] px-4 py-1.5 rounded-full shadow-inner">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (quantity <= 1) {
                            removeFromCart(item._id, selectedWeight);
                          } else {
                            updateQty(item._id, selectedWeight, quantity - 1);
                          }
                        }}
                        className="text-xl font-bold text-[var(--primary)] hover:scale-110 transition"
                      >
                        −
                      </button>

                      <span className="text-sm font-semibold text-[var(--text-main)] min-w-[2ch] text-center">
                        {quantity}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const selectedVariant = item.weights?.find(
                            (w) => w.weight === selectedWeight,
                          );
                          if (selectedVariant) {
                            addToCart(item, selectedVariant, 1);
                          }
                        }}
                        className="text-xl font-bold text-[var(--primary)] hover:scale-110 transition"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
