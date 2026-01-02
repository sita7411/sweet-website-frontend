import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const orderItems = [
  { id: 1, name: "Classic Peanut Chikki", variant: "Peanut • 250g", price: 120, img: "/images/peanut-chikki.png" },
  { id: 2, name: "Pista Chocolate Chikki", variant: "Pista • 250g", price: 180, img: "/images/pista-chikki.png" },
  { id: 3, name: "Til Gud Chikki", variant: "Sesame • 200g", price: 95, img: "/images/til-chikki.png" },
];

export default function OrderCompleted() {
  return (
    <div className="min-h-screen ">

      {/* ===== Banner / Hero Section ===== */}
      <section className="relative h-[45vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/login.png" 
          alt="Order Completed Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--secondary)]/30"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            Order Completed
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex justify-center items-center gap-2 text-white text-sm sm:text-base"
          >
            <Link to="/" className="hover:text-[var(--accent)] hover:underline hover:font-bold transition-all duration-200">
              Home
            </Link>
            <span className="font-bold">\\</span>
            <span className="font-semibold">Order Completed</span>
          </motion.div>
        </div>
      </section>

      {/* ===== Main Order Card ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-16 md:mt-20 relative z-20 py-10 px-6 sm:px-10 rounded-xl shadow-xl"
      >

        {/* ===== Success Message ===== */}
        <div className="text-center py-6 px-4">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="mx-auto w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h2 className="text-xl sm:text-2xl font-semibold mt-4 text-[var(--text-main)]">Your order is completed!</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">Thank you. Your order has been received.</p>
        </div>

        {/* ===== Order Info Bar ===== */}
        <div className="mx-0 sm:mx-6 mb-8 bg-[var(--accent)]/90 rounded-md px-6 py-4 text-sm text-[var(--text-main)] flex flex-wrap justify-between gap-4">
          <Info label="Order ID" value="#CHK17452" />
          <Info label="Payment Method" value="UPI / Paytm" />
          <Info label="Transaction ID" value="TXN894512" />
          <Info label="Delivery Date" value="24 Feb 2024" />
          <button className="bg-[var(--secondary)] text-white px-4 py-1.5 rounded text-sm hover:shadow-md transition">
            Download Invoice
          </button>
        </div>

        {/* ===== Order Details ===== */}
        <div className="px-0 sm:px-8 pb-10">
          <h3 className="font-semibold text-[var(--text-main)] mb-4 text-lg">Order Details</h3>

          <div className="border rounded-md overflow-hidden">
            <div className="grid grid-cols-4 bg-[var(--bg-soft)] text-sm font-semibold text-[var(--text-main)] px-4 py-3">
              <span className="col-span-3">Product</span>
              <span className="text-right">Sub Total</span>
            </div>

            {orderItems.map((item) => (
              <div key={item.id} className="grid grid-cols-4 px-4 py-4 border-t items-center text-sm">
                <div className="col-span-3 flex items-center gap-4">
                  <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded" />
                  <div>
                    <p className="font-medium text-[var(--text-main)]">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{item.variant}</p>
                  </div>
                </div>
                <p className="text-right font-medium text-[var(--text-main)]">₹{item.price.toFixed(2)}</p>
              </div>
            ))}

            <div className="border-t px-4 py-4 space-y-2 text-sm">
              <TotalRow label="Shipping" value="₹0.00" />
              <TotalRow label="Taxes" value="₹0.00" />
              <TotalRow label="Coupon Discount" value="- ₹50.00" />

              <div className="flex justify-between font-semibold text-[var(--text-main)] pt-2 border-t mt-2">
                <span>Total</span>
                <span>₹345.00</span>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center">
            <Link to="/products" className="inline-block bg-[var(--primary)] text-white px-6 py-2 rounded hover:bg-[var(--secondary)] transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Helpers */
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs opacity-80">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const TotalRow = ({ label, value }) => (
  <div className="flex justify-between text-[var(--text-muted)]">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
