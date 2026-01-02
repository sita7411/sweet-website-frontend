import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const orderItems = [
  {
    id: 1,
    name: "Classic Peanut Chikki",
    variant: "Peanut • 250g",
    price: 120,
    img: "/images/peanut-chikki.png",
  },
  {
    id: 2,
    name: "Pista Chocolate Chikki",
    variant: "Pista • 250g",
    price: 180,
    img: "/images/pista-chikki.png",
  },
  {
    id: 3,
    name: "Til Gud Chikki",
    variant: "Sesame • 200g",
    price: 95,
    img: "/images/til-chikki.png",
  },
];

export default function OrderCompleted() {
  return (
    <div className="min-h-screen">

      {/* ===== Hero ===== */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <img
          src="/login.png"
          alt="Order Success"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-wide"
          >
            Order Confirmed
          </motion.h1>

          <p className="mt-3 text-sm opacity-90">
            <Link to="/" className="hover:underline">Home</Link> /
            <span className="font-medium"> Order Completed</span>
          </p>
        </div>
      </section>

      {/* ===== Card ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto -mt-24 relative z-20 px-4"
      >
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">

          {/* ===== Success ===== */}
          <div className="text-center py-10 px-6 border-b">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-md"
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h2 className="mt-5 text-2xl font-semibold text-gray-800">
              Thank you for your purchase!
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Your order has been placed successfully.
            </p>
          </div>

          {/* ===== Order Meta ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-6 bg-gray-50 text-sm">
            <Info label="Order ID" value="#CHK17452" />
            <Info label="Payment" value="UPI / Paytm" />
            <Info label="Transaction ID" value="TXN894512" />
            <Info label="Delivery Date" value="24 Feb 2024" />
          </div>

          {/* ===== Order Items ===== */}
          <div className="px-8 py-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              Order Summary
            </h3>

            <div className="divide-y">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover border"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.variant}</p>
                    </div>
                  </div>

                  <p className="font-semibold text-gray-800">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* ===== Totals ===== */}
            <div className="mt-6 border-t pt-4 space-y-2 text-sm">
              <TotalRow label="Subtotal" value="₹395.00" />
              <TotalRow label="Shipping" value="₹0.00" />
              <TotalRow label="Discount" value="-₹50.00" />

              <div className="flex justify-between font-semibold text-lg text-gray-900 pt-3 border-t mt-3">
                <span>Total Paid</span>
                <span>₹345.00</span>
              </div>
            </div>

            {/* ===== Actions ===== */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-2 rounded-md border text-gray-700 hover:bg-gray-100 transition">
                Download Invoice
              </button>
              <Link
                to="/products"
                className="px-6 py-2 rounded-md bg-[var(--primary)] text-white hover:bg-[var(--secondary)] transition text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ===== Helpers ===== */

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium text-gray-800 mt-1">{value}</p>
  </div>
);

const TotalRow = ({ label, value }) => (
  <div className="flex justify-between text-gray-600">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
