import { CheckCircle } from "lucide-react";

const orderItems = [
  {
    id: 1,
    name: "Classic Peanut Chikki",
    variant: "Jaggery • 250g",
    price: 120,
    img: "/images/chikki1.png",
  },
  {
    id: 2,
    name: "Pista Chocolate Chikki",
    variant: "Premium • 250g",
    price: 180,
    img: "/images/chikki2.png",
  },
  {
    id: 3,
    name: "Sesame Crunch Chikki",
    variant: "Til • 200g",
    price: 95,
    img: "/images/chikki3.png",
  },
];

export default function OrderCompleted() {
  return (
    <section className="min-h-screen bg-[var(--bg-main)] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-[var(--bg-card)] rounded-2xl shadow-md p-6 md:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <CheckCircle className="text-white w-7 h-7" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-main)]">
            Your order is completed!
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Thank you for choosing our handmade chikkis 🌿
          </p>
        </div>

        {/* Order Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[var(--bg-soft)] rounded-xl p-4 mb-8 text-sm">
          <Info label="Order ID" value="#CHK45821" />
          <Info label="Payment" value="UPI / Razorpay" />
          <Info label="Delivery" value="24 Feb 2024" />
          <button className="bg-[var(--primary)] text-white rounded-lg px-4 py-2 hover:opacity-90">
            Download Invoice
          </button>
        </div>

        {/* Order Details */}
        <h2 className="font-semibold text-lg text-[var(--text-main)] mb-4">
          Order Details
        </h2>

        <div className="space-y-4">
          {orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-14 h-14 object-contain rounded-lg bg-[var(--bg-soft)] p-1"
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
              <p className="font-medium text-[var(--text-main)]">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
          <PriceRow label="Subtotal" value="₹395" />
          <PriceRow label="Shipping" value="₹0" />
          <PriceRow label="Discount" value="- ₹50" accent />
          <div className="flex justify-between font-semibold text-base text-[var(--text-main)] pt-2">
            <span>Total</span>
            <span>₹345</span>
          </div>
        </div>

      </div>
    </section>
  );
}

/* Components */
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-[var(--text-muted)]">{label}</p>
    <p className="font-medium text-[var(--text-main)]">{value}</p>
  </div>
);

const PriceRow = ({ label, value, accent }) => (
  <div
    className={`flex justify-between ${
      accent ? "text-[var(--primary)]" : "text-[var(--text-muted)]"
    }`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
