// src/pages/OrdersPage.jsx  (or your preferred location)

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import {
  Star,
  UploadCloud,
  X,
  Package,
  Truck,
  CheckCircle,
  ShoppingBag,
} from "lucide-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://sweet-backend-nhwt.onrender.com";
const API_ORDERS_URL = `${API_BASE}/api/orders`;

// ────────────────────────────────────────────────
// PDF DOWNLOAD FUNCTION
// ────────────────────────────────────────────────
const downloadInvoice = async (order) => {
  const element = document.getElementById(`invoice-${order._id}`);

  if (!element) {
    console.warn("Invoice element not found");
    return;
  }

  element.style.display = "block";
  element.style.position = "absolute";
  element.style.left = "-9999px";
  element.style.top = "-9999px";

  // Wait for all images to load
  await Promise.all(
    Array.from(element.querySelectorAll("img")).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalHeight !== 0) resolve();
          else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        })
    )
  );

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice-${order.orderNumber || order._id.slice(-8)}.pdf`);
  } catch (err) {
    console.error("PDF generation failed:", err);
  } finally {
    element.style.display = "none";
  }
};

// ────────────────────────────────────────────────
// INVOICE PDF HIDDEN COMPONENT
// ────────────────────────────────────────────────
function InvoicePDF({ order }) {
  const pdfInvoiceDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const items = order.items || [];

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
  const shipping = order.shippingCharge || 0;
  const total = subtotal + shipping;

  return (
    <div
      id={`invoice-${order._id}`}
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        width: "210mm",
        minHeight: "297mm",
        padding: "18mm",
        backgroundColor: "#ffffff",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: "12px",
        color: "#2e2e2e",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>
        {/* Header */}
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
              }}
            >
              INVOICE
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "10px" }}>
              Invoice No: <strong>{order.orderNumber || order._id?.slice(-8)}</strong>
            </p>
            <p style={{ margin: "2px 0", fontSize: "10px" }}>Date: {pdfInvoiceDate}</p>
          </div>
        </div>

        {/* Bill From / Bill To */}
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
            <p style={{ margin: 0 }}>
              {order.billingDetails?.firstName} {order.billingDetails?.lastName || ""}
            </p>
            <p style={{ margin: 0, fontSize: "11px", lineHeight: "1.4" }}>
              {order.billingDetails?.address || "—"}<br />
              {order.billingDetails?.city || ""}, {order.billingDetails?.state || ""} –{" "}
              {order.billingDetails?.pincode || ""}
            </p>
            <p style={{ margin: "4px 0 0", fontSize: "11px" }}>
              {order.billingDetails?.phone || "—"}
            </p>
          </div>
        </div>

        {/* Table */}
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
              {["Product", "Qty", "Rate", "Amount"].map((h) => (
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
            {items.map((item, i) => {
              const amount = (item.price || 0) * (item.qty || 1);
              return (
                <tr key={i}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <strong>{item.name || "Product"}</strong>
                    <div style={{ fontSize: "10px", color: "#777" }}>
                      {item.weight ? `(${item.weight})` : ""}
                    </div>
                  </td>
                  <td style={{ border: "1px solid #ddd", textAlign: "center" }}>
                    {item.qty || 1}
                  </td>
                  <td style={{ border: "1px solid #ddd", textAlign: "center" }}>
                    ₹{(item.price || 0).toFixed(2)}
                  </td>
                  <td style={{ border: "1px solid #ddd", textAlign: "right", paddingRight: "10px" }}>
                    ₹{amount.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "260px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "700",
                fontSize: "14px",
                borderTop: "2px solid #c63b2f",
                paddingTop: "6px",
                marginTop: "6px",
                color: "#c63b2f",
              }}
            >
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          fontSize: "10px",
          color: "#777",
          borderTop: "1px solid #ddd",
          paddingTop: "10px",
          marginTop: "auto",
        }}
      >
        <p>Marvel Crunch Chikki • www.marvelcrunch.com • +91 99461 37919</p>
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// STATUS TIMELINE
// ────────────────────────────────────────────────
function OrderStatusTimeline({ order }) {
  const statusOrder = [
    "pending",
    "placed",
    "confirmed",
    "processing",
    "on the way",
    "shipped",
    "delivered",
  ];

  const currentIdx = statusOrder.indexOf((order.orderStatus || "pending").toLowerCase());
  const progress = currentIdx >= 0 ? ((currentIdx + 1) / statusOrder.length) * 100 : 0;

  const steps = [
    { label: "Order Placed", icon: ShoppingBag },
    { label: "Accepted", icon: CheckCircle },
    { label: "Processing", icon: Package },
    { label: "On the Way", icon: Truck },
    { label: "Delivered", icon: CheckCircle },
  ];

  return (
    <div className="px-6 py-8 bg-gray-50 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-6 text-[var(--text-main)]">Order Status</h3>
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-300 -translate-y-1/2" />
        <div
          className="absolute left-0 top-1/2 h-0.5 bg-[var(--secondary)] transition-all duration-700 -translate-y-1/2"
          style={{ width: `${progress}%` }}
        />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx <= currentIdx;
          const isActive = idx === currentIdx + 1;

          return (
            <div key={idx} className="flex flex-col items-center relative z-10 flex-1">
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
              <div className="mt-4 text-center">
                <p
                  className={`text-sm font-medium ${
                    isCompleted || isActive ? "text-[var(--text-main)]" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
                {idx === 0 && order.createdAt && (
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </p>
                )}
                {idx === steps.length - 1 && order.deliveredAt && (
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(order.deliveredAt).toLocaleDateString("en-IN")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// REVIEW MODAL (placeholder - connect later)
// ────────────────────────────────────────────────
function ReviewModal({ order, isOpen, onClose }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    // TODO: send to /api/reviews
    console.log("Review:", { orderId: order._id, rating, title, comment });
    alert("Review submitted! (demo)");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Review Order #{order.orderNumber || order._id.slice(-6)}</h3>
              <button onClick={onClose}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer transition ${
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Review Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Great taste, fast delivery!"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Your Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Write your experience here..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ────────────────────────────────────────────────
// MAIN ORDERS PAGE
// ────────────────────────────────────────────────
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewOrder, setReviewOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Please login to view orders");

        const res = await axios.get(API_ORDERS_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data.data || res.data || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Could not load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-80 md:h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/login.png"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/50 to-amber-600/40" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold drop-shadow-lg"
          >
            My Orders
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg"
          >
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            <span className="mx-3">/</span> My Orders
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Your Orders ({orders.length})</h2>

        {orders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No orders found. Start shopping now!
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="mb-10 bg-white rounded-xl shadow-md overflow-hidden border border-orange-100"
            >
              {/* Header */}
              <div className="bg-orange-50 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm md:text-base">
                <div>
                  <div className="font-semibold">Order ID</div>
                  <div>{order.orderNumber || order._id.slice(-8)}</div>
                </div>
                <div>
                  <div className="font-semibold">Total</div>
                  <div>₹{(order.totalAmount || 0).toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-semibold">Payment</div>
                  <div className="uppercase">{order.paymentMethod || "—"}</div>
                </div>
                <div>
                  <div className="font-semibold">
                    {order.orderStatus === "delivered" ? "Delivered" : "Placed"}
                  </div>
                  <div>
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-6">
                    <img
                      src={item.image || "/placeholder-chikki.jpg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.weight} × {item.qty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <OrderStatusTimeline order={order} />

              {/* Actions */}
              <div className="px-6 py-5 flex flex-wrap justify-between items-center gap-4 border-t">
                <div
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    order.orderStatus === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "cancelled" || order.orderStatus === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {order.orderStatus?.toUpperCase() || "PENDING"}
                </div>

                <div className="flex flex-wrap gap-3">
                  {order.orderStatus !== "delivered" && (
                    <button
                      onClick={() =>
                        document.getElementById(`order-${order._id}`)?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        })
                      }
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    >
                      Track Order
                    </button>
                  )}

                  {order.orderStatus === "delivered" && (
                    <button
                      onClick={() => setReviewOrder(order)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Add Review
                    </button>
                  )}

                  <button
                    onClick={() => downloadInvoice(order)}
                    className="px-6 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>

              {/* Hidden PDF */}
              <InvoicePDF order={order} />
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        order={reviewOrder}
        isOpen={!!reviewOrder}
        onClose={() => setReviewOrder(null)}
      />
    </div>
  );
}
