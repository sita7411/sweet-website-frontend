'use client';

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const products = [
  { id: 1, title: "Oatmeal muffins", price: 700, img: "/p1.png", category: "Cake" },
  { id: 2, title: "French bread", price: 800, img: "/p2.png", category: "Bread" },
  { id: 3, title: "Bread stick", price: 500, img: "/p3.png", category: "Bread" },
  { id: 4, title: "Pound cake", price: 750, img: "/p4.png", category: "Cake" },
  { id: 5, title: "Rye bread", price: 650, img: "/p5.png", category: "Bread" },
  { id: 6, title: "Swiss roll", price: 900, img: "/p6.png", category: "Roll" },
];

const categories = [
  { name: "Cake", count: 8 },
  { name: "Bread", count: 12 },
  { name: "Roll", count: 4 },
];

const tags = ["Bread", "Cake", "Roll", "Wheat", "Milk"];

export default function ProductPage() {
  const [price, setPrice] = useState(1000);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="lg:col-span-1 space-y-10 sticky top-24">

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full border px-4 py-2 rounded-md text-sm"
          />

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm">
              {categories.map((c, i) => (
                <li key={i} className="flex justify-between text-gray-600 hover:text-black cursor-pointer">
                  <span>{c.name}</span>
                  <span>{c.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-semibold mb-4">Filter by price</h3>
            <input
              type="range"
              min="100"
              max="2000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-2">Price: ₹100 – ₹{price}</p>
            <button className="mt-3 px-5 py-1 bg-[#c8a96a] text-white text-sm rounded">
              Filter
            </button>
          </div>

          {/* Top Products */}
          <div>
            <h3 className="font-semibold mb-4">Top product</h3>
            <div className="space-y-4">
              {products.slice(0, 3).map(p => (
                <div key={p.id} className="flex gap-3 items-center">
                  <img src={p.img} className="w-14 h-14 object-cover rounded" />
                  <div>
                    <p className="text-sm">{p.title}</p>
                    <p className="text-xs text-gray-500">₹{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs border rounded hover:bg-[#c8a96a] hover:text-white cursor-pointer"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="lg:col-span-3">

          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8 text-sm">
            <p className="text-gray-500">Showing 1–6 of 24 results</p>

            <div className="relative">
              <select className="border px-4 py-2 rounded appearance-none">
                <option>Default sorting</option>
                <option>Price low to high</option>
                <option>Price high to low</option>
              </select>
              <ChevronDownIcon className="w-4 h-4 absolute right-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => (
              <div
                key={p.id}
                className="border rounded-lg p-4 text-center hover:shadow-lg transition"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-[#c8a96a] font-semibold mt-1">₹{p.price}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
