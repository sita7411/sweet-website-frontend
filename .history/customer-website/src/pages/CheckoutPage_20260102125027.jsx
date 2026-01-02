import React, { useState } from "react";
import {
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

export default function CheckoutPage() {
  const [payment, setPayment] = useState("paypal");

  return (
    <div className="bg-[#fffaf3] min-h-screen">

      {/* ================= HERO BANNER ================= */}
      <div className="bg-gradient-to-r from-[#6b3f26] to-[#8a5a3b] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Secure Checkout
          </h1>
          <p className="text-sm md:text-base opacity-90">
            Complete your order with safe & trusted payment methods
          </p>

          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet size={18} />
              <span>Easy Payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm">

          {/* BILLING DETAILS */}
          <h2 className="text-xl font-semibold mb-6">
            Billing Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input" placeholder="First Name *" />
            <input className="input" placeholder="Last Name *" />
          </div>

          <input className="input mt-4" placeholder="Company Name (Optional)" />

          <select className="input mt-4">
            <option>Select Country *</option>
            <option>India</option>
          </select>

          <input className="input mt-4" placeholder="Street Address *" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <input className="input" placeholder="City *" />
            <input className="input" placeholder="State *" />
            <input className="input" placeholder="Zip Code *" />
          </div>

          <input className="input mt-4" placeholder="Phone *" />
          <input className="input mt-4" placeholder="Email *" />

          {/* DELIVERY */}
          <div className="mt-6">
            <p className="font-medium mb-2">Delivery Address</p>
            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="address" defaultChecked />
                Same as shipping
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="address" />
                Different address
              </label>
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <h2 className="text-xl font-semibold mt-10 mb-4">
            Select Payment Method
          </h2>

          <div className="space-y-3">
            <PaymentOption
              icon={<Wallet />}
              label="PayPal"
              value="paypal"
              payment={payment}
              setPayment={setPayment}
            />

            <PaymentOption
              icon={<CreditCard />}
              label="Debit / Credit Card"
              value="card"
              payment={payment}
              setPayment={setPayment}
            />

            <PaymentOption
              icon={<Smartphone />}
              label="Google Pay"
              value="gpay"
              payment={payment}
              setPayment={setPayment}
            />

            <PaymentOption
              icon={<Banknote />}
              label="Cash on Delivery"
              value="cod"
              payment={payment}
              setPayment={setPayment}
            />
          </div>

          {/* CARD FORM */}
          {payment === "card" && (
            <div className="border rounded-xl p-6 mt-6 bg-[#fffaf3]">
              <h4 className="font-medium mb-4">
                Card Details
              </h4>

              <input className="input mb-3" placeholder="Card Holder Name *" />
              <input className="input mb-3" placeholder="Card Number *" />

              <div className="grid grid-cols-2 gap-3">
                <input className="input" placeholder="MM / YY" />
                <input className="input" placeholder="CVV" />
              </div>

              <label className="flex items-center gap-2 mt-4 text-sm">
                <input type="checkbox" />
                Save card for future payments
              </label>

              <button className="mt-5 bg-[#6b3f26] text-white px-6 py-2 rounded-md hover:opacity-90 transition">
                Add Card
              </button>
            </div>
          )}
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items</span>
              <span>8</span>
            </div>
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹708.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Coupon Discount</span>
              <span>-₹100.00</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>₹633.00</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-[#6b3f26] text-white py-3 rounded-md hover:opacity-90 transition">
            Confirm & Pay
          </button>

          <p className="text-xs text-center mt-4 text-gray-500">
            Your payment is encrypted & secure
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= PAYMENT OPTION COMPONENT ================= */

function PaymentOption({ icon, label, value, payment, setPayment }) {
  return (
    <label
      className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition
      ${payment === value ? "border-[#6b3f26] bg-[#fffaf3]" : "hover:bg-gray-50"}`}
    >
      <div className="flex items-center gap-3">
        <div className="text-[#6b3f26]">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>

      <input
        type="radio"
        checked={payment === value}
        onChange={() => setPayment(value)}
      />
    </label>
  );
}
