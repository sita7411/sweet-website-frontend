import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { Link } from "react-router-dom";

/* ================= ORDERS DATA (Based on your screenshot) ================= */
const orders = [
  {
    id: "SDGT1254FD",
    totalPayment: 633.00,
    paymentMethod: "Paypal",
    estimatedDelivery: "24 February 2024",
    status: "Accepted",
    items: [
      { title: "Trendy Brown Coat", color: "Brown", size: "XXL", qty: 4 },
      { title: "Classy Light Coat", color: "Cream", size: "XXL", qty: 1 },
      { title: "Light Brown Sweater", color: "Light Brown", size: "S", qty: 1 },
      { title: "Modern Brown Dress", color: "Brown", size: "S", qty: 2 },
    ],
  },
  {
    id: "SDGT7412DF",
    totalPayment: 60.00,
    paymentMethod: "Cash",
    deliveredDate: "12 February 2024",
    status: "Delivered",
    items: [
      { title: "Brown Winter Coat", color: "Brown", size: "XXL", qty: 1 },
    ],
  },
];

/* ================= COMPONENT ================= */
export default function MyOrders() {
  const [expanded, setExpanded] = useState(null);

  /* ================= PDF DOWNLOAD (Kept exactly as in your code) ================= */
  const downloadInvoice = async (order) => {
    const el = document.getElementById("invoice-pdf");
    el.innerHTML = "";
    el.appendChild(InvoicePDF(order));

    el.style.display = "block";
    el.style.position = "absolute";
    el.style.left = "-9999px";
    el.style.top = "-9999px";

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
    <div className="min-h-screen bg-gray-50 py-12">
      {/* ORDERS LIST - Card Style like your screenshot */}
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">My Orders ({orders.length})</h1>

        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Order Header */}
            <div className="bg-amber-500 text-white p-4">
              <div className="grid grid-cols-3 text-sm md:text-base">
                <div>
                  <span className="font-semibold">Order ID</span><br />
                  #{order.id}
                </div>
                <div className="text-center">
                  <span className="font-semibold">Total Payment</span><br />
                  ${order.totalPayment.toFixed(2)}
                </div>
                <div className="text-right">
                  <span className="font-semibold">Payment Method</span><br />
                  {order.paymentMethod}
                </div>
              </div>
              <div className="text-right mt-2 text-sm">
                {order.estimatedDelivery || order.deliveredDate}
              </div>
            </div>

            {/* Items List */}
            <div className="p-6 space-y-6">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b pb-4 last:border-0">
                  {/* Placeholder for product image */}
                  <div className="w-20 h-20 bg-gray-200 border-2 border-dashed rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      Color: {item.color} | Size: {item.size} | Qty. {item.qty}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Status & Actions */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-4 py-2 rounded-full text-white font-semibold text-sm ${
                  order.status === "Delivered" ? "bg-green-500" : "bg-orange-500"
                }`}>
                  {order.status === "Delivered" ? "Delivered" : "Accepted"}
                </span>
                <p className="text-sm text-gray-700">
                  {order.status === "Delivered" ? "Your Order has been Delivered" : "Your Order has been Accepted"}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {order.status !== "Delivered" && (
                  <>
                    <button className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
                      Track Order
                    </button>
                    <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                      Cancel Order
                    </button>
                  </>
                )}
                {order.status === "Delivered" && (
                  <button className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">
                    Add Review
                  </button>
                )}
                <button
                  onClick={() => downloadInvoice(order)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Invoice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* HIDDEN PDF CONTAINER */}
      <div id="invoice-pdf" style={{ display: "none" }}></div>
    </div>
  );
}

/* ================= INVOICE PDF (Exactly same as your original code) ================= */
function InvoicePDF(order) {
  const guestNumber = "GST-2026-0045";
  const pdfInvoiceNumber = order.id;
  const pdfInvoiceDate = order.estimatedDelivery || order.deliveredDate;

  const pdfOrderItems = order.items.map((item) => ({
    title: `${item.title} (Color: ${item.color}, Size: ${item.size})`,
    unit: "pcs",
    quantity: item.qty,
    rate: (order.totalPayment / order.items.reduce((sum, i) => sum + i.qty, 0)).toFixed(2), // approximate rate
    amount: item.qty * (order.totalPayment / order.items.reduce((sum, i) => sum + i.qty, 0)),
  }));

  const pdfSubtotal = order.totalPayment;
  const pdfTotal = pdfSubtotal;

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
          <p style='margin:0;'>Customer</p>
          <p style='margin:0; font-size:11px;'>Address Line<br />City, Country</p>
          <p style='margin:4px 0 0; font-size:11px;'>+91 XXXXX XXXXX</p>
        </div>
      </div>

      <!-- ITEMS TABLE -->
      <table style='width:100%; border-collapse:collapse; margin-bottom:18px;'>
        <thead>
          <tr style='background-color:#f7f7f7;'>
            ${["Product", "Qty", "Rate", "Shipping", "Amount"]
              .map(
                (h) =>
                  `<th style="border:1px solid #ddd; padding:8px; font-size:11px; text-align:${h === "Product" ? "left" : "center"}">${h}</th>`
              )
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${pdfOrderItems
            .map(
              (item) => `
            <tr>
              <td style='border:1px solid #ddd; padding:8px;'><strong>${item.title}</strong><div style='font-size:10px; color:#777;'>per ${item.unit}</div></td>
              <td style='border:1px solid #ddd; text-align:center;'>${item.quantity}</td>
              <td style='border:1px solid #ddd; text-align:center;'>$${parseFloat(item.rate).toFixed(2)}</td>
              <td style='border:1px solid #ddd; text-align:center;'>$0.00</td>
              <td style='border:1px solid #ddd; text-align:right; padding-right:10px;'>$${item.amount.toFixed(2)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <!-- TOTALS -->
      <div style='display:flex; justify-content:flex-end; margin-bottom:20px;'>
        <div style='width:260px;'>
          <div style='display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;'>
            <span>Subtotal</span><span>$${pdfSubtotal.toFixed(2)}</span>
          </div>
          <div style='display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;'>
            <span>Shipping</span><span>$0.00</span>
          </div>
          <div style='display:flex; justify-content:space-between; font-size:14px; font-weight:700; border-top:2px solid #c63b2f; padding-top:6px; margin-top:6px; color:#c63b2f;'>
            <span>Total Paid</span><span>$${pdfTotal.toFixed(2)}</span>
          </div>
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