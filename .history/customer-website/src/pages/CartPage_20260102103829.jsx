// CartPage.jsx
import React, { useState } from "react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

const initialCart = [
  {
    id: 1,
    title: "Trendy Brown Coat",
    color: "Brown",
    size: "XL",
    price: 75,
    quantity: 4,
    img: "/images/product1.png",
  },
  {
    id: 2,
    title: "Classy Light Coat",
    color: "Cream",
    size: "XL",
    price: 165,
    quantity: 1,
    img: "/images/product2.png",
  },
  {
    id: 3,
    title: "Light Brown Sweater",
    color: "Light Brown",
    size: "S",
    price: 63,
    quantity: 1,
    img: "/images/product3.png",
  },
  {
    id: 4,
    title: "Modern Brown Dress",
    color: "Brown",
    size: "S",
    price: 90,
    quantity: 2,
    img: "/images/product4.png",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const handleQuantity = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: type === "inc" ? item.quantity + 1 : Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 180 ? 0 : 20;
  const taxes = subtotal * 0.05;
  const total = subtotal + shipping + taxes;

  return (
    <div className="bg-[var(--bg-main)] min-h-screen py-10 px-4 md:px-20">
      <h1 className="text-2xl font-bold text-[var(--text-main)] mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Table */}
        <div className="md:col-span-2 bg-[var(--bg-card)] p-6 rounded-lg shadow">
          <div className="grid grid-cols-5 gap-4 font-semibold text-[var(--text-main)] border-b pb-3 mb-3">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
            <div></div>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="grid grid-cols-5 gap-4 items-center mb-4">
              <div className="flex items-center gap-3">
                <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h2 className="text-[var(--text-main)] font-medium">{item.title}</h2>
                  <p className="text-[var(--text-muted)] text-sm">
                    Color: {item.color} | Size: {item.size}
                  </p>
                </div>
              </div>
              <div className="text-[var(--text-main)]">${item.price.toFixed(2)}</div>
              <div className="flex items-center border rounded overflow-hidden w-max">
                <button
                  className="px-2 bg-[var(--bg-soft)]"
                  onClick={() => handleQuantity(item.id, "dec")}
                >
                  <MinusIcon className="w-4 h-4 text-[var(--text-main)]" />
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  className="px-2 bg-[var(--bg-soft)]"
                  onClick={() => handleQuantity(item.id, "inc")}
                >
                  <PlusIcon className="w-4 h-4 text-[var(--text-main)]" />
                </button>
              </div>
              <div className="text-[var(--text-main)]">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => handleRemove(item.id)}>
                <XMarkIcon className="w-5 h-5 text-red-600" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-[var(--bg-card)] p-6 rounded-lg shadow h-max">
          <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-[var(--text-muted)]">Items</span>
            <span>{cart.length}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-[var(--text-muted)]">Sub Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-[var(--text-muted)]">Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-[var(--text-muted)]">Taxes</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-[var(--text-main)] mb-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-[var(--primary)] text-white py-2 rounded hover:bg-[var(--secondary)] transition">
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-10 grid md:grid-cols-3 gap-6 text-center text-[var(--text-main)]">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[var(--primary)] text-2xl">📦</span>
          <p>Free Shipping for orders above $180</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[var(--primary)] text-2xl">💳</span>
          <p>Flexible Payment Options</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[var(--primary)] text-2xl">🎧</span>
          <p>24x7 Support Online</p>
        </div>
      </div>
    </div>
  );
}
