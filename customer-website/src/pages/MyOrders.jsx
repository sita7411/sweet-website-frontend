import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import Features from "../components/Features/Features";
import { Link } from "react-router-dom";

/* ================= ORDERS DATA ================= */
const orders = [
  {
    id: "CHK17452",
    date: "18 Feb 2024",
    payment: "UPI",
    status: "Delivered",
    billing: {
      name: "Customer Name",
      phone: "+91 91234 56780",
      address: "456 Candy Lane, Mumbai - 400002",
    },
    items: [
      { title: "Classic Peanut Chikki", price: 120, qty: 2 },
      { title: "Pista Chocolate Chikki", price: 180, qty: 1 },
    ],
  },
];

/* ================= COMPONENT ================= */
export default function MyOrders() {
  const [expanded, setExpanded] = useState(null);

  /* ================= PDF DOWNLOAD ================= */
  const downloadInvoice = async (order) => {
    const el = document.getElementById("invoice-pdf");
    el.innerHTML = "";
    el.appendChild(InvoicePDF(order)); // use updated PDF layout

    el.style.display = "block";
    el.style.position = "absolute";
    el.style.left = "-9999px";
    el.style.top = "-9999px";

    // Wait for images
    await new Promise((res) => setTimeout(res, 200));
    await Promise.all(
      Array.from(el.querySelectorAll("img")).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else (img.onload = img.onerror = resolve);
          })
      )
    );

    const canvas = await html2canvas(el, {
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
    pdf.save(`invoice-${order.id}.pdf`);

    el.style.display = "none";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/login.png"
          alt="Products Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--secondary)]/20"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_3px_8px_rgba(107,63,38,0.6)]"
          >
            My Orders
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
            <span className="font-semibold">My Orders</span>
          </motion.div>
        </div>
      </section>

      {/* ORDERS TABLE */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[var(--accent)]">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const total = order.items.reduce(
                  (a, i) => a + i.price * i.qty,
                  0
                );

                return (
                  <React.Fragment key={order.id}>
                    {/* SUMMARY ROW */}
                    <tr className="border-b hover:bg-[var(--bg-soft)]">
                      <td className="px-6 py-4 font-semibold">#{order.id}</td>
                      <td className="px-6 py-4 text-center">{order.date}</td>
                      <td className="px-6 py-4 text-center">{order.payment}</td>
                      <td className="px-6 py-4 text-center">{order.status}</td>
                      <td className="px-6 py-4 text-center font-bold">₹{total}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() =>
                            setExpanded(expanded === order.id ? null : order.id)
                          }
                          className="text-[var(--secondary)] font-semibold"
                        >
                          {expanded === order.id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDED DETAILS */}
                    <AnimatePresence>
                      {expanded === order.id && (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td colSpan="6" className="bg-gray-50 px-6 py-6">
                            {/* ITEMS */}
                            <table className="w-full mb-4">
                              <thead>
                                <tr className="text-sm text-gray-600">
                                  <th className="text-left">Product</th>
                                  <th>Qty</th>
                                  <th>Price</th>
                                  <th>Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.items.map((i, idx) => (
                                  <tr key={idx}>
                                    <td>{i.title}</td>
                                    <td className="text-center">{i.qty}</td>
                                    <td className="text-center">₹{i.price}</td>
                                    <td className="text-center font-semibold">
                                      ₹{i.price * i.qty}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {/* BILLING */}
                            <div className="text-sm text-gray-700 mb-4">
                              <p>
                                <strong>Name:</strong> {order.billing.name}
                              </p>
                              <p>
                                <strong>Phone:</strong> {order.billing.phone}
                              </p>
                              <p>
                                <strong>Address:</strong> {order.billing.address}
                              </p>
                            </div>

                            {/* ACTION */}
                            <button
                              onClick={() => downloadInvoice(order)}
                              className="px-5 py-2 rounded bg-[var(--secondary)] text-white font-semibold"
                            >
                              Download Invoice
                            </button>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* HIDDEN PDF CONTAINER */}
      <div id="invoice-pdf" style={{ display: "none" }}></div>

      <Features />
    </div>
  );
}

/* ================= FIXED INVOICE PDF ================= */
function InvoicePDF(order) {
  const guestNumber = "GST-2026-0045";
  const pdfInvoiceNumber = order.id;
  const pdfInvoiceDate = order.date;

  const pdfOrderItems = order.items.map((item) => ({
    title: item.title,
    unit: "pcs",
    quantity: item.qty,
    rate: item.price,
    amount: item.price * item.qty,
  }));

  const pdfSubtotal = pdfOrderItems.reduce((a, i) => a + i.amount, 0);
  const pdfTotal = pdfSubtotal; // no shipping

  const container = document.createElement("div");
  container.innerHTML = `
  <div style="
    width:210mm; min-height:297mm; padding:18mm;
    background-color:#ffffff; font-family:Helvetica, Arial, sans-serif;
    font-size:12px; color:#2e2e2e; display:flex; flex-direction:column;
  ">
    <!-- HEADER -->
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #c63b2f; padding-bottom:12px; margin-bottom:20px;">
      <div style="display:flex; gap:12px; align-items:center;">
        <img src='Logo_Marvel.png' alt='Marvel Crunch' crossOrigin='anonymous' style='width:70px; height:70px; object-fit:contain;' />
        <div>
          <h1 style='margin:0; font-size:20px; font-weight:700;'>Marvel Crunch Chikki</h1>
          <p style='margin:0; font-size:10px; color:#6b3f26;'>Premium Fresh Chikki & Bakery Products</p>
        </div>
      </div>
      <div style="text-align:right;">
        <h2 style='margin:0; font-size:26px; font-weight:700; color:#c63b2f; letter-spacing:1px;'>INVOICE</h2>
        <p style='margin:4px 0 0; font-size:10px;'>Invoice No: <strong>${pdfInvoiceNumber}</strong></p>
        <p style='margin:2px 0; font-size:10px;'>Date: ${pdfInvoiceDate}</p>
        <p style='margin:2px 0; font-size:10px;'>Guest No: ${guestNumber}</p>
      </div>
    </div>

    <!-- BILLING -->
    <div style='display:flex; justify-content:space-between; margin-bottom:22px;'>
      <div style='width:48%;'>
        <p style='font-weight:700; margin-bottom:6px;'>Bill From</p>
        <p style='margin:0;'>Marvel Crunch Chikki</p>
        <p style='margin:0; font-size:11px;'>Plot No. 133, Shreeji Textile<br />Velenja Sayan Road, Gujarat – 394150</p>
        <p style='margin:4px 0 0; font-size:11px;'>+91 99461 37919</p>
      </div>
      <div style='width:48%; text-align:right;'>
        <p style='font-weight:700; margin-bottom:6px;'>Bill To</p>
        <p style='margin:0;'>${order.billing.name}</p>
        <p style='margin:0; font-size:11px;'>${order.billing.address.replace(", ", "<br />")}</p>
        <p style='margin:4px 0 0; font-size:11px;'>${order.billing.phone}</p>
      </div>
    </div>

    <!-- ITEMS TABLE -->
    <table style='width:100%; border-collapse:collapse; margin-bottom:18px;'>
      <thead>
        <tr style='background-color:#f7f7f7;'>
          ${["Product","Qty","Rate","Shipping","Amount"].map(h => `<th style="border:1px solid #ddd; padding:8px; font-size:11px; text-align:${h==="Product"?"left":"center"}">${h}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${pdfOrderItems.map(item => `
          <tr>
            <td style='border:1px solid #ddd; padding:8px;'><strong>${item.title}</strong><div style='font-size:10px; color:#777;'>per ${item.unit}</div></td>
            <td style='border:1px solid #ddd; text-align:center;'>${item.quantity}</td>
            <td style='border:1px solid #ddd; text-align:center;'>₹${item.rate.toFixed(2)}</td>
            <td style='border:1px solid #ddd; text-align:center;'>₹0.00</td>
            <td style='border:1px solid #ddd; text-align:right; padding-right:10px;'>₹${item.amount.toFixed(2)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <!-- TOTALS -->
    <div style='display:flex; justify-content:flex-end; margin-bottom:20px;'>
      <div style='width:260px;'>
        <div style='display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;'><span>Subtotal</span><span>₹${pdfSubtotal.toFixed(2)}</span></div>
        <div style='display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;'><span>Shipping</span><span>₹0.00</span></div>
        <div style='display:flex; justify-content:space-between; font-size:14px; font-weight:700; border-top:2px solid #c63b2f; padding-top:6px; margin-top:6px; color:#c63b2f;'><span>Total Paid</span><span>₹${pdfTotal.toFixed(2)}</span></div>
      </div>
    </div>

    <!-- FOOTER -->
    <div style='margin-top:auto; text-align:center; font-size:10px; color:#777; border-top:1px solid #ddd; padding-top:10px;'>
      <p style='margin:0;'>Marvel Crunch Chikki • www.marvelcrunch.com • +91 99461 37919</p>
      <p style='margin:0;'>Thank you for your business!</p>
    </div>
  </div>
  `;

  return container;
}
