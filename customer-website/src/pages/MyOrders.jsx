import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

/* ================= ORDERS DATA ================= */
const orders = [
  {
    id: "CHKK1254FD",
    totalPayment: 633.0,
    paymentMethod: "Paypal",
    estimatedDelivery: "24 February 2026",
    status: "Accepted",
    items: [
      { title: "Pista Chocolate Chikki", flavor: "Chocolate & Pista", weight: "250g", qty: 2, img: "/images/chikki1.png", rate: 100 },
      { title: "Classic Peanut Chikki", flavor: "Peanut & Jaggery", weight: "200g", qty: 3, img: "/images/chikki2.png", rate: 120 },
      { title: "Almond Chikki", flavor: "Almond & Honey", weight: "150g", qty: 1, img: "/images/chikki3.png", rate: 150 },
      { title: "Cashew Dry Fruit Chikki", flavor: "Cashew & Dates", weight: "300g", qty: 2, img: "/images/chikki4.png", rate: 180 },
    ],
  },
  {
    id: "CHKK7412DF",
    totalPayment: 250.0,
    paymentMethod: "Cash",
    deliveredDate: "12 January 2026",
    status: "Delivered",
    items: [
      { title: "Sesame Chikki", flavor: "Sesame & Jaggery", weight: "250g", qty: 2, img: "/images/chikki5.png", rate: 80 },
      { title: "Coconut Chikki", flavor: "Coconut & Jaggery", weight: "200g", qty: 1, img: "/images/chikki6.png", rate: 90 },
    ],
  },
];

/* ================== PDF GENERATION ================== */
const downloadInvoice = async (order) => {
  const element = document.getElementById(`invoice-${order.id}`);

  element.style.display = "block";
  element.style.position = "absolute";
  element.style.left = "-9999px";
  element.style.top = "-9999px";

  await Promise.all(
    Array.from(element.querySelectorAll("img")).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else img.onload = img.onerror = resolve;
        })
    )
  );

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`Invoice-${order.id}.pdf`);

  element.style.display = "none";
};

/* ================== INVOICE COMPONENT (अब OrderCompleted जैसा ही) ================== */
function InvoicePDF({ order }) {
  const guestNumber = "GST-2026-0045";
  const pdfInvoiceDate = order.deliveredDate || order.estimatedDelivery;

  const pdfOrderItems = order.items.map((item) => ({
    title: item.title,
    unit: item.weight,
    quantity: item.qty,
    rate: item.rate,
    amount: item.qty * item.rate,
  }));

  const pdfSubtotal = pdfOrderItems.reduce((sum, item) => sum + item.amount, 0);
  const pdfTotal = pdfSubtotal;

  const totalRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    marginBottom: "4px",
  };

  return (
    <div
      id={`invoice-${order.id}`}
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
      {/* =============== MAIN CONTENT (flex: 1) =============== */}
      <div style={{ flex: 1 }}>
        {/* HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #c63b2f",
          paddingBottom: "12px",
          marginBottom: "20px",
        }}>
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
            <h2 style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "700",
              color: "#c63b2f",
              letterSpacing: "1px",
            }}>
              INVOICE
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "10px" }}>
              Invoice No: <strong>{order.id}</strong>
            </p>
            <p style={{ margin: "2px 0", fontSize: "10px" }}>Date: {pdfInvoiceDate}</p>
            <p style={{ margin: "2px 0", fontSize: "10px" }}>Guest No: {guestNumber}</p>
          </div>
        </div>

        {/* BILLING */}
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
            <p style={{ margin: 0 }}>Customer Name</p>
            <p style={{ margin: 0, fontSize: "11px", lineHeight: "1.4" }}>
              456 Candy Lane<br />
              Mumbai – 400002
            </p>
            <p style={{ margin: "4px 0 0", fontSize: "11px" }}>+91 91234 56780</p>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "22px",
          fontSize: "11px",
        }}>
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
            {pdfOrderItems.map((item, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <strong>{item.title}</strong>
                  <div style={{ fontSize: "10px", color: "#777" }}>per {item.unit}</div>
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "center" }}>{item.quantity}</td>
                <td style={{ border: "1px solid #ddd", textAlign: "center" }}>₹{item.rate.toFixed(2)}</td>
                <td style={{ border: "1px solid #ddd", textAlign: "center" }}>₹0.00</td>
                <td style={{ border: "1px solid #ddd", textAlign: "right", paddingRight: "10px" }}>
                  ₹{item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "260px" }}>
            <div style={totalRowStyle}>
              <span>Subtotal</span>
              <span>₹{pdfSubtotal.toFixed(2)}</span>
            </div>
            <div style={totalRowStyle}>
              <span>Shipping</span>
              <span>₹0.00</span>
            </div>
            <div style={{
              ...totalRowStyle,
              fontWeight: "700",
              fontSize: "14px",
              borderTop: "2px solid #c63b2f",
              paddingTop: "6px",
              marginTop: "6px",
              color: "#c63b2f",
            }}>
              <span>Total Paid</span>
              <span>₹{pdfTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* =============== FOOTER  =============== */}
      <div style={{
        position: "absolute",
        bottom: "18mm",
        left: "18mm",
        right: "18mm",
        textAlign: "center",
        fontSize: "10px",
        color: "#777",
        borderTop: "1px solid #ddd",
        paddingTop: "10px",
      }}>
        <p style={{ margin: 0 }}>
          Marvel Crunch Chikki • www.marvelcrunch.com • +91 99461 37919
        </p>
        <p style={{ margin: 0 }}>Thank you for your business!</p>
      </div>
    </div>
  );
}

