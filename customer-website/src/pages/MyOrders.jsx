// src/pages/OrdersPage.jsx
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

// ─── API Helper ──────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE || "https://sweet-backend-nhwt.onrender.com";

const api = {
  async getMyOrders() {
    const res = await fetch(`${BASE_URL}/api/orders`, {
      credentials: "include", // for cookies (JWT or session)
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Error ${res.status}`);
    }
    return res.json();
  },
};

// ─── Your existing InvoicePDF, OrderStatusTimeline, ReviewModal components ───
// (keep them exactly as you had – I'm not repeating them here to save space)

function InvoicePDF({ order }) { /* your existing code */ }
function OrderStatusTimeline({ order }) { /* your existing code */ }
function ReviewModal({ order, isOpen, onClose }) { /* your existing code */ }

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.getMyOrders();

        // Backend returns { success: true, count, data: [...] }
        const realOrders = response.data || [];

        // Map backend fields → frontend expected structure
        const formattedOrders = realOrders.map((o) => ({
          id: o.orderNumber || o._id.slice(-8).toUpperCase(),
          totalPayment: o.totalAmount || 0,
          paymentMethod: o.paymentMethod === "cod" ? "Cash" : "Card",
          estimatedDelivery: o.estimatedDelivery || null,
          deliveredDate: o.deliveredDate || null,
          status: mapStatus(o.orderStatus),
          items: o.items.map((i) => ({
            title: i.name,
            flavor: i.flavor || "", // add if you store flavor
            weight: i.weight,
            qty: i.qty,
            img: i.image || "/images/placeholder.png",
            rate: i.price,
          })),
        }));

        if (mounted) setOrders(formattedOrders);
      } catch (err) {
        console.error("Orders fetch error:", err);
        if (mounted) setError(err.message || "Failed to load orders");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  // Convert backend status to frontend-friendly text
  const mapStatus = (status) => {
    const map = {
      pending: "Pending",
      placed: "Placed",
      confirmed: "Accepted",
      processing: "Processing",
      "on the way": "On the Way",
      shipped: "Shipped",
      delivered: "Delivered",
      rejected: "Rejected",
      cancelled: "Cancelled",
    };
    return map[status?.toLowerCase()] || status || "Pending";
  };

  // ─── UI (exactly same as your original) ─────────────────────────────────────
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
    <div className="min-h-screen">
      {/* Hero section – unchanged */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img src="/login.png" alt="Chikki Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--secondary)]/30"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            My Orders
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex justify-center items-center gap-3 text-white text-sm sm:text-base">
            <Link to="/" className="hover:text-[var(--text-main)] hover:font-bold hover:underline font-medium transition-all">Home</Link>
            <span className="font-bold">\\</span>
            <span className="font-semibold">My Orders</span>
          </motion.div>
        </div>
      </section>

      {/* Orders List */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <h2 className="text-2xl font-bold text-[var(--text-main)]">
          Orders ({orders.length})
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            You haven't placed any orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              id={`order-${order.id}`}
              className="bg-[var(--bg-card)] border border-[var(--secondary)] rounded-xl shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-[var(--accent)] text-[var(--text-main)] px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm md:text-base">
                <div><span className="font-semibold">Order ID</span><br />#{order.id}</div>
                <div><span className="font-semibold">Total</span><br />₹{order.totalPayment.toFixed(2)}</div>
                <div><span className="font-semibold">Payment</span><br />{order.paymentMethod}</div>
                <div>
                  <span className="font-semibold">
                    {order.estimatedDelivery ? "Estimated Delivery" : "Delivered Date"}
                  </span>
                  <br />
                  {order.estimatedDelivery || order.deliveredDate || "—"}
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-200">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 px-6 py-4">
                    <img src={item.img} alt={item.title} className="w-20 h-20 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-semibold text-[var(--text-main)]">{item.title}</h3>
                      <p className="text-sm text-[var(--text-muted)]">
                        Flavor: {item.flavor} | Weight: {item.weight} | Qty: {item.qty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <OrderStatusTimeline order={order} />

              {/* Actions */}
              <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-800"}`}>
                  {order.status}
                </span>
                <div className="flex flex-wrap gap-3">
                  {order.status !== "Delivered" && (
                    <button
                      onClick={() => document.getElementById(`order-${order.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}
                      className="px-6 py-2 bg-[var(--secondary)] text-white rounded hover:bg-[var(--primary)] transition"
                    >
                      Track Order
                    </button>
                  )}
                  {order.status === "Delivered" && (
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

              {/* Hidden PDF */}
              <InvoicePDF order={order} />
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        order={selectedOrderForReview}
        isOpen={!!selectedOrderForReview}
        onClose={() => setSelectedOrderForReview(null)}
      />
    </div>
  );
}
