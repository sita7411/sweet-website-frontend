import { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import {
  StarIcon as OutlineStar,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";

// ──────────────────────────────────────────────
// Rating Component (with safety)
const RatingStars = ({ rating }) => {
  const num = Number(rating);
  const value = !isNaN(num) && num >= 0 && num <= 5 ? num : 0;

  const fullStars = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 mt-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <SolidStar key={i} className="w-4 h-4 text-yellow-500" />
      ))}
      {hasHalf && (
        <OutlineStar key="half" className="w-4 h-4 text-yellow-500" />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <OutlineStar key={`empty-${i}`} className="w-4 h-4 text-yellow-300" />
      ))}
      <span className="text-xs text-[#8a6a52] ml-1">
        {value ? value.toFixed(1) : "—"}
      </span>
    </div>
  );
};

// Reusable Best Seller Button
const BestSellerButton = ({ isBestSeller, onClick }) => (
  <button
    onClick={onClick}
    className={clsx(
      "inline-flex items-center gap-1 px-4 py-1 rounded-full font-semibold transition-shadow duration-200",
      isBestSeller
        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md hover:shadow-lg"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300",
    )}
  >
    <SolidStar className="w-4 h-4" />
    {isBestSeller ? "Best Seller" : "Mark"}
  </button>
);

// Desktop Table Row
const ProductRow = ({ product, onToggle }) => (
  <tr className="border-t hover:bg-[#fff6ec] transition-all">
    <td className="p-3 flex items-center gap-3">
      <img
        src={product.images?.[0] || "https://via.placeholder.com/80"}
        alt={product.name}
        className="w-12 h-12 rounded-lg border object-cover"
      />
      <div>
        <span className="font-medium">{product.name}</span>
        <RatingStars rating={product.rating} />
      </div>
    </td>
    <td className="p-3 text-center font-semibold">
      ₹{(product.weights?.[0]?.sellingPrice || 0).toFixed(2)}
    </td>
    <td className="p-3 text-center">
      <BestSellerButton
        isBestSeller={product.bestSeller}
        onClick={() => onToggle(product._id)}
      />
    </td>
  </tr>
);

// Mobile Card
const ProductCard = ({ product, onToggle }) => (
  <div className="p-4 bg-white shadow-lg rounded-xl mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full transition hover:shadow-xl">
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <img
        src={product.images?.[0] || "https://via.placeholder.com/80"}
        alt={product.name}
        className="w-14 h-14 rounded-lg border object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{product.name}</p>
        <p className="text-xs text-[#8a6a52]">
          ₹{(product.weights?.[0]?.sellingPrice || 0).toFixed(2)}
        </p>
        <RatingStars rating={product.rating} />
      </div>
    </div>
    <div className="mt-3 sm:mt-0 sm:ml-3 flex-shrink-0">
      <BestSellerButton
        isBestSeller={product.bestSeller}
        onClick={() => onToggle(product._id)}
      />
    </div>
  </div>
);

export default function BestSellerProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 8; // better for admin dashboard
  const MAX_BEST_SELLERS = 8;

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      toast.error("Admin login required");
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://sweet-backend-nhwt.onrender.com/api/products",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          },
        );

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            toast.error("Session expired. Please login again.");
            localStorage.removeItem("adminToken");
            return;
          }
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();

        const productList = Array.isArray(result.data) ? result.data : [];

        setProducts(productList);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [adminToken]);

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const bestSellerCount = products.filter((p) => p.bestSeller).length;

  const handleToggleBestSeller = async (id) => {
    if (!adminToken) {
      toast.error("Admin authentication required");
      return;
    }

    const target = products.find((p) => p._id === id);
    if (!target) return;

    if (!target.bestSeller && bestSellerCount >= MAX_BEST_SELLERS) {
      toast.error(
        `You can only select ${MAX_BEST_SELLERS} best seller products!`,
      );
      return;
    }

    const previousProducts = [...products];

    // Optimistic update
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, bestSeller: !p.bestSeller } : p)),
    );

    try {
      const response = await fetch(
        `https://sweet-backend-nhwt.onrender.com/api/products/${id}/best-seller`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Failed to update best seller status");
      }

      // Update from server response
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...data.product } : p)),
      );

      toast.success(
        data.message ||
          (target.bestSeller
            ? "Removed from best seller products"
            : "Added to best seller products"),
      );
    } catch (error) {
      console.error("Toggle best seller error:", error);
      toast.error(error.message || "Failed to update");

      // Rollback
      setProducts(previousProducts);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#8a6a52]">
        Loading products...
      </div>
    );
  }

  if (!adminToken) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-medium">
        Please login as admin to manage best seller products.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] px-4 md:px-10 py-6 text-[#3a2416] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Best Seller Products
          </h1>
          <p className="text-sm text-[#8a6a52] mt-1">
            Select up to {MAX_BEST_SELLERS} products to feature as best sellers
            ({bestSellerCount}/{MAX_BEST_SELLERS} selected)
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm mt-4">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a6a52]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search products..."
          className="w-full pl-10 pr-3 py-2 text-sm sm:text-base rounded-lg bg-[#fff1db] focus:outline-none focus:ring-2 focus:ring-[#c63b2f] transition"
        />
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block bg-white rounded-xl border border-[#fff1db] shadow mt-4">
        <table className="min-w-full text-sm">
          <thead className="bg-[#fff1db] text-xs uppercase text-[#8a6a52] tracking-wide">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Best Seller</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((p) => (
              <ProductRow
                key={p._id}
                product={p}
                onToggle={handleToggleBestSeller}
              />
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end p-4 border-t border-[#fff1db]">
          <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border bg-white hover:bg-[#fff1db] disabled:opacity-50 transition"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={clsx(
                  "px-2 sm:px-3 py-1 rounded-lg border transition",
                  page === currentPage
                    ? "bg-[#c63b2f] text-white font-semibold"
                    : "bg-white hover:bg-[#fff1db]",
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border bg-white hover:bg-[#fff1db] disabled:opacity-50 transition"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden mt-4 space-y-4">
        {paginatedProducts.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onToggle={handleToggleBestSeller}
          />
        ))}

        {/* Mobile Pagination */}
        <div className="flex justify-end mt-6">
          <div className="flex items-center gap-1 sm:gap-2 text-sm">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border bg-white hover:bg-[#fff1db] disabled:opacity-50 transition"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={clsx(
                  "px-2 sm:px-3 py-1 rounded-lg border transition",
                  page === currentPage
                    ? "bg-[#c63b2f] text-white font-semibold"
                    : "bg-white hover:bg-[#fff1db]",
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border bg-white hover:bg-[#fff1db] disabled:opacity-50 transition"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
