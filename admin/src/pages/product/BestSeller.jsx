import { useState } from "react";
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

const allProducts = [
  { id: 1, img: "https://via.placeholder.com/80", name: "Uxflow T-Shirt #10 – White", price: "$1.35", bestSeller: false, rating: 4.5 },
  { id: 2, img: "https://via.placeholder.com/80", name: "Uxflow T-Shirt #10 – Black", price: "$1.35", bestSeller: false, rating: 4.0 },
  { id: 3, img: "https://via.placeholder.com/80", name: "Uxflow T-Shirt #19 – White", price: "$1.35", bestSeller: false, rating: 3.5 },
  { id: 4, img: "https://via.placeholder.com/80", name: "Uxflow T-Shirt #20 – Blue", price: "$1.50", bestSeller: false, rating: 5.0 },
  { id: 5, img: "https://via.placeholder.com/80", name: "Uxflow T-Shirt #21 – Red", price: "$1.60", bestSeller: false, rating: 4.2 },
  { id: 6, img: "https://via.placeholder.com/80", name: "Uxflow T-Shirt #22 – Green", price: "$1.70", bestSeller: false, rating: 3.8 },
  { id: 7, img: "https://via.placeholder.com/80", name: "Uxflow T-Shirt #23 – Yellow", price: "$1.80", bestSeller: false, rating: 4.7 },
];



// Rating Component
const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 mt-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <SolidStar key={i} className="w-4 h-4 text-yellow-500" />
      ))}
      {halfStar && <OutlineStar key="half" className="w-4 h-4 text-yellow-500" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <OutlineStar key={`empty-${i}`} className="w-4 h-4 text-yellow-300" />
      ))}
      <span className="text-xs text-[#8a6a52] ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

// Reusable Button
const BestSellerButton = ({ isBestSeller, onClick }) => (
  <button
    onClick={onClick}
    className={clsx(
      "inline-flex items-center gap-1 px-4 py-1 rounded-full font-semibold transition-shadow duration-200",
      isBestSeller
        ? "bg-[var(--primary)] text-white shadow-md hover:shadow-lg"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
        src={product.img}
        alt={product.name}
        className="w-12 h-12 rounded-lg border object-cover"
      />
      <div>
        <span className="font-medium">{product.name}</span>
        <RatingStars rating={product.rating} />
      </div>
    </td>
    <td className="p-3 text-center font-semibold">{product.price}</td>
    <td className="p-3 text-center">
      <BestSellerButton isBestSeller={product.bestSeller} onClick={() => onToggle(product.id)} />
    </td>
  </tr>
);

// Mobile Card
const ProductCard = ({ product, onToggle }) => (
  <div className="p-4 bg-white shadow-lg rounded-xl mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full transition hover:shadow-xl">
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <img
        src={product.img}
        alt={product.name}
        className="w-14 h-14 rounded-lg border object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{product.name}</p>
        <p className="text-xs text-[#8a6a52]">{product.price}</p>
        <RatingStars rating={product.rating} />
      </div>
    </div>
    <div className="mt-3 sm:mt-0 sm:ml-3 flex-shrink-0">
      <BestSellerButton isBestSeller={product.bestSeller} onClick={() => onToggle(product.id)} />
    </div>
  </div>
);

export default function BestSellerProducts() {
  const [products, setProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const bestSellerCount = products.filter((p) => p.bestSeller).length;

  const handleToggleBestSeller = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          if (!p.bestSeller && bestSellerCount >= 4) {
            toast.error("You can only select 4 best seller products!");
            return p;
          }
          toast.success(!p.bestSeller ? "Added to best seller products" : "Removed from best seller products");
          return { ...p, bestSeller: !p.bestSeller };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] px-4 md:px-10 py-6 text-[#3a2416] space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Best Seller Products</h1>
          <p className="text-sm text-[#8a6a52] mt-1">
            Select up to 4 products to feature as best sellers.
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
              <ProductRow key={p.id} product={p} onToggle={handleToggleBestSeller} />
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
                    : "bg-white hover:bg-[#fff1db]"
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border bg-white hover:bg-[#fff1db] disabled:opacity-50 transition"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden mt-4">
        {paginatedProducts.map((p) => (
          <ProductCard key={p.id} product={p} onToggle={handleToggleBestSeller} />
        ))}

        {/* Mobile Pagination */}
        <div className="flex justify-end mt-4">
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
                    : "bg-white hover:bg-[#fff1db]"
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
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
