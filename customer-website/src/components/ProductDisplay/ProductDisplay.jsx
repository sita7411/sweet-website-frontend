import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useShop } from "../../context/ShopContext"; 

const API_BASE = import.meta.env.VITE_API_BASE || "https://sweet-backend-ukfd.onrender.com";

export default function ProductDisplay() {
  const { productId } = useParams();

  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useShop();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlistFilled, setWishlistFilled] = useState(false);

  // Fetch product
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/products/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();

        setProduct(data);

        // Set defaults once data is loaded
        if (data.images?.length > 0) setSelectedImage(data.images[0]);
        if (data.weights?.length > 0) setSelectedWeight(data.weights[0].weight);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  // Sync wishlist heart state with actual backend wishlist
  useEffect(() => {
    if (product?._id && selectedWeight) {
      const alreadyInWishlist = isInWishlist(product._id, selectedWeight);
      setWishlistFilled(alreadyInWishlist);
    }
  }, [product?._id, selectedWeight, isInWishlist]);

  if (loading) {
    return <div className="py-20 text-center">Loading product...</div>;
  }

  if (error || !product) {
    return <div className="py-20 text-center text-red-600">Product not found</div>;
  }

  // Data mapping / normalization
  const title = product.name;
  const description = product.fullDescription || product.shortDescription || "";
  const images = product.images || [];
  const sku = product.skuCode || "N/A";

  const weights = product.weights?.map(w => w.weight) || [];
  const prices = {};
  const originalPrices = {};
  product.weights?.forEach(w => {
    prices[w.weight] = w.sellingPrice || 0;
    originalPrices[w.weight] = w.mrp || w.sellingPrice || 0;
  });

  // Calculate discount for selected weight
  const currentPrice = prices[selectedWeight] || 0;
  const currentOriginal = originalPrices[selectedWeight] || 0;
  const discount = currentOriginal > currentPrice
    ? Math.round(((currentOriginal - currentPrice) / currentOriginal) * 100)
    : 0;

  // ─── Handlers ───

  const handleAddToCart = () => {
    if (!selectedWeight) {
      alert("Please select a weight first");
      return;
    }

    const variant = { weight: selectedWeight };

    addToCart(product, variant, quantity);
    // → toast + cart refresh happens inside ShopContext
  };

  const handleToggleWishlist = () => {
    if (!selectedWeight) {
      alert("Please select a weight first");
      return;
    }

    toggleWishlist(product, selectedWeight);
    // → heart will update automatically via the useEffect + isInWishlist
  };

  // ─── JSX ─────────────────────────────────────────────────────

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 p-4 lg:p-8">
      {/* Left: Images */}
      <div className="flex flex-col gap-3 lg:flex-1">
        <div className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] border overflow-hidden shadow-sm">
          <img
            src={selectedImage || "/placeholder.jpg"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${title} ${idx + 1}`}
              className={`w-17 sm:w-32 h-17 sm:h-32 border cursor-pointer object-cover transition-all duration-200 ${
                img === selectedImage
                  ? "border-[var(--primary)] scale-105"
                  : "border-gray-200"
              }`}
              onMouseEnter={() => setSelectedImage(img)}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex-1 flex flex-col gap-4 text-[var(--text-main)] lg:max-w-[600px]">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
          {title}
        </h1>

        {/* Rating - placeholder */}
        <div className="flex items-center -mt-2 gap-2 text-sm sm:text-base">
          <span className="text-yellow-500 text-lg sm:text-xl">★★★★☆</span>
          <span className="text-[var(--text-muted)]">
            4.8 (245 Reviews)
          </span>
        </div>

        {/* Price with OFF */}
        <div className="flex items-center -mt-1 gap-3 sm:gap-4">
          <span className="text-xl sm:text-2xl font-bold text-[var(--primary)]">
            ₹{(currentPrice * quantity).toFixed(0)}
          </span>
          {currentOriginal > currentPrice && (
            <>
              <span className="line-through text-[var(--text-muted)] text-sm sm:text-base">
                ₹{(currentOriginal * quantity).toFixed(0)}
              </span>
              <span className="text-[var(--accent)] font-semibold text-sm sm:text-base">
                {discount}% OFF
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <div className="text-[var(--text-muted)] leading-relaxed text-sm sm:text-base">
          <h2 className="font-semibold text-[var(--text-main)] mb-2">
            Product Description
          </h2>

          {product.fullDescription || product.shortDescription ? (
            <div className="whitespace-pre-line">
              {product.fullDescription || product.shortDescription}
            </div>
          ) : (
            <p className="italic text-[var(--text-muted)]">
              No detailed description available.
            </p>
          )}
        </div>

        {/* Ingredients */}
        {product.ingredients?.length > 0 && (
          <div className="text-[var(--text-muted)] -mt-1 leading-relaxed text-sm sm:text-base">
            <h2 className="font-semibold text-[var(--text-main)] mb-1">
              Ingredients
            </h2>

            <ul
              className="
                list-disc list-inside
                columns-1 sm:columns-2 lg:columns-3
                gap-x-6 lg:gap-x-10
                space-y-1.5
              "
            >
              {product.ingredients.map((item, idx) => (
                <li
                  key={idx}
                  className="break-inside-avoid leading-relaxed mb-0.5 last:mb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Refund Policy */}
        <div className="text-[var(--text-muted)] -mt-1 leading-relaxed text-sm sm:text-base">
          <h2 className="font-semibold text-[var(--text-main)] mb-1">
            Refund Policy
          </h2>
          <p>
            We do not accept returns. Refunds are provided in certain cases. Please email us at care@MarvelCrunch.net with relevant information and images for assistance.
          </p>
        </div>

        {/* Weight Selection */}
        {weights.length > 0 && (
          <div className="flex items-center gap-2 sm:gap-3 -mt-1 flex-wrap">
            <span className="font-medium text-sm sm:text-base">Weight:</span>
            {weights.map((weight) => (
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
        )}

        {/* Quantity & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-1">
          <div className="flex items-center border rounded-lg overflow-hidden w-max shadow-sm">
            <button
              className="px-3 py-2 bg-[var(--bg-soft)] hover:bg-[var(--bg-card)] transition"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="px-5 py-2 bg-white text-[var(--text-main)] font-medium border-x border-gray-200">
              {quantity}
            </span>
            <button
              className="px-3 py-2 bg-[var(--bg-soft)] hover:bg-[var(--bg-card)] transition"
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </button>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={handleAddToCart}
              className="px-5 py-2 sm:px-6 sm:py-3 bg-[var(--primary)] text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition text-sm sm:text-base"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>

            <Link
              to="/checkout"
              className="px-5 py-2 sm:px-6 sm:py-3 bg-[var(--accent)] text-[var(--text-main)] rounded-lg hover:opacity-90 transition text-sm sm:text-base"
            >
              Buy Now
            </Link>

            <button
              onClick={handleToggleWishlist}
              className="p-2 sm:p-3 border rounded-lg hover:bg-[var(--bg-soft)] transition"
              title={wishlistFilled ? "Remove from Wishlist" : "Add to Wishlist"}
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
          <span><strong>SKU:</strong> {sku}</span>
          {product.tags?.length > 0 && (
            <span><strong>Tags:</strong> {product.tags.join(", ")}</span>
          )}
        </div>
      </div>
    </div>
  );
}