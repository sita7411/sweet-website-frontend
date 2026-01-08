// src/components/cards/OrderStatusCard.jsx
import React from "react";

const orderStatusData = [
  { label: "Pending Orders", value: 18, colorVar: "var(--accent)" },
  { label: "Shipped Orders", value: 42, colorVar: "var(--primary)" },
  { label: "Delivered Orders", value: 35, colorVar: "var(--secondary)" },
  { label: "Cancelled Orders", value: 5, colorVar: "var(--text-muted)" },
  { label: "Return Orders", value: 16, colorVar: "#fc8700ff" },
];

export default function OrderStatusCard() {
  return (
    <div className="p-2 w-full max-w-[250px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[350px] ">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-2 sm:gap-4">
        <h3 className="text-[0.75rem] sm:text-sm md:text-[16px] font-semibold  text-[var(--text-main)]">
          Order Status Breakdown
        </h3>
        <span className="text-[0.625rem] sm:text-xs md:text-sm text-white bg-[var(--accent)] px-2 py-1 rounded-md">
          +6.2%
        </span>
      </div>

      {/* Total Orders */}
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-main)]">
          2,480
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
                style={{ width: `${item.value}%`, backgroundColor: item.colorVar }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
