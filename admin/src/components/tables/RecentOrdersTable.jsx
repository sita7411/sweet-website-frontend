// src/components/RecentOrders.jsx
import React from "react";

const orders = [
  { id: "#CH10234", customer: "Amaya Weller", product: "Almond Chikki", qty: 2, total: "₹400", status: "Shipped" },
  { id: "#CH10235", customer: "Sebastian Adams", product: "Peanut Chikki", qty: 1, total: "₹150", status: "Processing" },
  { id: "#CH10236", customer: "Suzanne Bright", product: "Cashew Chikki", qty: 1, total: "₹250", status: "Delivered" },
  { id: "#CH10237", customer: "Peter Howl", product: "Mixed Nuts Chikki", qty: 1, total: "₹300", status: "Pending" },
  { id: "#CH10238", customer: "Anita Singh", product: "Pista Chikki", qty: 3, total: "₹900", status: "Shipped" },
];

// Status colors (using theme colors)
const statusColors = {
  Shipped: "bg-yellow-100 text-yellow-800",
  Processing: "bg-orange-100 text-orange-800",
  Delivered: "bg-green-100 text-green-800",
  Pending: "bg-red-100 text-red-800",
};

export default function RecentOrders() {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[var(--text-main)]">Recent Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--bg-soft)]">
          <thead className="bg-[var(--bg-soft)]">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-muted)]">No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-muted)]">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-muted)]">Customer</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-muted)]">Product</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-muted)]">Qty</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-muted)]">Total</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-muted)]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--bg-soft)]">
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-[var(--bg-soft)] transition-colors duration-200">
                <td className="px-4 py-2 text-sm text-[var(--text-main)]">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-[var(--text-main)]">{order.id}</td>
                <td className="px-4 py-2 text-sm text-[var(--text-main)]">{order.customer}</td>
                <td className="px-4 py-2 text-sm text-[var(--text-main)]">{order.product}</td>
                <td className="px-4 py-2 text-sm text-[var(--text-main)]">{order.qty}</td>
                <td className="px-4 py-2 text-sm text-[var(--text-main)]">{order.total}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
