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

  /* ================= VALIDATION HELPERS ================= */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const cardRegex = /^\d{16}$/;
  const cvvRegex = /^\d{3}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const upiRegex = /^[\w.-]+@[\w.-]+$/;

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
        toast.error("Please fill all billing details");
        return;
      }
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!phoneRegex.test(form.phone)) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    if (payment === "card") {
      if (!form.cardName) {
        toast.error("Enter cardholder name");
        return;
      }

      if (!cardRegex.test(form.cardNumber)) {
        toast.error("Card number must be 16 digits");
        return;
      }

      if (!expiryRegex.test(form.expiry)) {
        toast.error("Expiry must be in MM/YY format");
        return;
      }

      if (!cvvRegex.test(form.cvv)) {
        toast.error("CVV must be 3 digits");
        return;
      }
    }

    if (payment === "gpay" && !upiRegex.test(form.upi)) {
      toast.error("Enter a valid UPI ID");
      return;
    }

    toast.success("🎉 Order placed successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <img
          src="/login.png"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Checkout
          </motion.h1>
          <div className="mt-2 text-sm flex justify-center gap-2 text-gray-200">
            <Link to="/" className="hover:underline">Home</Link> /{" "}
            <Link to="/cart" className="hover:underline">Cart</Link> /{" "}
            <span className="font-semibold">Checkout</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-10 space-y-8">
          <h2 className="text-2xl font-semibold border-b pb-2">Billing Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="First Name" required value={form.firstName}
              onChange={e => setForm({ ...form, firstName: e.target.value })} />
            <Input label="Last Name" required value={form.lastName}
              onChange={e => setForm({ ...form, lastName: e.target.value })} />
          </div>

          <Input label="Email" type="email" required value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} />

          <Input label="Phone Number" type="tel" required maxLength="10"
            value={form.phone}
            onChange={e =>
              setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
            } />

          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">Country *</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6b3f26]"
              onChange={e => setForm({ ...form, country: e.target.value })}
            >
              <option value="">Select Country</option>
              <option>India</option>
            </select>
          </div>

          <Input label="Address" required value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })} />

          <div className="grid md:grid-cols-3 gap-6">
            <Input label="City" required value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })} />
            <Input label="State" required value={form.state}
              onChange={e => setForm({ ...form, state: e.target.value })} />
            <Input label="Pincode" required maxLength="6"
              value={form.pincode}
              onChange={e => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })} />
          </div>

          {/* PAYMENT */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 border-b pb-2">Payment Method</h2>

          <div className="space-y-4">
            <Payment icon={<CreditCard />} label="Credit/Debit Card" value="card" payment={payment} setPayment={setPayment} />
            <Payment icon={<Smartphone />} label="Google Pay (UPI)" value="gpay" payment={payment} setPayment={setPayment} />
            <Payment icon={<Banknote />} label="Cash on Delivery" value="cod" payment={payment} setPayment={setPayment} />
          </div>

          {payment === "card" && (
            <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
              <Input label="Cardholder Name" required value={form.cardName}
                onChange={e => setForm({ ...form, cardName: e.target.value })} />
              <Input label="Card Number" required maxLength="16"
                value={form.cardNumber}
                onChange={e =>
                  setForm({ ...form, cardNumber: e.target.value.replace(/\D/g, "") })
                } />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry (MM/YY)" required value={form.expiry}
                  onChange={e => setForm({ ...form, expiry: e.target.value })} />
                <Input label="CVV" type="password" required maxLength="3"
                  value={form.cvv}
                  onChange={e =>
                    setForm({ ...form, cvv: e.target.value.replace(/\D/g, "") })
                  } />
              </div>
            </div>
          )}

          {payment === "gpay" && (
            <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
              <Input label="UPI ID" required value={form.upi}
                onChange={e => setForm({ ...form, upi: e.target.value })} />
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-3xl shadow-lg p-8 h-fit flex flex-col space-y-5">
          <h3 className="text-xl font-semibold border-b pb-2">Order Summary</h3>

          <Row label="Items" value="8" />
          <Row label="Subtotal" value="₹708" />
          <Row label="Shipping" value="Free" />
          <Row label="Discount" value="-₹100" green />
          <hr className="my-2" />
          <Row label="Total" value="₹633" bold />

          <button
            onClick={handleOrder}
            className="w-full mt-4 bg-[#6b3f26] text-white py-3 rounded-xl font-semibold text-lg hover:opacity-90 transition duration-200"
          >
            Place Order
          </button>

          <p className="text-xs text-center mt-2 text-gray-400">🔒 Secure Checkout</p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} transition={Slide} />
      <Features />
    </div>
  );
}

/* ===== COMPONENTS ===== */

function Input({ label, required, ...props }) {
  return (
    <div className="mt-4">
      <label className="block mb-1 font-medium text-gray-700">{label} {required && "*"}</label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6b3f26] transition duration-150"
      />
    </div>
  );
}

function Payment({ icon, label, value, payment, setPayment }) {
  return (
    <label
      className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition
        ${payment === value
          ? "border-[#6b3f26] bg-[#fffaf3]"
          : "border-gray-200 hover:border-[#6b3f26]"
        }`}
    >
      <div className="flex items-center gap-3 text-gray-700 font-medium">
        <span className="text-[#6b3f26]">{icon}</span>
        {label}
      </div>
      <input
        type="radio"
        checked={payment === value}
        onChange={() => setPayment(value)}
        className="accent-[#6b3f26] w-5 h-5"
      />
    </label>
  );
}

function Row({ label, value, bold, green }) {
  return (
    <div className={`flex justify-between text-sm ${bold && "font-semibold"} ${green && "text-green-600"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
