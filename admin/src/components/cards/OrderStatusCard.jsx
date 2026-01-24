// src/components/cards/OrderStatusCard.jsx
import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;

const STATUS_META = [
  { key: "placed", label: "Placed Orders", colorVar: "var(--accent)" },
  { key: "accepted", label: "Accepted Orders", colorVar: "var(--text-muted)" },
  {
    key: "processing",
    label: "In Progress Orders",
    colorVar: "var(--primary)",
  },
  { key: "on the way", label: "On the way Orders", colorVar: "#fc8700ff" },
  { key: "delivered", label: "Delivered Orders", colorVar: "var(--secondary)" },
];

export default function OrderStatusCard() {
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const adminToken = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/orders/admin/all`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      const json = await res.json();
      const orders = json.data || [];

      const total = orders.length;
      setTotalOrders(total);

      const calculatedData = STATUS_META.map((status) => {
        const count = orders.filter((o) => o.orderStatus === status.key).length;

        return {
          label: status.label,
          value: total ? Math.round((count / total) * 100) : 0,
          colorVar: status.colorVar,
        };
      });

      setOrderStatusData(calculatedData);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-2 w-full max-w-[250px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[350px] ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-2 sm:gap-4">
        <h3 className="text-[0.75rem] sm:text-sm md:text-[16px] font-semibold text-[var(--text-main)]">
          Order Status Breakdown
        </h3>
        <span className="text-[0.625rem] sm:text-xs md:text-sm text-white bg-[var(--accent)] px-2 py-1 rounded-md">
          {/* static hi rakha */}
          +6.2%
        </span>
      </div>

      {/* Total Orders */}
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-main)]">
          {totalOrders.toLocaleString("en-IN")}
        </h2>
        <p className="text-[0.625rem] sm:text-xs md:text-sm text-[var(--text-muted)]">
          Total Orders (This Month)
        </p>
      </div>

      {/* Status List */}
      <div className="space-y-3 sm:space-y-4">
        {orderStatusData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-[0.625rem] sm:text-sm md:text-sm text-[var(--text-muted)]">
                {item.label}
              </span>
              <span className="text-[0.625rem] sm:text-sm md:text-sm font-medium text-[var(--text-main)]">
                {item.value}%
              </span>
            </div>

            <div className="w-full h-1.5 sm:h-2 md:h-2.5 bg-[var(--bg-soft)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.colorVar,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
