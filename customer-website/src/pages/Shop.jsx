import { useState, useEffect } from "react";
import {
  HeartIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ────────────────────────────────────────────────
// CONFIG
// ────────────────────────────────────────────────
const API_BASE =
  import.meta.env.VITE_API_BASE || "https://sweet-backend-ukfd.onrender.com";
const PRODUCTS_PER_PAGE = 6;

export default function ProductPage() {
  // ── Context (called only once, at top level) ──
  const { addToCart, cartItems, updateQty, toggleWishlist, isInWishlist } =
    useShop();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeWeight, setActiveWeight] = useState("All");
  const [selectedVariant, setSelectedVariant] = useState({}); // { productId: "200g" }
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState("Default sorting");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fallback categories
  const fallbackCategories = [
    "All",
    "Bestseller",
    "Seasonal",
    "Healthy",
    "Premium",
    "New",
  ];
  const weights = ["All", "200g", "500g", "1kg"];

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/api/products`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const response = await res.json();

        // Safely extract the array of products
        let productList = [];
        if (Array.isArray(response)) {
          productList = response;
        } else if (response && Array.isArray(response.data)) {
          productList = response.data;
        } else {
          console.warn("Unexpected API response shape:", response);
        }

        setProducts(productList);

        // Calculate highest price for slider
        const allPrices = productList.flatMap(
          (p) => p.weights?.map((w) => w.sellingPrice || w.price || 0) || [],
        );
        const highest = allPrices.length > 0 ? Math.max(...allPrices) : 2000;
        setMaxPrice(highest + 200);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const formatPrice = (num) => "₹" + (num || 0).toLocaleString("en-IN");

  const dynamicCategories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];
  const categories =
    dynamicCategories.length > 2 ? dynamicCategories : fallbackCategories;

  // ── Helpers ──
  const getCartQty = (productId, selectedWeight) => {
    const found = cartItems.find(
      (item) => item.productId === productId && item.weight === selectedWeight,
    );
    return found?.qty ?? 0;
  };

  // Filtering
  const filteredProducts = products.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const searchMatch = (p.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const hasWeight =
      activeWeight === "All" ||
      p.weights?.some((w) => w.weight === activeWeight);
    const hasAffordableVariant = p.weights?.some(
      (w) => (w.sellingPrice || 0) <= maxPrice,
    );
    return catMatch && searchMatch && hasWeight && hasAffordableVariant;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const getMinPrice = (p) =>
      Math.min(...(p.weights?.map((w) => w.sellingPrice || 0) || [Infinity]));

    switch (sortBy) {
      case "Price: Low → High":
        return getMinPrice(a) - getMinPrice(b);
      case "Price: High → Low":
        return getMinPrice(b) - getMinPrice(a);
      case "Name: A → Z":
        return (a.name || "").localeCompare(b.name || "");
      case "Name: Z → A":
        return (b.name || "").localeCompare(a.name || "");
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsFilterOpen(false);
  };

  const handleFilterAction = () => {
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  // ────────────────────────────────────────────────
  // Sidebar Content (shared between desktop & mobile)
  // ────────────────────────────────────────────────
  const SidebarContent = () => {
    const topProducts = products
      .filter(
        (p) =>
          p.category === "Bestseller" ||
          (p.tags && p.tags.includes("Bestseller")),
      )
      .slice(0, 3);

    return (
      <div className="space-y-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />

        <div>
          <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">
            Categories
          </h3>
          <ul className="space-y-3 text-sm text-[var(--text-muted)]">
            {categories
              .filter((c) => c !== "All")
              .map((cat) => (
                <li
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    handleFilterAction();
                  }}
                  className="flex justify-between cursor-pointer hover:text-[var(--text-main)] transition"
                >
                  <span>{cat}</span>
                  <span>
                    ({products.filter((p) => p.category === cat).length})
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">
            Weight
          </h3>
          <ul className="space-y-3 text-sm text-[var(--text-muted)]">
            {weights
              .filter((w) => w !== "All")
              .map((w) => (
                <li
                  key={w}
                  onClick={() => {
                    setActiveWeight(w);
                    handleFilterAction();
                  }}
                  className="cursor-pointer hover:text-[var(--text-main)] transition"
                >
                  {w}
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">
            Filter by Price
          </h3>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full"
          />
          <p className="text-sm text-[var(--text-muted)] mt-2">
            Up to {formatPrice(maxPrice)}
          </p>
        </div>

        {/* Top Products */}
        <div>
          <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">
            Top Products
          </h3>
          <div className="space-y-4">
            {topProducts.map((p) => {
              const minPrice = Math.min(
                ...(p.weights?.map((w) => w.sellingPrice) || [0]),
              );
              return (
                <div key={p._id} className="flex gap-3 items-center">
                  <img
                    src={p.images?.[0] || "/placeholder.jpg"}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {formatPrice(minPrice)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Bestseller", "Seasonal", "Healthy", "Premium", "New"].map(
              (t) => (
                <span
                  key={t}
                  onClick={() => {
                    setActiveCategory(t);
                    handleFilterAction();
                  }}
                  className="px-3 py-1 text-xs border rounded-full hover:bg-[var(--accent)] hover:text-white cursor-pointer transition"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    );
  };

  // ────────────────────────────────────────────────
  // Variant & Sort Dropdowns
  // ────────────────────────────────────────────────
  function VariantDropdown({ item, selected, onSelect }) {
    const [open, setOpen] = useState(false);
    const variants = item.weights || [];

    if (variants.length <= 1) return null;

    return (
      <div className="relative w-full mt-3">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-[var(--bg-card)] text-sm font-medium text-[var(--text-main)] shadow-sm flex justify-between items-center hover:border-[var(--text-main)] transition"
        >
          {selected || variants[0]?.weight || "Select weight"}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="w-5 h-5 text-[var(--text-muted)]" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-20 w-full mt-1 bg-[var(--bg-card)] border border-gray-300 rounded-2xl shadow-lg overflow-hidden"
            >
              {variants.map((v) => (
                <li
                  key={v.weight}
                  onClick={() => {
                    onSelect(v.weight);
                    setOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer transition flex justify-between ${
                    selected === v.weight
                      ? "bg-[var(--bg-soft)] font-semibold"
                      : "hover:bg-[var(--bg-soft)]"
                  }`}
                >
                  <span>{v.weight}</span>
                  <span>{formatPrice(v.sellingPrice)}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }

  function SortDropdown() {
    const [open, setOpen] = useState(false);
    const options = [
      "Default sorting",
      "Price: Low → High",
      "Price: High → Low",
      "Name: A → Z",
      "Name: Z → A",
    ];

    return (
      <div className="relative w-full sm:w-48">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-[var(--bg-card)] text-sm font-medium text-[var(--text-main)] shadow-sm flex justify-between items-center hover:border-[var(--text-main)]"
        >
          {sortBy}
          <motion.span animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDownIcon className="w-5 h-5 text-[var(--text-muted)]" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-20 w-full mt-1 bg-[var(--bg-card)] border border-gray-300 rounded-2xl shadow-lg overflow-hidden"
            >
              {options.map((opt) => (
                <li
                  key={opt}
                  onClick={() => {
                    setSortBy(opt);
                    setOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer transition ${
                    sortBy === opt
                      ? "bg-[var(--bg-soft)] font-semibold"
                      : "hover:bg-[var(--bg-soft)]"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="/chikki_banner_offer.png"
          alt="Products Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--secondary)]/20" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_3px_8px_rgba(107,63,38,0.6)]"
          >
            Products
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex justify-center items-center gap-3 text-white text-sm sm:text-base"
          >
            <Link
              to="/"
              className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200"
            >
              Home
            </Link>
            <span className="font-bold">\\</span>
            <span className="font-semibold">Products</span>
          </motion.div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile filter trigger */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <p className="text-sm text-[var(--text-muted)]">
              Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
              {Math.min(currentPage * PRODUCTS_PER_PAGE, sortedProducts.length)}{" "}
              of {sortedProducts.length} results
            </p>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-card)] rounded-2xl shadow border border-gray-300 text-sm font-medium"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filters
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:col-span-1 sticky top-20 space-y-6">
              <SidebarContent />
            </aside>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {isFilterOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                  />
                  <motion.aside
                    initial={{ x: -320 }}
                    animate={{ x: 0 }}
                    exit={{ x: -320 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-16 left-0 bottom-0 z-50 w-80 bg-[var(--bg-main)] shadow-2xl overflow-y-auto px-6 py-8"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-bold text-[var(--text-main)]">
                        Filters
                      </h2>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="p-2 rounded-full bg-[var(--bg-soft)] hover:bg-gray-200 transition"
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>
                    <SidebarContent />
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            {/* Main content area */}
            <div className="lg:col-span-4">
              {/* Desktop sort */}
              <div className="hidden lg:flex justify-between items-center mb-6">
                <p className="text-sm text-[var(--text-muted)]">
                  Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
                  {Math.min(
                    currentPage * PRODUCTS_PER_PAGE,
                    sortedProducts.length,
                  )}{" "}
                  of {sortedProducts.length} results
                </p>
                <SortDropdown />
              </div>

              {/* Mobile sort */}
              <div className="lg:hidden mb-6">
                <SortDropdown />
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {displayedProducts.map((item, i) => {
                  const id = item._id;
                  const selectedWeight =
                    selectedVariant[id] || item.weights?.[0]?.weight || null;
                  const variant =
                    item.weights?.find((w) => w.weight === selectedWeight) ||
                    item.weights?.[0] ||
                    {};
                  const price = variant.sellingPrice || 0;

                  // ── Use REAL cartItems from context ──
                  const cartItem = cartItems.find(
                    (ci) => ci.productId === id && ci.weight === selectedWeight,
                  );
                  const cartQty = cartItem?.qty ?? 0;

                  const inWishlist = isInWishlist(id);

                  return (
                    <div
                      key={id}
                      className="rounded-3xl p-5 relative shadow-lg bg-[var(--bg-card)] hover:shadow-2xl transition"
                    >
                      {/* Wishlist Heart */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();

                          const selectedWeight =
                            selectedVariant[id] ||
                            item.weights?.[0]?.weight ||
                            null;

                          if (!selectedWeight) {
                            toast.warn("Weight select karo pehle!", {
                              position: "top-right",
                              autoClose: 2000,
                            });
                            return;
                          }

                          // Ab dono bhejo: product aur selected weight
                          toggleWishlist(item, selectedWeight);

                          setTimeout(() => {
                            toast.success(
                              isInWishlist(id)
                                ? "Removed from Wishlist"
                                : "Added to Wishlist",
                              { position: "top-right", autoClose: 2000 },
                            );
                          }, 300);
                        }}
                        animate={{ scale: isInWishlist(id) ? 1.18 : 1 }}
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                        className={`absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center shadow-md ring-1 ring-black/10 transition-colors duration-200 ${
                          isInWishlist(id)
                            ? "bg-[var(--accent)] text-white shadow-lg"
                            : "bg-white/90 text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white"
                        }`}
                      >
                        <HeartIcon className="w-4 h-4" />
                      </motion.button>

                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6 }}
                        className="relative"
                      >
                        <Link to={`/product/${id}`}>
                          <div className="relative h-40 mb-4 overflow-hidden rounded-2xl cursor-pointer">
                            <img
                              src={item.images?.[0] || "/placeholder.jpg"}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        </Link>

                        <Link to={`/product/${id}`}>
                          <h3 className="text-base font-semibold text-[var(--text-main)] cursor-pointer hover:text-[var(--accent)] transition-colors">
                            {item.name}
                          </h3>
                        </Link>

                        <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">
                          {item.shortDescription}
                        </p>

                        <VariantDropdown
                          item={item}
                          selected={selectedWeight}
                          onSelect={(val) =>
                            setSelectedVariant((prev) => ({
                              ...prev,
                              [id]: val,
                            }))
                          }
                        />

                        <div className="flex items-center justify-between mt-5">
                          <p className="text-xl font-bold text-[var(--secondary)]">
                            {formatPrice(price)}
                          </p>

                          {cartQty === 0 ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!selectedWeight) {
                                  toast.warn("Please select a weight first", {
                                    position: "top-right",
                                    autoClose: 2000,
                                  });
                                  return;
                                }
                                addToCart(item, variant, 1);
                                toast.success(
                                  `${item.name} (${variant.weight}) added to cart!`,
                                  {
                                    position: "top-right",
                                    autoClose: 2000,
                                    theme: "light",
                                  },
                                );
                              }}
                              disabled={!selectedWeight}
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                                selectedWeight
                                  ? "bg-[var(--primary)] text-white hover:bg-opacity-90"
                                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                              }`}
                            >
                              <ShoppingCartIcon className="w-4 h-4" />
                              Add to Cart
                            </button>
                          ) : (
                            <div className="flex items-center gap-4 bg-[var(--bg-main)] px-5 py-2 rounded-full shadow-inner">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newQty = cartQty - 1;
                                  updateQty(id, selectedWeight, newQty);
                                  if (newQty > 0) {
                                    toast.info(`Updated to ${newQty}`, {
                                      autoClose: 1200,
                                    });
                                  } else {
                                    toast.info("Removed from cart", {
                                      autoClose: 1500,
                                    });
                                  }
                                }}
                                className="text-2xl font-bold text-[var(--primary)] hover:scale-110 transition"
                              >
                                −
                              </button>
                              <span className="text-lg font-semibold min-w-[2ch] text-center">
                                {cartQty}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newQty = cartQty + 1;
                                  updateQty(id, selectedWeight, newQty);
                                  toast.info(`Updated to ${newQty}`, {
                                    autoClose: 1200,
                                  });
                                }}
                                className="text-2xl font-bold text-[var(--primary)] hover:scale-110 transition"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2 text-sm font-medium">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-md text-[var(--text-muted)] hover:text-[var(--accent)] disabled:opacity-40"
                  >
                    ‹ Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (p) =>
                        p <= 4 ||
                        p > totalPages - 3 ||
                        Math.abs(p - currentPage) <= 1,
                    )
                    .map((p, idx, arr) =>
                      idx > 0 && p - arr[idx - 1] > 1 ? (
                        <span key={`dots-${idx}`} className="px-2">
                          …
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => goToPage(p)}
                          className={`w-9 h-9 rounded-md ${
                            currentPage === p
                              ? "bg-[var(--accent)] text-white"
                              : "hover:bg-[var(--bg-soft)]"
                          }`}
                        >
                          {p}
                        </button>
                      ),
                    )}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-md text-[var(--accent)] hover:text-[var(--primary)] disabled:opacity-40"
                  >
                    Next ›
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
