// src/components/RecentOrders.jsx
import React, { useEffect, useState } from "react";

const statusColors = {
  pending: "bg-red-100 text-red-800",
  placed: "bg-blue-100 text-blue-800",
  accepted: "bg-indigo-100 text-indigo-800",
  processing: "bg-orange-100 text-orange-800",
  shipped: "bg-yellow-100 text-yellow-800",
  delivered: "bg-green-100 text-green-800",
};

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/orders/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.data.slice(0, 12));
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-sm">Loading orders...</div>;
  }

  return (
    <div>
      <h2 className="text-base font-semibold mb-3 text-[var(--text-main)]">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--bg-soft)] text-xs">
          <thead className="bg-[var(--bg-soft)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium">No</th>
              <th className="px-3 py-2 text-left font-medium">Order ID</th>
              <th className="px-3 py-2 text-left font-medium">Customer</th>
              <th className="px-3 py-2 text-left font-medium">Product</th>
              <th className="px-3 py-2 text-left font-medium">Qty</th>
              <th className="px-3 py-2 text-left font-medium">Total</th>
              <th className="px-3 py-2 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--bg-soft)]">
            {orders.map((order, index) => {
              const firstItem = order.items?.[0];
              const customer =
                `${order.billingDetails?.firstName || ""} ${
                  order.billingDetails?.lastName || ""
                }`.trim() || "Guest";

              return (
                <tr
                  key={order._id}
                  className="hover:bg-[var(--bg-soft)] transition"
                >
                  <td className="px-3 py-2">{index + 1}</td>

                  <td className="px-3 py-2 font-medium">
                    ORD-{order._id.slice(-6).toUpperCase()}
                  </td>

                  <td className="px-3 py-2">{customer}</td>

                  <td className="px-3 py-2">
                    {firstItem?.name || "Multiple items"}
                  </td>

                  <td className="px-3 py-2">
                    {order.items?.reduce((sum, i) => sum + i.qty, 0)}
                  </td>

                  <td className="px-3 py-2">₹{order.totalAmount}</td>

                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold  whitespace-nowrap ${
                        statusColors[order.orderStatus] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              );
            })}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
