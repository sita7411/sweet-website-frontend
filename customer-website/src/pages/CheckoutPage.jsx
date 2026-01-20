import React, { useState, useRef, useEffect } from "react";
import { CreditCard, Smartphone, Banknote, ShieldCheck, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Features from "../components/Features/Features";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerificationModal from "../components/OtpVerificationModal/OtpVerificationModal";
import axios from "axios";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart, fetchCart } = useShop();
  const { user } = useAuth();

  const [payment, setPayment] = useState("card");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("new");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);

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

  useEffect(() => {
    const init = async () => {
      try {
        await fetchCart();

        if (activeTab === "saved" && user?.addresses?.length > 0) {
          if (!selectedAddressId) {
            const firstAddr = user.addresses[0];
            setSelectedAddressId(firstAddr._id || 0);

            // Clean phone number properly
            let cleanedPhone = '';
            const possibleKeys = ['phone', 'mobile', 'contact', 'phoneNumber'];

            for (const key of possibleKeys) {
              if (firstAddr[key]) {
                cleanedPhone = String(firstAddr[key]).replace(/\D/g, ''); // only digits
                break;
              }
            }

            // Fallback to user's phone if address doesn't have it
            if (!cleanedPhone && user?.phone) {
              cleanedPhone = String(user.phone).replace(/\D/g, '');
            }

            // Limit to 10 digits (remove leading 91 or 0 if present)
            if (cleanedPhone.length > 10) {
              if (cleanedPhone.startsWith('91')) {
                cleanedPhone = cleanedPhone.slice(2);
              } else if (cleanedPhone.startsWith('0')) {
                cleanedPhone = cleanedPhone.slice(1);
              }
              cleanedPhone = cleanedPhone.slice(0, 10);
            }

            setForm((prev) => ({
              ...prev,
              firstName: firstAddr.firstName || user.firstName || "",
              lastName: firstAddr.lastName || user.lastName || "",
              email: firstAddr.email || user.email || "",
              phone: cleanedPhone,
              country: firstAddr.country || "",
              address: firstAddr.street || firstAddr.address || "",
              city: firstAddr.city || "",
              state: firstAddr.state || "",
              pincode: firstAddr.zip || firstAddr.pincode || "",
            }));
          }
        } else if (activeTab === "new") {
          setForm((prev) => ({
            ...prev,
            country: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
          }));
          setSelectedAddressId(null);
        }
      } catch (err) {
        console.error("Checkout init error:", err);
      } finally {
        setPageLoading(false);
      }
    };

    init();
  }, [fetchCart, user, activeTab, selectedAddressId]);

  const getPrice = (item) => Number(item.sellingPrice ?? item.price ?? 0);
  const getQty = (item) => Number(item.qty ?? 1);

  const subtotal = cartItems.reduce((sum, item) => sum + getPrice(item) * getQty(item), 0);
  const shippingFromItems = cartItems.reduce((sum, item) => sum + Number(item.shippingCharge ?? 0), 0);
  const shipping = shippingFromItems > 0 ? shippingFromItems : subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const cardRegex = /^\d{16}$/;
  const cvvRegex = /^\d{3}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const upiRegex = /^[\w.-]+@[\w.-]+$/;

  const handleOrder = async () => {
    const requiredFields = ["firstName", "lastName", "email", "phone", "country", "address", "city", "state", "pincode"];

    for (const field of requiredFields) {
      if (!form[field]?.trim()) {
        toast.error("Please fill all billing details");
        return;
      }
    }

    if (!emailRegex.test(form.email.trim())) return toast.error("Invalid email address");
    if (!phoneRegex.test(form.phone.trim())) return toast.error("Phone must be 10 digits starting with 6-9");

    if (payment === "card") {
      if (!form.cardName?.trim()) return toast.error("Cardholder name required");
      if (!cardRegex.test(form.cardNumber.replace(/\s/g, ""))) return toast.error("Card number must be 16 digits");
      if (!expiryRegex.test(form.expiry)) return toast.error("Expiry format: MM/YY");
      if (!cvvRegex.test(form.cvv)) return toast.error("CVV must be 3 digits");
    }

    if (payment === "gpay" && !upiRegex.test(form.upi.trim())) return toast.error("Invalid UPI ID");

    if (cartItems.length === 0) return toast.error("Cart is empty");

    setLoading(true);

    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
        paymentMethod: payment,
      };

      const res = await axios.post(`${API_BASE}/orders`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (res.data?.success) {
        toast.success("Order placed successfully!");
        await clearCart();

        const orderId = res.data.orderId || res.data._id || "success";
        setTimeout(() => {
          navigate(`/order-complete?orderId=${orderId}`);
        }, 1500);
      } else {
        toast.error(res.data?.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Order placement failed:", err);
      toast.error(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#6b3f26] mx-auto mb-4" />
          <p className="text-gray-600">Preparing checkout...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">Your cart is empty</h2>
        <Link
          to="/shop"
          className="bg-[#6b3f26] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-medium text-base sm:text-lg hover:bg-[#8b5e3c] transition w-full max-w-xs"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* HERO */}
      <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
        <img src="/login.png" alt="Products Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--secondary)]/25"></div>
        <div className="relative z-10 text-center px-5 sm:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          >
            Checkout
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 flex justify-center items-center gap-2 sm:gap-4 text-white text-sm sm:text-base flex-wrap"
          >
            <Link to="/" className="hover:text-[#8b5e3c] hover:underline transition">Home</Link>
            <span className="font-bold">/</span>
            <Link to="/cart" className="hover:text-[#8b5e3c] hover:underline transition">Cart</Link>
            <span className="font-bold">/</span>
            <span className="font-semibold">Checkout</span>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* LEFT: Billing & Payment */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-md sm:shadow-lg p-5 sm:p-7 md:p-9 space-y-6">
              <h2 className="text-2xl sm:text-2.5xl font-bold text-gray-800">Billing Details</h2>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 overflow-x-auto -mx-5 sm:-mx-7 md:-mx-9 px-5 sm:px-7 md:px-9">
                {["saved", "new", "payment"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[110px] py-3.5 sm:py-4 text-center font-medium text-sm sm:text-base transition-colors whitespace-nowrap ${activeTab === tab ? "border-b-2 border-[#6b3f26] text-[#6b3f26]" : "text-gray-600 hover:text-gray-800"
                      }`}
                  >
                    {tab === "saved" ? "Saved Addresses" : tab === "new" ? "New Address" : "Payment"}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="pt-5 sm:pt-6">
                {activeTab === "saved" && (
                  <div className="space-y-4">
                    {user?.addresses?.length > 0 ? (
                      user.addresses.map((addr, index) => {
                        const addrId = addr._id || index;
                        const isSelected = selectedAddressId === addrId;

                        return (
                          <div
                            key={addrId}
                            onClick={() => {
                              setSelectedAddressId(addrId);

                              // Same cleaning logic
                              let cleanedPhone = '';
                              const possibleKeys = ['phone', 'mobile', 'contact', 'phoneNumber'];

                              for (const key of possibleKeys) {
                                if (addr[key]) {
                                  cleanedPhone = String(addr[key]).replace(/\D/g, '');
                                  break;
                                }
                              }

                              if (!cleanedPhone && user?.phone) {
                                cleanedPhone = String(user.phone).replace(/\D/g, '');
                              }

                              if (cleanedPhone.length > 10) {
                                if (cleanedPhone.startsWith('91')) cleanedPhone = cleanedPhone.slice(2);
                                else if (cleanedPhone.startsWith('0')) cleanedPhone = cleanedPhone.slice(1);
                                cleanedPhone = cleanedPhone.slice(0, 10);
                              }

                              setForm({
                                ...form,
                                firstName: addr.firstName || "",
                                lastName: addr.lastName || "",
                                email: addr.email || user.email || "",
                                phone: cleanedPhone,
                                country: addr.country || "",
                                address: addr.street || addr.address || "",
                                city: addr.city || "",
                                state: addr.state || "",
                                pincode: addr.zip || addr.pincode || "",
                              });

                              toast.info("Address selected for this order!");
                            }}
                            className={`relative p-4 sm:p-5 border rounded-xl cursor-pointer transition-all duration-200 text-sm sm:text-base ${isSelected
                              ? "border-[#6b3f26] bg-[#fffaf3] shadow-md ring-2 ring-[#6b3f26]/30"
                              : "border-gray-200 hover:border-[#6b3f26] hover:shadow"
                              }`}
                          >
                            {isSelected && (
                              <div className="absolute top-3 right-3 text-green-600">
                                <CheckCircle className="h-6 w-6" fill="currentColor" />
                              </div>
                            )}

                            <div className="font-medium text-gray-900 pr-10">
                              {addr.firstName} {addr.lastName}
                              {addr.isDefault && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>}
                            </div>

                            <div className="text-gray-600 mt-1.5 leading-relaxed">
                              {addr.street || addr.address}, {addr.city}, {addr.state} {addr.zip || addr.pincode}
                              <br />
                              {addr.country} • {addr.phone}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-10 sm:py-12 text-gray-500 text-base">
                        No saved addresses yet. Switch to "New Address" tab.
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "new" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input label="First Name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                      <Input label="Last Name" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                    </div>

                    <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                    />

                    <CustomSelect
                      label="Country"
                      required
                      options={["India", "United States", "United Kingdom", "Japan", "France", "Canada", "Brazil", "South Africa"]}
                      value={form.country}
                      onChange={(val) => setForm({ ...form, country: val })}
                    />

                    <Input label="Address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <Input label="City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                      <Input label="State" required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                      <Input
                        label="Pincode"
                        required
                        maxLength={6}
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "payment" && (
                  <div className="space-y-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Payment Method</h3>
                    <div className="space-y-4">
                      <Payment icon={<CreditCard className="w-6 h-6" />} label="Credit / Debit Card" value="card" payment={payment} setPayment={setPayment} />
                      <Payment icon={<Smartphone className="w-6 h-6" />} label="Google Pay (UPI)" value="gpay" payment={payment} setPayment={setPayment} />
                      <Payment icon={<Banknote className="w-6 h-6" />} label="Cash on Delivery" value="cod" payment={payment} setPayment={setPayment} />
                    </div>

                    {payment === "card" && (
                      <div className="mt-6 p-5 sm:p-6 bg-gray-50 rounded-xl border border-gray-200 space-y-5">
                        <Input label="Cardholder Name" required value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} />
                        <Input
                          label="Card Number"
                          required
                          maxLength={19}
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
                          <Input label="Expiry (MM/YY)" required placeholder="12/25" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
                          <Input
                            label="CVV"
                            type="password"
                            required
                            maxLength={3}
                            placeholder="123"
                            value={form.cvv}
                            onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "") })}
                          />
                        </div>
                      </div>
                    )}

                    {payment === "gpay" && (
                      <div className="mt-6 bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-200">
                        <Input label="UPI ID" required placeholder="example@okaxis" value={form.upi} onChange={(e) => setForm({ ...form, upi: e.target.value })} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2 lg:sticky lg:top-6 h-fit">
            <div className="bg-white rounded-2xl shadow-md sm:shadow-lg p-6 sm:p-7 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-5">Order Summary</h2>

              <div className="border-t border-gray-200 pt-5 space-y-3 text-sm sm:text-base">
                <Row label="Items" value={cartItems.length} />
                <Row label="Subtotal" value={`₹${subtotal.toFixed(2)}`} />
                <Row label="Shipping" value={shipping ? `₹${shipping.toFixed(2)}` : "Free"} green={!shipping} />
              </div>

              <div className="border-t border-gray-200 my-5"></div>

              <Row label="Total" value={`₹${total.toFixed(2)}`} bold big />

              <button
                onClick={() => {
                  const phone = form.phone.trim();

                  if (!phone) {
                    toast.error("Phone number is required");
                    return;
                  }

                  if (phone.length !== 10) {
                    toast.error(`Phone number must be exactly 10 digits (currently ${phone.length} digits)`);
                    return;
                  }

                  if (!/^[6-9]/.test(phone)) {
                    toast.error("Phone number must start with 6, 7, 8 or 9");
                    return;
                  }

                  // All good → proceed
                  if (payment === "cod") {
                    setShowOtpModal(true);
                  } else {
                    handleOrder();
                  }
                }}
                disabled={loading || cartItems.length === 0}
                className={`w-full mt-6 py-3.5 sm:py-4 rounded-xl font-bold text-white text-base sm:text-lg transition shadow-md flex items-center justify-center gap-2
                  ${loading || cartItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#6b3f26] hover:bg-[#8b5e3c]"}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>

              <div className="mt-5 flex flex-col items-center text-gray-600 text-xs sm:text-sm gap-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Safe & Secure Checkout</span>
                </div>
                <p className="text-center text-gray-500 mt-1">Your payment information is encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal - appears for COD */}
      <OtpVerificationModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        email={form.email.trim()}        
        onVerified={handleOrder}           
      />

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
        toastStyle={{
          background: "var(--bg-soft)",
          color: "var(--secondary)",
          fontWeight: 600,
          borderRadius: "10px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
          padding: "14px 18px",
        }}
      />

      <Features />
    </div>
  );
}

/* ────────────────────────────────────────────────
   Reusable Components (unchanged)
───────────────────────────────────────────────── */

function Input({ label, required, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b3f26]/60 focus:border-[#6b3f26] transition text-base"
      />
    </div>
  );
}

function Payment({ icon, label, value, payment, setPayment }) {
  return (
    <label
      className={`flex items-center justify-between p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all text-sm sm:text-base
        ${payment === value ? "border-[#6b3f26] bg-[#fffaf3] shadow-sm" : "border-gray-200 hover:border-gray-300 bg-white"}`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
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

function Row({ label, value, bold, big, green }) {
  return (
    <div
      className={`flex justify-between ${bold ? "text-lg sm:text-xl font-bold text-gray-900" : "text-gray-600"} ${green ? "text-green-600" : ""
        } ${big ? "text-xl sm:text-2xl font-bold" : ""}`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function CustomSelect({ label, required, options = [], value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={ref}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white flex justify-between items-center shadow-sm hover:border-[#6b3f26] transition text-base">
          <span className={value ? "text-gray-900" : "text-gray-400"}>{value || `Select ${label}`}</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {open && (
          <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl max-h-60 overflow-auto shadow-xl">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="px-4 py-3 hover:bg-[#6b3f26] hover:text-white transition cursor-pointer"
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}