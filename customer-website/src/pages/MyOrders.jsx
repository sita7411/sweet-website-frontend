import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { Star, UploadCloud, X, Package, Truck, CheckCircle, ShoppingBag } from "lucide-react";
import axios from "axios";

// ────────────────────────────────────────────────
// CONFIG
// ────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const ORDERS_URL = `${API_BASE}/api/orders/`;

/* ================== PDF GENERATION ================== */
const downloadInvoice = async (order) => {
  const element = document.getElementById(`invoice-${order._id || order.id}`);
  if (!element) return;

  element.style.display = "block";
  element.style.position = "absolute";
  element.style.left = "-9999px";
  element.style.top = "-9999px";

  // Wait for images to load
  await Promise.all(
    Array.from(element.querySelectorAll("img")).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalHeight !== 0) resolve();
          else {
            img.onload = resolve;
            img.onerror = resolve; // continue even if error
          }
        })
    )
  );

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice-${order._id?.slice(-8).toUpperCase() || "ORDER"}.pdf`);
  } catch (err) {
    console.error("PDF generation failed:", err);
    alert("Could not generate PDF. Please try again.");
  } finally {
    element.style.display = "none";
  }
};

/* ================== INVOICE COMPONENT ================== */
function InvoicePDF({ order }) {
  const billing = order.billingDetails || {};
  const customerName = [billing.firstName, billing.lastName].filter(Boolean).join(" ") || "Valued Customer";
  
  const addressLines = [
    billing.address,
    [billing.city, billing.state].filter(Boolean).join(", "),
    billing.pincode ? `${billing.pincode}, ${billing.country || "India"}` : "",
    billing.phone ? `Phone: ${billing.phone}` : "",
  ].filter(Boolean);

  const items = (order.items || []).map((item) => ({
    title: item.name || item.title || "Product",
    unit: item.weight || "—",
    quantity: item.qty || 1,
    rate: Number(item.price || item.rate || 0),
    amount: (item.qty || 1) * Number(item.price || item.rate || 0),
  }));

  const subtotal = items.reduce((sum, i) => sum + i.amount, 0);
  const shipping = Number(order.shippingCharge || 0);
  const total = subtotal + shipping;

  const invoiceDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-IN");

  const totalRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    marginBottom: "4px",
  };

  return (
    <div
      id={`invoice-${order._id || order.id}`}
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        width: "210mm",
        minHeight: "297mm",
        padding: "18mm",
        backgroundColor: "#ffffff",
        fontFamily: "'Helvetica', 'Arial', sans-serif",
        fontSize: "12px",
        color: "#2e2e2e",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #c63b2f",
            paddingBottom: "12px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <img
              src="/Logo_Marvel.png"
              alt="Marvel Crunch"
              crossOrigin="anonymous"
              style={{ width: "70px", height: "70px", objectFit: "contain" }}
            />
            <div>
              <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>
                Marvel Crunch Chikki
              </h1>
              <p style={{ margin: 0, fontSize: "10px", color: "#6b3f26" }}>
                Premium Fresh Chikki & Bakery Products
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "26px",
                fontWeight: "700",
                color: "#c63b2f",
                letterSpacing: "1px",
              }}
            >
              INVOICE
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "10px" }}>
              Invoice No: <strong>{order._id?.slice(-8).toUpperCase() || order.id}</strong>
            </p>
            <p style={{ margin: "2px 0", fontSize: "10px" }}>Date: {invoiceDate}</p>
            <p style={{ margin: "2px 0", fontSize: "10px" }}>Guest No: GST-2026-0045</p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "22px" }}>
          <div style={{ width: "48%" }}>
            <p style={{ fontWeight: "700", marginBottom: "6px" }}>Bill From</p>
            <p style={{ margin: 0 }}>Marvel Crunch Chikki</p>
            <p style={{ margin: 0, fontSize: "11px", lineHeight: "1.4" }}>
              Plot No. 133, Shreeji Textile<br />
              Velenja Sayan Road, Gujarat – 394150
            </p>
            <p style={{ margin: "4px 0 0", fontSize: "11px" }}>+91 99461 37919</p>
          </div>

          <div style={{ width: "48%", textAlign: "right" }}>
            <p style={{ fontWeight: "700", marginBottom: "6px" }}>Bill To</p>
            <p style={{ margin: 0, fontWeight: "600" }}>{customerName}</p>
            <p style={{ margin: "4px 0 0", fontSize: "11px", lineHeight: "1.4", whiteSpace: "pre-line" }}>
              {addressLines.join("\n")}
            </p>
          </div>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "22px",
            fontSize: "11px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f7f7f7", fontWeight: "700" }}>
              {["Product", "Qty", "Rate", "Shipping", "Amount"].map((h) => (
                <th
                  key={h}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: h === "Product" ? "left" : "center",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <strong>{item.title}</strong>
                  <div style={{ fontSize: "10px", color: "#777" }}>per {item.unit}</div>
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "center" }}>{item.quantity}</td>
                <td style={{ border: "1px solid #ddd", textAlign: "center" }}>₹{item.rate.toFixed(2)}</td>
                <td style={{ border: "1px solid #ddd", textAlign: "center" }}>₹{shipping.toFixed(2)}</td>
                <td style={{ border: "1px solid #ddd", textAlign: "right", paddingRight: "10px" }}>
                  ₹{item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "260px" }}>
            <div style={totalRowStyle}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={totalRowStyle}>
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div
              style={{
                ...totalRowStyle,
                fontWeight: "700",
                fontSize: "14px",
                borderTop: "2px solid #c63b2f",
                paddingTop: "6px",
                marginTop: "6px",
                color: "#c63b2f",
              }}
            >
              <span>Total Paid</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "18mm",
          left: "18mm",
          right: "18mm",
          textAlign: "center",
          fontSize: "10px",
          color: "#777",
          borderTop: "1px solid #ddd",
          paddingTop: "10px",
        }}
      >
        <p style={{ margin: 0 }}>
          Marvel Crunch Chikki • www.marvelcrunch.com • +91 99461 37919
        </p>
        <p style={{ margin: 0 }}>Thank you for your business!</p>
      </div>
    </div>
  );
}

/* ================== ORDER STATUS TIMELINE ================== */
function OrderStatusTimeline({ order }) {
  const currentStatus = (order.orderStatus || order.status || "pending").toLowerCase().trim();

  const statusOrder = ["placed", "accepted", "processing", "on the way", "delivered"];
  
  const getStepIndex = () => {
    if (currentStatus.includes("delivered")) return 4;
    if (currentStatus.includes("on the way") || currentStatus === "shipped") return 3;
    if (currentStatus === "processing" || currentStatus === "in progress") return 2;
    if (currentStatus === "accepted" || currentStatus === "confirmed") return 1;
    return 0; // placed / pending / default
  };

  const activeIndex = getStepIndex();

  const steps = [
    { label: "Order Placed", icon: ShoppingBag },
    { label: "Accepted", icon: CheckCircle },
    { label: "In Progress", icon: Package },
    { label: "On the Way", icon: Truck },
    { label: "Delivered", icon: CheckCircle },
  ];

  return (
    <div className="px-6 py-8 bg-gray-50 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-6 text-[var(--text-main)]">Order Status</h3>
      <div className="flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-300 -translate-y-1/2" />
        {/* Progress Line */}
        <div
          className="absolute left-0 top-1/2 h-0.5 bg-[var(--secondary)] transition-all duration-700 -translate-y-1/2"
          style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= activeIndex;
          const isActive = index === activeIndex;

          // You can later improve this with real dates from statusHistory
          const dateText = isCompleted
            ? index === 0
              ? "Done"
              : index === steps.length - 1
              ? order.deliveredDate || "Delivered"
              : "Completed"
            : "Expected soon";

          return (
            <div key={index} className="flex flex-col items-center relative z-10 flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted
                    ? "bg-[var(--secondary)] text-white shadow-lg scale-110"
                    : isActive
                    ? "bg-[var(--primary)] text-white ring-4 ring-[var(--primary)]/20 scale-110"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="mt-7 text-center">
                <p
                  className={`font-medium text-sm ${
                    isCompleted || isActive ? "text-[var(--text-main)]" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {dateText}
                  {index === steps.length - 1 && order.estimatedDelivery && !order.deliveredDate && (
                    <>
                      <br />
                      <span className="font-medium">Est: {order.estimatedDelivery}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================== REVIEW MODAL ================== */
function ReviewModal({ order, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    title: "",
    details: "",
    photo: [],
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rating) return alert("Please select a rating!");
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      onClose();
      setFormData({ name: "", email: "", rating: 0, title: "", details: "", photo: [] });
    }, 2500);
  };
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[var(--bg-card)] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
              <X className="w-6 h-6" />
            </button>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-semibold mb-2">Add Review for Order #{order?.id || order?._id?.slice(-8)}</h3>
              <p className="text-[var(--text-muted)] mb-6">Share your experience with this order</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Name *" required className="border p-3 rounded w-full focus:ring-2 focus:ring-[var(--primary)]" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <input type="email" placeholder="Email *" required className="border p-3 rounded w-full focus:ring-2 focus:ring-[var(--primary)]" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Your Rating *</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        fill="currentColor"
                        className={`w-10 h-10 cursor-pointer transition ${star <= formData.rating ? "text-[var(--accent)] scale-110" : "text-gray-300"}`}
                        onClick={() => setFormData({ ...formData, rating: star })}
                      />
                    ))}
                  </div>
                </div>
                <input type="text" placeholder="Review Title *" required className="border p-3 rounded w-full focus:ring-2 focus:ring-[var(--primary)]" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                <textarea placeholder="Write your detailed review *" required rows="5" className="border p-3 rounded w-full focus:ring-2 focus:ring-[var(--primary)] resize-none" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} />
                <div>
                  <label className="block mb-2 font-medium">Add Photos / Videos (Optional)</label>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[var(--accent)] transition" onClick={() => document.getElementById("reviewFileInput").click()}>
                    <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Drag & drop or <span className="text-[var(--primary)] font-semibold">Browse</span></p>
                    {formData.photo.length > 0 && 
                      <div className="flex flex-wrap gap-3 mt-4 justify-center">
                        {formData.photo.map((file, idx) => (
                          <div key={idx} className="relative w-28 h-28 rounded overflow-hidden border">
                            {file.type.startsWith("image/") ? <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" /> : <video src={URL.createObjectURL(file)} className="w-full h-full object-cover" controls />}
                            <button type="button" onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, photo: formData.photo.filter((_, i) => i !== idx) }); }} className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">×</button>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>

                  <input id="reviewFileInput" type="file" accept="image/*,video/*" multiple className="hidden" onChange={(e) => setFormData({ ...formData, photo: [...formData.photo, ...Array.from(e.target.files)] })} />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-100 transition">Cancel</button>
                  <button type="submit" className="px-6 py-3 bg-[var(--primary)] text-white rounded hover:bg-[var(--secondary)] transition">Submit Review</button>
              </div>
              </form>
            </div>

            <AnimatePresence>

              {showThankYou && (

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[var(--bg-card)]/95 backdrop-blur flex items-center justify-center rounded-xl">

                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">

                    <img src="/review.png" alt="Thank you" className="w-32 mx-auto mb-4" />

                    <h3 className="text-2xl font-bold text-[var(--secondary)] mb-2">Thank You!</h3>

                    <p className="text-[var(--text-muted)]">Your review has been submitted successfully.</p>

                  </motion.div>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================== MAIN ORDERS PAGE ================== */
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(ORDERS_URL, {
          withCredentials: true,
        });
        if (res.data?.success) {
          setOrders(res.data.data || res.data.orders || []);
        } else {
          throw new Error(res.data?.message || "Failed to load orders");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
        <p className="text-gray-600 mb-8">When you place an order, it will appear here.</p>
        <Link
          to="/products"
          className="px-8 py-4 bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--secondary)] transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* HERO - unchanged */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img src="/login.png" alt="Chikki Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--secondary)]/30"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            My Orders
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex justify-center items-center gap-3 text-white text-sm sm:text-base"
          >
            <Link to="/" className="hover:text-[var(--text-main)] hover:font-bold hover:underline font-medium transition-all">
              Home
            </Link>
            <span className="font-bold">\\</span>
            <span className="font-semibold">My Orders</span>
          </motion.div>
        </div>
      </section>

      {/* ORDERS LIST */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <h2 className="text-2xl font-bold text-[var(--text-main)]">Orders ({orders.length})</h2>

        {orders.map((order) => (
          <div
            key={order._id || order.id}
            id={`order-${order._id || order.id}`}
            className="bg-[var(--bg-card)] border border-[var(--secondary)] rounded-xl shadow-sm overflow-hidden"
          >
            {/* ORDER HEADER */}
            <div className="bg-[var(--accent)] text-[var(--text-main)] px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm md:text-base">
              <div>
                <span className="font-semibold">Order ID</span>
                <br />#{order._id?.slice(-8).toUpperCase() || order.id}
              </div>
              <div>
                <span className="font-semibold">Total</span>
                <br />₹{(order.totalAmount || 0).toFixed(2)}
              </div>
              <div>
                <span className="font-semibold">Payment</span>
                <br />
                {order.paymentMethod?.toUpperCase() || "—"}
              </div>
              <div>
                <span className="font-semibold">
                  {order.deliveredDate ? "Delivered On" : "Estimated Delivery"}
                </span>
                <br />
                {order.deliveredDate ||
                  order.estimatedDelivery ||
                  new Date(order.createdAt).toLocaleDateString("en-IN") ||
                  "TBD"}
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="divide-y divide-gray-200">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 px-6 py-4">
                  <img
                    src={item.image || item.img || "/placeholder.png"}
                    alt={item.name || item.title || "Product"}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-[var(--text-main)]">
                      {item.name || item.title || "Product"}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {item.weight && `Weight: ${item.weight} | `}
                      Qty: {item.qty || 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <OrderStatusTimeline order={order} />

            {/* STATUS & ACTIONS */}
            <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  (order.orderStatus || order.status || "").toLowerCase() === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {(order.orderStatus || order.status || "Pending")
                  .split(" ")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                  .join(" ")}
              </span>

              <div className="flex flex-wrap gap-3">
                {(order.orderStatus || order.status || "").toLowerCase() !== "delivered" && (
                  <button
                    onClick={() => {
                      document
                        .getElementById(`order-${order._id || order.id}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="px-6 py-2 bg-[var(--secondary)] text-white rounded hover:bg-[var(--primary)] transition"
                  >
                    Track Order
                  </button>
                )}

                {(order.orderStatus || order.status || "").toLowerCase() === "delivered" && (
                  <button
                    onClick={() => setSelectedOrderForReview(order)}
                    className="px-6 py-2 bg-[var(--secondary)] text-white rounded hover:bg-[var(--primary)] transition"
                  >
                    Add Review
                  </button>
                )}

                <button
                  className="px-6 py-2 border border-[var(--secondary)] text-[var(--text-main)] rounded hover:bg-[var(--bg-soft)] transition"
                  onClick={() => downloadInvoice(order)}
                >
                  Invoice PDF
                </button>
              </div>
            </div>

            {/* HIDDEN PDF */}
            <InvoicePDF order={order} />
          </div>
        ))}
      </div>

      {/* Review Modal - unchanged for now */}
      <ReviewModal
        order={selectedOrderForReview}
        isOpen={!!selectedOrderForReview}
        onClose={() => setSelectedOrderForReview(null)}
      />
    </div>
  );
}
