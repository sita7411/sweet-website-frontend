import React, { useState } from "react";

export default function CheckoutPage() {
  const [payment, setPayment] = useState("paypal");

  return (
    <div className="bg-[#fffaf3] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm">

          {/* BILLING DETAILS */}
          <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

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
            <p className="font-medium mb-2">Delivery Address *</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="address" defaultChecked />
                Same as shipping address
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="address" />
                Use different billing address
              </label>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <h2 className="text-xl font-semibold mt-10 mb-4">
            Select Payment Method
          </h2>

          {["paypal", "card", "gpay", "cod"].map((method) => (
            <label
              key={method}
              className="flex items-center justify-between border rounded-lg p-4 mb-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={payment === method}
                  onChange={() => setPayment(method)}
                />
                <span className="capitalize font-medium">
                  {method === "gpay" ? "Google Pay" : method}
                </span>
              </div>
            </label>
          ))}

          {/* CARD FORM */}
          {payment === "card" && (
            <div className="border rounded-lg p-5 mt-4">
              <input className="input mb-3" placeholder="Card Holder Name *" />
              <input className="input mb-3" placeholder="Card Number *" />
              <div className="grid grid-cols-2 gap-3">
                <input className="input" placeholder="Expiry Date" />
                <input className="input" placeholder="CVV" />
              </div>

              <label className="flex items-center gap-2 mt-3 text-sm">
                <input type="checkbox" /> Save card for future payments
              </label>

              <button className="mt-4 bg-[#6b3f26] text-white px-6 py-2 rounded-md">
                Add Card
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE – ORDER SUMMARY */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

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
            <div className="flex justify-between">
              <span>Coupon Discount</span>
              <span>-₹100.00</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>₹633.00</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-[#6b3f26] text-white py-3 rounded-md">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
