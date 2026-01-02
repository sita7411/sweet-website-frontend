import React, { useState } from "react";
import { CreditCard, Smartphone, Banknote } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Features from "../components/Features/Features";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckoutPage() {
  const [payment, setPayment] = useState("card");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upi: "",
  });

  const handleOrder = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "address",
      "city",
      "state",
      "pincode",
    ];

    for (let field of requiredFields) {
      if (!form[field]) {
        toast.error("Please fill all required billing details");
        return;
      }
    }

    if (payment === "card") {
      if (!form.cardName || !form.cardNumber || !form.expiry || !form.cvv) {
        toast.error("Please fill all card details");
        return;
      }
    }

    if (payment === "gpay" && !form.upi) {
      toast.error("Please enter your UPI ID");
      return;
    }

    toast.success("🎉 Order placed successfully!");
  };

  return (
    <div className="min-h-screen">

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

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="First Name" required value={form.firstName}
              onChange={e => setForm({ ...form, firstName: e.target.value })} />
            <Input label="Last Name" required value={form.lastName}
              onChange={e => setForm({ ...form, lastName: e.target.value })} />
          </div>

          <Input label="Email Address" type="email" required value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} />
          <Input label="Phone Number" type="tel" required value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })} />

          <div className="mt-4">
            <label className="label">Country *</label>
            <select
              className="input"
              value={form.country}
              onChange={e => setForm({ ...form, country: e.target.value })}
            >
              <option value="">Select Country</option>
              <option>India</option>
            </select>
          </div>

          <Input label="Street Address" required value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })} />

          <div className="grid md:grid-cols-3 gap-4">
            <Input label="City" required value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })} />
            <Input label="State" required value={form.state}
              onChange={e => setForm({ ...form, state: e.target.value })} />
            <Input label="Pincode" required value={form.pincode}
              onChange={e => setForm({ ...form, pincode: e.target.value })} />
          </div>

          {/* PAYMENT */}
          <h2 className="text-xl font-semibold text-[#3a2416] mt-10 mb-4">
            Payment Method
          </h2>

          <div className="space-y-3">
            <Payment icon={<CreditCard />} label="Debit / Credit Card"
              value="card" payment={payment} setPayment={setPayment} />
            <Payment icon={<Smartphone />} label="Google Pay (UPI)"
              value="gpay" payment={payment} setPayment={setPayment} />
            <Payment icon={<Banknote />} label="Cash on Delivery"
              value="cod" payment={payment} setPayment={setPayment} />
          </div>

          {payment === "card" && (
            <div className="mt-6 bg-[#fffaf3] border rounded-xl p-6">
              <Input label="Cardholder Name" required value={form.cardName}
                onChange={e => setForm({ ...form, cardName: e.target.value })} />
              <Input label="Card Number" required value={form.cardNumber}
                onChange={e => setForm({ ...form, cardNumber: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry (MM/YY)" required value={form.expiry}
                  onChange={e => setForm({ ...form, expiry: e.target.value })} />
                <Input label="CVV" required value={form.cvv}
                  onChange={e => setForm({ ...form, cvv: e.target.value })} />
              </div>
            </div>
          )}

          {payment === "gpay" && (
            <div className="mt-6 bg-[#fffaf3] border rounded-xl p-6">
              <Input label="UPI ID" required value={form.upi}
                onChange={e => setForm({ ...form, upi: e.target.value })} />
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

          <button
            onClick={handleOrder}
            className="w-full mt-6 bg-[#6b3f26] text-white py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Place Order
          </button>

          <p className="text-xs text-center mt-4 text-[#8a6a52]">
            🔒 100% Secure & Encrypted Payments
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        transition={Slide}
        toastStyle={{
          background: "var(--bg-soft)",
          color: "var(--secondary)",
          fontWeight: 600,
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "14px 20px",
        }}
      />

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
      <input {...props} className="input" />
    </div>
  );
}

function Payment({ icon, label, value, payment, setPayment }) {
  return (
    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer
      ${payment === value ? "border-[#6b3f26] bg-[#fffaf3]" : "border-gray-200 hover:bg-[#fff1db]"}`}>
      <div className="flex items-center gap-3 font-medium text-sm">
        <span className="text-[#6b3f26]">{icon}</span>
        {label}
      </div>
      <input type="radio" checked={payment === value}
        onChange={() => setPayment(value)} />
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