/* ================== ORDERS PAGE ================== */
export default function OrdersPage() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img src="/login.png" alt="Chikki Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--secondary)]/30"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            My Orders
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex justify-center items-center gap-3 text-white text-sm sm:text-base">
            <Link to="/" className="hover:text-[var(--primary)] hover:underline font-medium transition-all">Home</Link>
            <span className="font-bold">\</span>
            <span className="font-semibold">My Orders</span>
          </motion.div>
        </div>
      </section>

      {/* ORDERS LIST */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        <h2 className="text-2xl font-bold text-[var(--text-main)]">Orders ({orders.length})</h2>

        {orders.map((order) => (
          <div key={order.id} className="bg-[var(--bg-card)] border border-[var(--secondary)] rounded-xl shadow-sm overflow-hidden">
            {/* ORDER HEADER */}
            <div className="bg-[var(--accent)] text-[var(--text-main)] px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm md:text-base">
              <div><span className="font-semibold">Order ID</span><br />#{order.id}</div>
              <div><span className="font-semibold">Total</span><br />₹{order.totalPayment.toFixed(2)}</div>
              <div><span className="font-semibold">Payment</span><br />{order.paymentMethod}</div>
              <div><span className="font-semibold">{order.estimatedDelivery ? "Estimated Delivery" : "Delivered Date"}</span><br />{order.estimatedDelivery || order.deliveredDate}</div>
            </div>

            {/* ORDER ITEMS */}
            <div className="divide-y divide-gray-200">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 px-6 py-4">
                  <img src={item.img} alt={item.title} className="w-20 h-20 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-semibold text-[var(--text-main)]">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">Flavor: {item.flavor} | Weight: {item.weight} | Qty: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* STATUS & ACTIONS */}
            <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-800"}`}>
                {order.status}
              </span>
              <div className="flex flex-wrap gap-3">
                {order.status !== "Delivered" && <button className="px-6 py-2 bg-[var(--secondary)] text-white rounded hover:bg-[var(--primary)] transition">Return Order</button>}
                {order.status === "Delivered" && <button className="px-6 py-2 bg-[var(--secondary)] text-white rounded hover:bg-[var(--primary)] transition">Add Review</button>}
                <button
                  className="px-6 py-2 border border-[var(--secondary)] text-[var(--text-main)] rounded hover:bg-[var(--bg-soft)] transition"
                  onClick={() => downloadInvoice(order)}
                >
                  Invoice PDF
                </button>
              </div>
            </div>

            {/* HIDDEN PDF DIV */}
            <InvoicePDF order={order} />
          </div>
        ))}
      </div>
    </div>
  );
}