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

  // Dummy cart data
  const cart = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const subtotal = 708;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  // Validation regex
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
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <img
          src="/login.png"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold"
          >
            Checkout
          </motion.h1>

          <div className="mt-3 text-sm flex justify-center gap-2">
            <Link className="hover:underline" to="/">
              Home
            </Link>{" "}
            / <Link className="hover:underline" to="/cart">Cart</Link> /{" "}
            <b>Checkout</b>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-3 gap-8">
        {/* LEFT: Billing & Payment */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8 space-y-6">
          <h2 className="text-xl font-semibold">Billing Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              required
              placeholder="John"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
            <Input
              label="Last Name"
              required
              placeholder="Doe"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>

          <Input
            label="Email"
            type="email"
            required
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            label="Phone Number"
            type="tel"
            required
            placeholder="9876543210"
            maxLength="10"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
            }
          />

          <Select
            label="Country"
            required
            options={["India"]}
            value={form.country}
            onChange={(val) => setForm({ ...form, country: val })}
          />

          <Input
            label="Address"
            required
            placeholder="123 Street, Area"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <div className="grid md:grid-cols-3 gap-4">
            <Input
              label="City"
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Input
              label="State"
              required
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
            <Input
              label="Pincode"
              required
              maxLength="6"
              value={form.pincode}
              onChange={(e) =>
                setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })
              }
            />
          </div>

          {/* PAYMENT */}
          <h2 className="text-xl font-semibold mt-6">Payment Method</h2>
          <div className="space-y-3 mt-2">
            <Payment
              icon={<CreditCard />}
              label="Card"
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

          {payment === "card" && (
            <div className="mt-4 bg-gray-50 p-6 rounded-xl border space-y-4">
              <Input
                label="Cardholder Name"
                required
                placeholder="John Doe"
                value={form.cardName}
                onChange={(e) =>
                  setForm({ ...form, cardName: e.target.value })
                }
              />
              <Input
                label="Card Number"
                required
                maxLength="16"
                placeholder="1234 5678 9012 3456"
                value={form.cardNumber}
                onChange={(e) =>
                  setForm({ ...form, cardNumber: e.target.value.replace(/\D/g, "") })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry (MM/YY)"
                  required
                  placeholder="12/25"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                />
                <Input
                  label="CVV"
                  type="password"
                  required
                  maxLength="3"
                  placeholder="123"
                  value={form.cvv}
                  onChange={(e) =>
                    setForm({ ...form, cvv: e.target.value.replace(/\D/g, "") })
                  }
                />
              </div>
            </div>
          )}

          {payment === "gpay" && (
            <div className="mt-4 bg-gray-50 p-6 rounded-xl border">
              <Input
                label="UPI ID"
                required
                placeholder="example@okaxis"
                value={form.upi}
                onChange={(e) => setForm({ ...form, upi: e.target.value })}
              />
            </div>
          )}
        </div>

        {/* RIGHT: Order Summary */}
        <div className="w-full lg:w-[350px] bg-white p-5 rounded-2xl shadow flex flex-col gap-4 self-start">
          <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
          <div className="border-t border-gray-300"></div>

          <Row label="Items" value={cart.length} />
          <Row label="Sub Total" value={`₹${subtotal.toFixed(2)}`} />
          <Row label="Shipping" value={shipping ? `₹${shipping.toFixed(2)}` : "Free"} />

          <div className="border-t border-gray-300 my-2"></div>
          <Row label="Total" value={`₹${total.toFixed(2)}`} bold />

          <button
            onClick={handleOrder}
            className="w-full py-3 rounded-xl font-semibold text-white text-lg bg-[#6b3f26] hover:bg-[#8b5e3c] transition"
          >
            Place Order
          </button>
          <p className="text-xs text-center mt-2 text-gray-500">🔒 Secure Checkout</p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />

      {/* FEATURES SECTION */}
      <Features />
    </div>
  );
}

/* ===== COMPONENTS ===== */
function Input({ label, required, ...props }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && "*"}
      </label>
      <input
        {...props}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#6b3f26] focus:border-[#6b3f26]"
      />
    </div>
  );
}

function Select({ label, required, options = [], value, onChange }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && "*"}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-[#6b3f26] focus:border-[#6b3f26]"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Payment({ icon, label, value, payment, setPayment }) {
  return (
    <label
      className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition
        ${payment === value ? "border-[#6b3f26] bg-[#fffaf3]" : "border-gray-200"}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-[#6b3f26]">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <input
        type="radio"
        name="payment"
        checked={payment === value}
        onChange={() => setPayment(value)}
        className="accent-[#6b3f26]"
      />
    </label>
  );
}

function Row({ label, value, bold, green }) {
  return (
    <div className={`flex justify-between text-sm ${bold ? "font-semibold" : ""} ${green ? "text-green-600" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
