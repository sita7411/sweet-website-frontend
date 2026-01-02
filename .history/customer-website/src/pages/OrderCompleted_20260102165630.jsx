import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Features from "../components/Features/Features";

const orderItems = [
  { id: 1, title: "Classic Peanut Chikki", variant: "Peanut • 250g", price: 120, qty: 1, img: "/images/peanut-chikki.png" },
  { id: 2, title: "Pista Chocolate Chikki", variant: "Pista • 250g", price: 180, qty: 1, img: "/images/pista-chikki.png" },
  { id: 3, title: "Til Gud Chikki", variant: "Sesame • 200g", price: 95, qty: 1, img: "/images/til-chikki.png" },
];

const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
const shipping = 100;
const total = subtotal + shipping;

export default function OrderCompleted() {
  const downloadInvoice = async () => {
    const element = document.getElementById("invoice-pdf");

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img src="/login.png" alt="Order Completed" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--secondary)]/30"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
            Order Completed
          </motion.h1>
          <p className="mt-4 text-white text-sm sm:text-base">
            <Link to="/" className="hover:underline">Home</Link> \\ <span className="font-semibold">Order Completed</span>
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto mt-24 mb-24 px-4 md:px-10 relative z-20">
        {/* SUCCESS */}
        <div className="p-3 -mt-10 mb-10 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <motion.span initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-[var(--primary)]" />
            <div className="w-24 h-24 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-xl relative z-10">
              <svg viewBox="0 0 52 52" className="w-12 h-12 text-white">
                <motion.circle cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                <motion.path d="M14 27 L23 35 L38 18" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
              </svg>
            </div>
          </motion.div>
          <h2 className="mt-6 text-2xl font-semibold">Thank you for your purchase!</h2>
          <p className="text-gray-500 mt-1">Your order has been placed successfully.</p>
        </div>

        {/* ORDER INFO */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white text-center rounded-xl shadow-md p-6 mb-8 text-sm">
          <Info label="Order ID" value="#CHK17452" />
          <Info label="Payment Method" value="UPI / Paytm" />
          <Info label="Transaction ID" value="TXN894512" />
          <Info label="Delivery Date" value="24 Feb 2024" />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full min-w-[700px] border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Qty</th>
                <th className="py-3 px-6">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4 px-6 flex items-center gap-4">
                    <img src={item.img} alt={item.title} className="w-16 h-16 rounded" />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.variant}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">₹{item.price}</td>
                  <td className="py-4 px-6">{item.qty}</td>
                  <td className="py-4 px-6 font-semibold">₹{item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTAL */}
        <div className="mt-8 flex justify-end">
          <div className="bg-white shadow-md rounded-lg p-6 w-64">
            <TotalRow label="Subtotal" value={`₹${subtotal}`} />
            <TotalRow label="Shipping" value={`₹${shipping}`} />
            <hr className="my-3" />
            <TotalRow label="Total Paid" value={`₹${total}`} strong />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex justify-end gap-4">
          <button onClick={downloadInvoice} className="px-6 py-3 rounded border border-[var(--secondary)] text-[var(--secondary)] hover:bg-gray-100 font-semibold">
            Download Invoice
          </button>

          <Link to="/products" className="px-6 py-3 rounded bg-[var(--secondary)] text-white font-semibold">
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* HIDDEN PDF */}
      <div className="absolute left-[-9999px] top-0">
        <InvoicePDF items={orderItems} subtotal={subtotal} shipping={shipping} total={total} />
      </div>

      <Features />
    </div>
  );
}

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold mt-1">{value}</p>
  </div>
);

const TotalRow = ({ label, value, strong }) => (
  <div className={`flex justify-between ${strong ? "font-bold text-lg" : "text-gray-600"}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

function InvoicePDF({ items, subtotal, shipping, total }) {
  return (
    <div id="invoice-pdf" className="bg-white w-[800px] p-10 text-sm">
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Product</th>
            <th className="p-2">Qty</th>
            <th className="text-right p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id} className="border-b">
              <td className="p-2">{i.title}</td>
              <td className="p-2">{i.qty}</td>
              <td className="p-2 text-right">₹{i.price * i.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-6">
        <div className="w-64">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>₹{shipping}</span></div>
          <div className="flex justify-between font-bold mt-2"><span>Total</span><span>₹{total}</span></div>
        </div>
      </div>
    </div>
  );
}
