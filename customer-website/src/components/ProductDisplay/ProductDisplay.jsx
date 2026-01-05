import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const product = {
  category: "Chikki",
  title: "Crunchy Peanut Chikki",
  rating: 4.8,
  reviews: 245,
  weights: ["200g", "500g", "1kg"],
  prices: {
    "200g": 75.0,
    "500g": 150.0,
    "1kg": 280.0,
  },
  originalPrices: {
    "200g": 150.0,
    "500g": 300.0,
    "1kg": 560.0,
  },
  description:
    "Delicious crunchy peanut chikki made with premium jaggery and peanuts. Perfect snack for anytime. Enjoy the authentic homemade taste in every bite.",
  images: [
    "/pista.png",
    "/stwabarry_chikki.png",
    "/pinepal_chikki.png",
    "/dana_ladu.png",
  ],
  sku: "CHIKKI001",
  tags: ["Chikki", "Snack", "Sweet"],
  ingredients: ["Peanuts", "Jaggery", "Ghee", "Cardamom"],
  refundPolicy:
    "We do not accept returns. Refunds are provided in certain cases. Please email us at care@MarvelCrunch.net with relevant information and images for assistance.",
};

export default function ProductDisplay() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [quantity, setQuantity] = useState(1);
  const [wishlistFilled, setWishlistFilled] = useState(false);

  // Calculate OFF %
  const discount = Math.round(
    ((product.originalPrices[selectedWeight] - product.prices[selectedWeight]) /
      product.originalPrices[selectedWeight]) *
      100
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 p-4 lg:p-8">
      {/* Left: Images */}
      <div className="flex flex-col gap-3 lg:flex-1">
        <div className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] border overflow-hidden shadow-sm">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.title} ${idx}`}
              className={`w-17 sm:w-32 h-17 sm:h-32 border  cursor-pointer object-cover transition-all duration-200 ${
                img === selectedImage
                  ? "border-[var(--primary)] scale-105"
                  : "border-gray-200"
              }`}
              onMouseEnter={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex-1 flex flex-col gap-4 text-[var(--text-main)] lg:max-w-[600px]">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center -mt-2 gap-2 text-sm sm:text-base">
          <span className="text-yellow-500 text-lg sm:text-xl">
            {"★".repeat(Math.floor(product.rating))}
          </span>
          <span className="text-[var(--text-muted)] text-sm sm:text-base">
            {product.rating} ({product.reviews} Reviews)
          </span>
        </div>

        {/* Price with OFF */}
        <div className="flex items-center -mt-1 gap-3 sm:gap-4">
          <span className="text-xl sm:text-2xl font-bold text-[var(--primary)]">
            ₹{product.prices[selectedWeight] * quantity}
          </span>
          <span className="line-through text-[var(--text-muted)] text-sm sm:text-base">
            ₹{product.originalPrices[selectedWeight] * quantity}
          </span>
          <span className="text-[var(--accent)] font-semibold text-sm sm:text-base">
            {discount}% OFF
          </span>
        </div>

        {/* Description */}
        <div className="text-[var(--text-muted)] -mt-1 leading-relaxed text-sm sm:text-base">
          <h2 className="font-semibold text-[var(--text-main)] mb-1">
            Product Description
          </h2>
          <p>{product.description}</p>
        </div>

        {/* Ingredients */}
        <div className="text-[var(--text-muted)] -mt-1 leading-relaxed text-sm sm:text-base">
          <h2 className="font-semibold text-[var(--text-main)] mb-1">
            Ingredients
          </h2>
          <ul className="list-disc list-inside">
            {product.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Refund Policy */}
        <div className="text-[var(--text-muted)] -mt-1 leading-relaxed text-sm sm:text-base">
          <h2 className="font-semibold text-[var(--text-main)] mb-1">
            Refund Policy
          </h2>
          <p>{product.refundPolicy}</p>
        </div>

        {/* Weight Selection */}
        <div className="flex items-center gap-2 sm:gap-3 -mt-1 flex-wrap">
          <span className="font-medium text-sm sm:text-base">Weight:</span>
          {product.weights.map((weight) => (
            <button
              key={weight}
              className={`px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                selectedWeight === weight
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "bg-white text-[var(--text-main)] border-gray-300 hover:border-[var(--primary)]"
              }`}
              onClick={() => setSelectedWeight(weight)}
            >
              {weight}
            </button>
          ))}
        </div>

        {/* Quantity & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-1">
          {/* Quantity Box */}
          <div className="flex items-center border rounded-lg overflow-hidden w-max shadow-sm">
            <button
              className="px-3 py-2 bg-[var(--bg-soft)] hover:bg-[var(--bg-card)] transition"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="px-5 py-2 bg-white text-[var(--text-main)] font-medium border-x border-gray-200">
              {quantity}
            </span>
            <button
              className="px-3 py-2 bg-[var(--bg-soft)] hover:bg-[var(--bg-card)] transition"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              to="/cart"
              className="px-5 py-2 sm:px-6 sm:py-3 bg-[var(--primary)] text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition text-sm sm:text-base"
            >
              <ShoppingCart size={18} /> Add to Cart
            </Link>

            <Link
              to="/checkout"
              className="px-5 py-2 sm:px-6 sm:py-3 bg-[var(--accent)] text-[var(--text-main)] rounded-lg hover:opacity-90 transition text-sm sm:text-base"
            >
              Buy Now
            </Link>

            <button
              onClick={() => setWishlistFilled((prev) => !prev)}
              className="p-2 sm:p-3 border rounded-lg hover:bg-[var(--bg-soft)] transition"
            >
              <Heart
                size={18}
                className={`transition-all duration-300 ${
                  wishlistFilled
                    ? "fill-[var(--primary)] text-[var(--primary)]"
                    : "fill-none text-[var(--text-main)] hover:fill-[var(--primary)] hover:text-[var(--primary)]"
                }`}
              />
            </button>
          </div>
        </div>

        {/* SKU & Tags */}
        <div className="text-sm sm:text-base text-[var(--text-muted)] -mt-1 flex flex-col gap-1">
          <span>
            <strong>SKU:</strong> {product.sku}
          </span>
          <span>
            <strong>Tags:</strong> {product.tags.join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
}
