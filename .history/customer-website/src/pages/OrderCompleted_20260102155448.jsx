import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Features from "../components/Features/Features";

const orderItems = [
  {
    id: 1,
    title: "Pista Chocolate Chikki",
    flavor: "Chocolate & Pistachio",
    weight: "250g",
    qty: 2,
    price: 250,
    img: "/images/pista-chikki.png",
  },
  {
    id: 2,
    title: "Classic Peanut Chikki",
    flavor: "Roasted Peanuts & Jaggery",
    weight: "200g",
    qty: 1,
    price: 150,
    img: "/images/peanut-chikki.png",
  },
];

const OrderCompletedPage = () => {
  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-[var(--bg-main)]">

      {/* ===== Banner (Same as Cart) ===== */}
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

          <div className="mt-6 flex justify-center gap-3 text-white text-sm sm:text-base">
            <Link to="/" className="hover:underline">Home</Link>
            <span>\\</span>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <span>\\</span>
            <span className="font-semibold">Order Completed</span>
          </div>
        </div>
      </section>

      {/* ===== Content ===== */}
      <div className="container mx-auto px-4 md:px-10 mt-12 mb-24">

        {/* Success Message */}
        <div className="bg-[var(--bg-card)] rounded-xl shadow-lg p-8 text-center mb-10">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-14 h-14 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-main)]">
            Thank you for your order!
          </h2>

          <p className="text-[var(--text-muted)] mt-2">
            Aapki chikki safely pack ho rahi hai 🍯
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <Info label="Order ID" value="#CHK87452" />
            <Info label="Payment" value="UPI / Razorpay" />
            <Info label="Delivery Date" value="24 Feb 2024" />
          </div>
        </div>

        {/* ===== Main Section ===== */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: Order Items */}
          <div className="flex-1 bg-[var(--bg-card)] rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-6">
              Order Details
            </h3>

            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4 last:border-none"
              >
                <div className="flex gap-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-[var(--text-main)]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {item.flavor} | {item.weight}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      Qty: {item.qty}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-[var(--text-main)]">
                  ₹{(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div className="w-full lg:w-[340px] bg-[var(--bg-card)] rounded-xl shadow-lg p-6 self-start">
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">
              Order Summary
            </h3>

            <Row label="Subtotal" value={`₹${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value={`₹${shipping.toFixed(2)}`} />
            <Row label="Tax (5%)" value={`₹${tax.toFixed(2)}`} />

            <div className="border-t my-4"></div>

            <div className="flex justify-between font-bold text-lg text-[var(--text-main)]">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button className="mt-6 w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-white py-3 rounded-lg font-semibold transition">
              Download Invoice
            </button>

            <Link
              to="/products"
              className="block text-center mt-4 text-[var(--primary)] font-semibold hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <Features />
    </div>
  );
};

/* Small Components */
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-[var(--text-muted)]">{label}</p>
    <p className="font-semibold text-[var(--text-main)]">{value}</p>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between text-[var(--text-muted)] py-1">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default OrderCompletedPage;
