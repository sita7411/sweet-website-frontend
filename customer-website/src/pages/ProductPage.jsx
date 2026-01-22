import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import ProductReviews from "../components/ProductReviews/ProductReviews"; // ← rename if needed
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import Features from "../components/Features/Features";

const API_BASE = import.meta.env.VITE_API_BASE || "https://sweet-backend-ukfd.onrender.com";

export default function ProductDetail() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/products/${productId}`);
        if (!res.ok) {
          throw new Error(`Product not found (${res.status})`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  // ─── Debug log goes HERE (outside JSX) ───
  console.log("Passing productId to ReviewSection:", product?._id);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl text-red-600">
        {error || "Product not found"}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-2">
      <Breadcrumbs product={product} />

      <ProductDisplay product={product} />

      {/* Pass productId instead of full product — cleaner */}
      <ProductReviews productId={product._id} />

      <RelatedProducts product={product} />

      <div className="-mb-10">
        <Features product={product} />
      </div>
    </div>
  );
}