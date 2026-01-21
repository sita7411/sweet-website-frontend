// OrderCompleted.jsx
import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Features from "../components/Features/Features";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export default function OrderCompleted() {
  const location = useLocation();
  const { order, orderId } = location.state || {};
  const invoiceRef = useRef();

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No order found.</p>
        <Link
          to="/shop"
          className="ml-4 px-6 py-3 rounded bg-[var(--secondary)] text-white hover:bg-[var(--primary)] transition font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const orderItems = order.items || [];
  const subtotal = order.subtotal || 0;
  const shipping = order.shipping || 0;
  const total = order.total || 0;
  const paymentMethod = order.paymentMethod || "N/A";
  const transactionId = order.transactionId || "N/A";
  const deliveryDate = order.deliveryDate || "N/A";
  const customerName = order.customerName || "Customer Name";
  const customerPhone = order.phone || "N/A";
  const customerAddress = order.address || "N/A";

  const downloadInvoice = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    // temporarily display for html2canvas
    element.style.display = "block";
    await new Promise((res) => setTimeout(res, 200)); // wait for images

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${orderId}.pdf`);

    element.style.display = "none";
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/login.png"
          alt="Order Completed"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--secondary)]/30"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white"
          >
            Order Completed
          </motion.h1>
          <p className="mt-4 text-white text-sm sm:text-base">
            <Link
              to="/"
              className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200"
            >
              Home
            </Link>{" "}
            <span className="font-semibold">/ Order Completed</span>
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto mt-24 mb-24 px-4 md:px-10 relative z-20">
        {/* SUCCESS ANIMATION */}
        <div className="p-3 -mt-10 mb-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mx-auto w-24 h-24 flex items-center justify-center"
          >
            <motion.span
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-[var(--primary)]"
            />
            <div className="w-24 h-24 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-xl relative z-10">
              <svg viewBox="0 0 52 52" className="w-12 h-12 text-white" fill="none">
                <motion.circle
                  cx="26"
                  cy="26"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <motion.path
                  d="M14 27 L23 35 L38 18"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
              </svg>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-2xl font-semibold text-[var(--text-main)]"
          >
            Thank you for your purchase!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="text-[var(--text-muted)] mt-1"
          >
            Your order has been placed successfully.
          </motion.p>
        </div>

        {/* ORDER INFO */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white text-center rounded-xl shadow-md p-6 mb-8 text-sm">
          <Info label="Order ID" value={`#${orderId}`} />
          <Info label="Payment Method" value={paymentMethod} />
          <Info label="Transaction ID" value={transactionId} />
          <Info label="Delivery Date" value={deliveryDate} />
        </div>

        {/* MOBILE VIEW */}
        <div className="block lg:hidden">
          {orderItems.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-md rounded-lg p-4 mb-4 border"
            >
              <div className="flex gap-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.variant}</p>
                  <p className="font-bold text-lg mt-2">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full min-w-[700px] border border-gray-200">
            <thead className="bg-[var(--accent)] text-left text-[var(--text-main)]">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Quantity</th>
                <th className="py-3 px-6">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <motion.tr
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b hover:bg-[var(--bg-soft)] transition"
                >
                  <td className="py-4 px-6 flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 rounded shadow-sm"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-[var(--text-muted)]">{item.variant}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium">₹{item.price}</td>
                  <td className="py-4 px-6">{item.qty}</td>
                  <td className="py-4 px-6 font-semibold">₹{item.price * item.qty}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALS */}
        <div className="mt-8 flex flex-col lg:flex-row justify-end gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 min-w-[260px]">
            <TotalRow label="Subtotal" value={`₹${subtotal}`} />
            <TotalRow label="Shipping" value={`₹${shipping}`} />
            <hr className="my-3" />
            <TotalRow label="Total Paid" value={`₹${total}`} strong />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={downloadInvoice}
            className="px-6 py-3 rounded border border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--bg-soft)] transition font-semibold"
          >
            Download Invoice
          </button>
          <Link
            to="/shop"
            className="px-6 py-3 rounded bg-[var(--secondary)] text-white hover:bg-[var(--primary)] transition font-semibold text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* HIDDEN PDF DIV */}
      <div
        id="invoice-pdf"
        ref={invoiceRef}
        style={{
          display: "none",
          width: "210mm",
          minHeight: "297mm",
          padding: "18mm",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        <InvoicePDF order={order} orderId={orderId} />
      </div>

      <Features />
    </div>
  );
}

/* ================= HELPERS ================= */
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-[var(--text-muted)]">{label}</p>
    <p className="font-semibold text-[var(--text-main)] mt-1">{value}</p>
  </div>
);

