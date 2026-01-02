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
            if (!cardRegex.test(form.cardNumber.replace(/\s/g, ""))) {
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

        toast.success(" Order placed successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-50">
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
                            Cart
                        </Link>

                        <span className="font-bold">\\</span>
                        <span className="font-semibold">Checkout</span>
                    </motion.div>
                </div>
            </section>


            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* LEFT: Billing & Payment */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Billing Details</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Input
                                    label="First Name"
                                    required
                                    placeholder="John"
                                    value={form.firstName}
                                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
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
                                options={["India","United States","United Kingdom","Japan","France","Canada","Brazil","South Africa"]}
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

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Method</h2>
                                <div className="space-y-4">
                                    <Payment
                                        icon={<CreditCard className="w-6 h-6" />}
                                        label="Credit / Debit Card"
                                        value="card"
                                        payment={payment}
                                        setPayment={setPayment}
                                    />
                                    <Payment
                                        icon={<Smartphone className="w-6 h-6" />}
                                        label="Google Pay (UPI)"
                                        value="gpay"
                                        payment={payment}
                                        setPayment={setPayment}
                                    />
                                    <Payment
                                        icon={<Banknote className="w-6 h-6" />}
                                        label="Cash on Delivery"
                                        value="cod"
                                        payment={payment}
                                        setPayment={setPayment}
                                    />
                                </div>

                                {payment === "card" && (
                                    <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-5">
                                        <Input
                                            label="Cardholder Name"
                                            required
                                            placeholder="John Doe"
                                            value={form.cardName}
                                            onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                                        />
                                        <Input
                                            label="Card Number"
                                            required
                                            maxLength="19"
                                            placeholder="1234 5678 9012 3456"
                                            value={form.cardNumber}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    cardNumber: e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim(),
                                                })
                                            }
                                        />
                                        <div className="grid grid-cols-2 gap-5">
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
                                    <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
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
                        </div>
                    </div>

                    {/* RIGHT: Order Summary */}
                    <div className="order-1 lg:order-2 lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-6">
                            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                            <div className="border-t border-gray-300 pt-4 space-y-3">
                                <Row label="Items" value={cart.length} />
                                <Row label="Subtotal" value={`₹${subtotal.toFixed(2)}`} />
                                <Row
                                    label="Shipping"
                                    value={shipping ? `₹${shipping.toFixed(2)}` : "Free"}
                                    green={!shipping}
                                />
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>

                            <Row label="Total" value={`₹${total.toFixed(2)}`} bold />

                            <button
                                onClick={handleOrder}
                                className="w-full mt-6 py-4 rounded-xl font-bold text-white text-lg bg-[#6b3f26] hover:bg-[#8b5e3c] transition duration-200 shadow-md"
                            >
                                Place Order
                            </button>
                            <p className="text-xs text-center mt-3 text-gray-500">🔒 Secure Checkout</p>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
                theme="light"
            />

            {/* FEATURES SECTION */}
            <Features />
        </div>
    );
}

/* ===== REUSABLE COMPONENTS ===== */
function Input({ label, required, ...props }) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                {...props}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b3f26] focus:border-[#6b3f26] transition"
            />
        </div>
    );
}
function Select({ label, required, options = [], value, onChange }) {
  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Select container */}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-2xl bg-[var(--bg-card)] text-[var(--text-main)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:border-[var(--secondary)] transition-shadow duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Custom arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <svg
            className="w-5 h-5 text-[var(--secondary)] transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Hint */}
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        Please select your {label.toLowerCase()}.
      </p>
    </div>
  );
}

function Payment({ icon, label, value, payment, setPayment }) {
    return (
        <label
            className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-200
        ${payment === value
                    ? "border-[#6b3f26] bg-[#fffaf3] shadow-md"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
        >
            <div className="flex items-center gap-4">
                <span className="text-[#6b3f26]">{icon}</span>
                <span className="font-medium text-gray-800">{label}</span>
            </div>
            <input
                type="radio"
                name="payment"
                checked={payment === value}
                onChange={() => setPayment(value)}
                className="w-5 h-5 accent-[#6b3f26]"
            />
        </label>
    );
}

function Row({ label, value, bold, green }) {
    return (
        <div
            className={`flex justify-between text-base ${bold ? "text-lg font-bold text-gray-900" : "text-gray-600"
                } ${green ? "text-green-600" : ""}`}
        >
            <span>{label}</span>
            <span>{value}</span>
        </div>
    );
}