import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-[var(--bg-main)] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border">

        {/* ===== Title ===== */}
        <div className="border-b px-8 py-6">
          <h1 className="text-2xl font-semibold text-[var(--text-main)]">
            Order Completed
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Home / Order Completed
          </p>
        </div>

        {/* ===== Success Message ===== */}
        <div className="text-center py-10 px-6">
          <div className="mx-auto w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-xl font-semibold mt-4 text-[var(--text-main)]">
            Your order is completed!
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Thank you. Your order has been received.
          </p>
        </div>

        {/* ===== Order Info Bar ===== */}
        <div className="mx-6 mb-8 bg-[var(--accent)]/90 rounded-md px-6 py-4 text-sm text-[var(--text-main)] flex flex-wrap justify-between gap-4">
          <Info label="Order ID" value="#CHK17452" />
          <Info label="Payment Method" value="UPI / Paytm" />
          <Info label="Transaction ID" value="TXN894512" />
          <Info label="Delivery Date" value="24 Feb 2024" />
          <button className="bg-[var(--secondary)] text-white px-4 py-1.5 rounded text-sm">
            Download Invoice
          </button>
        </div>

        {/* ===== Order Details ===== */}
        <div className="px-8 pb-10">
          <h3 className="font-semibold text-[var(--text-main)] mb-4">
            Order Details
          </h3>

          <div className="border rounded-md overflow-hidden">
            <div className="grid grid-cols-4 bg-[var(--bg-soft)] text-sm font-semibold text-[var(--text-main)] px-4 py-3">
              <span className="col-span-3">Product</span>
              <span className="text-right">Sub Total</span>
            </div>

            {orderItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 px-4 py-4 border-t items-center text-sm"
              >
                <div className="col-span-3 flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-[var(--text-main)]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {item.variant}
                    </p>
                  </div>
                </div>

                <p className="text-right font-medium text-[var(--text-main)]">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>
            ))}

            {/* ===== Totals ===== */}
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

          {/* Continue */}
          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-block bg-[var(--primary)] text-white px-6 py-2 rounded hover:bg-[var(--secondary)] transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small helpers */
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