const TotalRow = ({ label, value, strong }) => (
  <div
    className={`flex justify-between ${
      strong ? "font-bold text-lg text-[var(--text-main)]" : "text-[var(--text-muted)]"
    }`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

/* ================= PDF COMPONENT ================= */
function InvoicePDF({ order, orderId }) {
  const orderItems = order.items || [];
  const subtotal = order.subtotal || 0;
  const shipping = order.shipping || 0;
  const total = order.total || 0;
  const paymentMethod = order.paymentMethod || "N/A";
  const customerName = order.customerName || "Customer Name";
  const customerPhone = order.phone || "N/A";
  const customerAddress = order.address || "N/A";

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "'Helvetica', 'Arial', sans-serif",
        fontSize: "12px",
        color: "#2e2e2e",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", borderBottom: "2px solid #c63b2f", paddingBottom: "12px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>Marvel Crunch Chikki</h1>
          <p style={{ fontSize: "10px", color: "#6b3f26" }}>Premium Fresh Chikki & Bakery Products</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <h2 style={{ margin: 0, fontSize: "26px", fontWeight: "700", color: "#c63b2f" }}>INVOICE</h2>
          <p style={{ fontSize: "10px" }}>Invoice No: {orderId}</p>
          <p style={{ fontSize: "10px" }}>Payment: {paymentMethod}</p>
        </div>
      </div>

      {/* CUSTOMER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "22px" }}>
        <div style={{ width: "48%" }}>
          <p style={{ fontWeight: "700" }}>Bill From</p>
          <p>Marvel Crunch Chikki</p>
          <p style={{ fontSize: "11px", lineHeight: "1.4" }}>Plot No. 133, Shreeji Textile<br />Velenja Sayan Road, Gujarat – 394150</p>
          <p style={{ fontSize: "11px", marginTop: "4px" }}>+91 99461 37919</p>
        </div>
        <div style={{ width: "48%", textAlign: "right" }}>
          <p style={{ fontWeight: "700" }}>Bill To</p>
          <p>{customerName}</p>
          <p style={{ fontSize: "11px", lineHeight: "1.4" }}>{customerAddress}</p>
          <p style={{ fontSize: "11px", marginTop: "4px" }}>{customerPhone}</p>
        </div>
      </div>

      {/* ITEMS TABLE */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "22px", fontSize: "11px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f7f7f7", fontWeight: "700" }}>
            {["Product", "Qty", "Rate", "Amount"].map((h) => (
              <th key={h} style={{ border: "1px solid #ddd", padding: "8px", textAlign: h === "Product" ? "left" : "center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {item.title}<div style={{ fontSize: "10px", color: "#777" }}>{item.variant}</div>
              </td>
              <td style={{ border: "1px solid #ddd", textAlign: "center" }}>{item.qty}</td>
              <td style={{ border: "1px solid #ddd", textAlign: "center" }}>₹{item.price.toFixed(2)}</td>
              <td style={{ border: "1px solid #ddd", textAlign: "right", paddingRight: "10px" }}>₹{(item.price * item.qty).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "22px", width: "100%" }}>
        <div style={{ width: "260px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", fontSize: "14px", borderTop: "2px solid #c63b2f", paddingTop: "6px", marginTop: "6px", color: "#c63b2f" }}>
            <span>Total Paid</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", fontSize: "10px", color: "#777", borderTop: "1px solid #ddd", paddingTop: "10px", marginTop: "auto" }}>
        <p style={{ margin: 0 }}>Marvel Crunch Chikki • www.marvelcrunch.com • +91 99461 37919</p>
        <p style={{ margin: 0 }}>Thank you for your business!</p>
      </div>
    </div>
  );
}
