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
    <div className="min-h-screen bg-[var(--bg-main)]">

      {/* ================= HERO ================= */}
      <section className="relative h-[42vh] flex items-center justify-center">
        <img
          src="/login.png"
          alt="Order Success"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
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

      {/* ================= CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mt-24 relative z-20 px-4"
      >
        <div className="bg-[var(--bg-card)] rounded-2xl shadow-xl overflow-hidden">

          {/* ================= SUCCESS ================= */}
          <div className="text-center py-10 px-6 border-b">
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="mx-auto w-20 h-20 rounded-full 
                         bg-[var(--primary)] 
                         flex items-center justify-center 
                         shadow-lg"
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h2 className="mt-5 text-2xl font-semibold text-[var(--text-main)]">
              Thank you for your purchase!
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Your order has been placed successfully.
            </p>
          </div>

          {/* ================= ORDER META ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-6 bg-[var(--bg-soft)] text-sm">
            <Info label="Order ID" value="#CHK17452" />
            <Info label="Payment Method" value="UPI / Paytm" />
            <Info label="Transaction ID" value="TXN894512" />
            <Info label="Delivery Date" value="24 Feb 2024" />
          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <div className="px-8 py-8">
            <h3 className="text-lg font-semibold text-[var(--text-main)] mb-5">
              Order Summary
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border border-[var(--bg-soft)] rounded-xl overflow-hidden">
                <thead className="bg-[var(--bg-soft)] text-sm text-[var(--text-main)]">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Product</th>
                    <th className="text-left px-4 py-3 font-medium">Variant</th>
                    <th className="text-right px-4 py-3 font-medium">Price</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {orderItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[var(--bg-main)] transition"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-14 h-14 rounded-md border object-cover"
                          />
                          <span className="font-medium text-[var(--text-main)]">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-[var(--text-muted)]">
                        {item.variant}
                      </td>

                      <td className="px-4 py-4 text-right font-semibold text-[var(--text-main)]">
                        ₹{item.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= TOTALS ================= */}
            <div className="mt-6 border-t pt-4 space-y-2 text-sm max-w-md ml-auto">
              <TotalRow label="Subtotal" value="₹395.00" />
              <TotalRow label="Shipping" value="₹0.00" />
              <TotalRow label="Discount" value="-₹50.00" />

              <div className="flex justify-between font-semibold text-lg text-[var(--text-main)] pt-3 border-t mt-3">
                <span>Total Paid</span>
                <span className="text-[var(--primary)]">₹345.00</span>
              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
              <button className="px-6 py-2 rounded-md border border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--bg-soft)] transition">
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

/* ================= HELPERS ================= */

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-[var(--text-muted)]">{label}</p>
    <p className="font-medium text-[var(--text-main)] mt-1">{value}</p>
  </div>
);

const TotalRow = ({ label, value }) => (
  <div className="flex justify-between text-[var(--text-muted)]">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
