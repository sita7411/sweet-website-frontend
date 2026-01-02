import React, { useState } from "react";
import { CreditCard, Smartphone, Banknote, ShieldCheck } from "lucide-react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Features from "../components/Features/Features";

export default function CheckoutPage() {
  const [payment, setPayment] = useState("card");

  return (
    <div className=" min-h-screen">

      {/* HERO */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <img src="/login.png" alt="Products Banner" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[var(--secondary)]/20"></div>
                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_3px_8px_rgba(107,63,38,0.6)]"
                    >
                        Checkout
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

                        <Link
                            to="/cart"
                            className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200"
                        >
                            Shopping Cart
                        </Link>

                        <span className="font-bold">\\</span>
                        <span className="font-semibold">Checkout</span>
                    </motion.div>
                </div>
            </section>


      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow">

          <h2 className="text-lg font-semibold text-[#3a2416] mb-6">
            Billing Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input className="input" placeholder="First Name" />
            <input className="input" placeholder="Last Name" />
          </div>

          <input className="input mt-4" placeholder="Email Address" />
          <input className="input mt-4" placeholder="Phone Number" />

          <select className="input mt-4">
            <option>Country</option>
            <option>India</option>
          </select>

          <input className="input mt-4" placeholder="Street Address" />

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <input className="input" placeholder="City" />
            <input className="input" placeholder="State" />
            <input className="input" placeholder="Pincode" />
          </div>

          {/* PAYMENT */}
          <h2 className="text-lg font-semibold text-[#3a2416] mt-10 mb-4">
            Payment Method
          </h2>

          <div className="space-y-3">
            <Payment icon={<CreditCard />} label="Debit / Credit Card" value="card" payment={payment} setPayment={setPayment} />
            <Payment icon={<Smartphone />} label="Google Pay" value="gpay" payment={payment} setPayment={setPayment} />
            <Payment icon={<Banknote />} label="Cash on Delivery" value="cod" payment={payment} setPayment={setPayment} />
          </div>

          {/* CARD DETAILS */}
          {payment === "card" && (
            <div className="mt-6 bg-[#fffaf3] border border-[#f2e6d8] rounded-xl p-6">
              <input className="input mb-4" placeholder="Cardholder Name" />
              <input className="input mb-4" placeholder="Card Number" />

              <div className="grid grid-cols-2 gap-4">
                <input className="input" placeholder="MM / YY" />
                <input className="input" placeholder="CVV" />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl p-6 shadow h-fit">

          <h3 className="font-semibold text-lg text-[#3a2416] mb-4">
            Order Summary
          </h3>

          <div className="space-y-2 text-sm text-[#3a2416]">
            <Row label="Items" value="8" />
            <Row label="Subtotal" value="₹708" />
            <Row label="Shipping" value="Free" />
            <Row label="Discount" value="-₹100" green />
            <hr className="my-2" />
            <Row label="Total Amount" value="₹633" bold />
          </div>

          <button className="w-full mt-6 bg-[#6b3f26] text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
            Place Order
          </button>

          <p className="text-xs text-center mt-4 text-[#8a6a52]">
            Safe • Secure • Encrypted Checkout
          </p>
        </div>
      </div>
                  <Features />
      
    </div>
  );
}

/* COMPONENTS */

function Payment({ icon, label, value, payment, setPayment }) {
  return (
    <label
      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition
      ${payment === value
        ? "border-[#6b3f26] bg-[#fffaf3]"
        : "border-gray-200 hover:bg-[#fff1db]"}`}
    >
      <div className="flex items-center gap-3 text-sm font-medium text-[#3a2416]">
        <span className="text-[#6b3f26]">{icon}</span>
        {label}
      </div>
      <input
        type="radio"
        checked={payment === value}
        onChange={() => setPayment(value)}
        className="accent-[#6b3f26]"
      />
    </label>
  );
}

function Row({ label, value, bold, green }) {
  return (
    <div className={`flex justify-between ${bold && "font-semibold"} ${green && "text-green-600"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
