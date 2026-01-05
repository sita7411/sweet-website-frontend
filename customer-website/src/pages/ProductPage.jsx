import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
// import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import ProductReviews from "../components/ProductReviews/ProductReviews";
// import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

export default function ProductPage() {
  const { productId } = useParams();

  // ===== Static Data =====
  const products = [
    {
      id: 1,
      title: "Pista Chocolate Chikki",
      desc: "Chocolate & Peanut Blend. Rich, crunchy and delicious chikki.",
      img: "/pista.png",
      variants: { "200g": 250, "1kg": 1200 },
      reviews: [
        { id: 1, name: "Sita", rating: 5, comment: "Amazing taste!" },
        { id: 2, name: "Ravi", rating: 4, comment: "Loved it, very crunchy." },
      ],
      category: "Bestseller",
      stock: "In Stock",
      images: ["/pista.png", "/pista2.png", "/pista3.png"], // gallery
      sizes: ["200g", "1kg"], // for selector
      price: 250, // default price
    },
    {
      id: 2,
      title: "Mango Fusion Chikki",
      desc: "Seasonal mango flavored chikki, healthy and tasty.",
      img: "/mango_chikki.png",
      variants: { "200g": 179, "1kg": 800 },
      reviews: [
        { id: 1, name: "Ankit", rating: 5, comment: "Perfect summer snack!" },
      ],
      category: "Seasonal",
      stock: "In Stock",
      images: ["/mango_chikki.png", "/mango_chikki2.png"],
      sizes: ["200g", "1kg"],
      price: 179,
    },
    // Add more products as needed
  ];

  // ===== Find product based on productId =====
  const product = products.find((p) => p.id === parseInt(productId));

  // ===== Handle product not found =====
  if (!product)
    return (
      <p className="text-center mt-10 text-[var(--text-muted)] ">
        Product not found
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-5 ">
      {/* Breadcrumbs */}
      <Breadcrumbs product={product} />

      {/* Product Display Area */}
      <ProductDisplay product={product} />

      {/* Optional sections */}
      {/* <DescriptionBox product={product} /> */}
      <ProductReviews product={product} />
      {/* <RelatedProducts product={product} /> */}
    </div>
  );
}
