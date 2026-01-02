import React, { useState } from "react";
import { CreditCard, Smartphone, Banknote } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Features from "../components/Features/Features";

export default function CheckoutPage() {
  const [payment, setPayment] = useState("card");

  return (
    <div className="min-h-screen bg-[#fffaf3]">

      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/login.png"
          alt="Checkout Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--secondary)]/30"></div>

        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-white"
          >
            Checkout
          </motion.h1>

          <div className="mt-4 text-white text-sm flex justify-center gap-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <span>/</span>
            <span className="font-semibold">Checkout</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">

          <h2 className="text-xl font-semibold text-[#3a2416] mb-6">
            Billing Details
          </h2>

          {/* NAME */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="First Name" required />
            <Input label="Last Name" required />
          </div>

          <Input label="Email Address" type="email" required />
          <Input label="Phone Number" type="tel" required />

          <div className="mt-4">
            <label className="label">Country *</label>
            <select className="input" required>
              <option value="">Select Country</option>
              <option>India</option>
            </select>
          </div>

          <Input label="Street Address" required />

          <div className="grid md:grid-cols-3 gap-4">
            <Input label="City" required />
            <Input label="State" required />
            <Input label="Pincode" required />
          </div>

          {/* PAYMENT */}
          <h2 className="text-xl font-semibold text-[#3a2416] mt-10 mb-4">
            Payment Method
          </h2>

          <div className="space-y-3">
            <Payment
              icon={<CreditCard />}
              label="Debit / Credit Card"
              value="card"
              payment={payment}
              setPayment={setPayment}
            />
            <Payment
              icon={<Smartphone />}
              label="Google Pay (UPI)"
              value="gpay"
              payment={payment}
              setPayment={setPayment}
            />
            <Payment
              icon={<Banknote />}
              label="Cash on Delivery"
              value="cod"
              payment={payment}
              setPayment={setPayment}
            />
          </div>

          {/* CARD */}
          {payment === "card" && (
            <div className="mt-6 bg-[#fffaf3] border rounded-xl p-6">
              <Input label="Cardholder Name" required />
              <Input label="Card Number" required />

              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry (MM/YY)" required />
                <Input label="CVV" required />
              </div>
            </div>
          )}

          {/* GPay */}
          {payment === "gpay" && (
            <div className="mt-6 bg-[#fffaf3] border rounded-xl p-6">
              <Input label="UPI ID" placeholder="example@upi" required />
              <p className="text-xs text-[#8a6a52] mt-2">
                You will receive a payment request on your Google Pay app
              </p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">

          <h3 className="text-lg font-semibold text-[#3a2416] mb-4">
            Order Summary
          </h3>

          <div className="space-y-2 text-sm">
            <Row label="Items" value="8" />
            <Row label="Subtotal" value="₹708" />
            <Row label="Shipping" value="Free" />
            <Row label="Discount" value="-₹100" green />
            <hr />
            <Row label="Total Amount" value="₹633" bold />
          </div>

          <button className="w-full mt-6 bg-[#6b3f26] text-white py-3 rounded-xl font-semibold hover:opacity-90">
            Place Order
          </button>

          <p className="text-xs text-center mt-4 text-[#8a6a52]">
            🔒 100% Secure & Encrypted Payments
          </p>
        </div>
      </div>

      <Features />
    </div>
  );
}

/* COMPONENTS */

function Input({ label, required, ...props }) {
  return (
    <div className="mt-4">
      <label className="label">
        {label} {required && "*"}
      </label>
      <input
        {...props}
        required={required}
        className="input"
      />
    </div>
  );
}

function Payment({ icon, label, value, payment, setPayment }) {
  return (
    <label
      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer
        ${payment === value
          ? "border-[#6b3f26] bg-[#fffaf3]"
          : "border-gray-200 hover:bg-[#fff1db]"}`}
    >
      <div className="flex items-center gap-3 font-medium text-sm">
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
