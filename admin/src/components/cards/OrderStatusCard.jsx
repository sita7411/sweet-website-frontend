// src/components/cards/OrderStatusCard.jsx
import React from "react";

const orderStatusData = [
  { label: "Pending Orders", value: 18, colorVar: "var(--accent)" },
  { label: "Shipped Orders", value: 42, colorVar: "var(--primary)" },
  { label: "Delivered Orders", value: 35, colorVar: "var(--secondary)" },
  { label: "Cancelled Orders", value: 5, colorVar: "var(--text-muted)" },
];

export default function OrderStatusCard() {
  return (
    <div className="p-2 w-full max-w-[220px] ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-main)]">
          Order Status Breakdown
        </h3>
        <span className="text-xs text-white bg-[var(--accent)] px-2 py-1 rounded-md">
          +6.2%
        </span>
      </div>

      {/* Total Orders */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-[var(--text-main)]">2,480</h2>
        <p className="text-xs text-[var(--text-muted)]">
          Total Orders (This Month)
        </p>
      </div>

      {/* Status List */}
      <div className="space-y-4">
        {orderStatusData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-[var(--text-muted)]">{item.label}</span>
              <span className="text-sm font-medium text-[var(--text-main)]">
                {item.value}%
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--bg-soft)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${item.value}%`, backgroundColor: item.colorVar }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
