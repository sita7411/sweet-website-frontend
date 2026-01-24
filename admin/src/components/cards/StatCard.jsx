// src/components/cards/StatCard.jsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import {
  ArrowUp,
  ArrowDown,
  ShoppingCart,
  Users,
  CreditCard,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

// Original static config (used as fallback)
const statsConfig = {
  "Total Sales": {
    value: "983,410",
    percent: "+3.34%",
    trend: "up",
    icon: CreditCard,
  },
  "Total Orders": {
    value: "58,375",
    percent: "-2.89%",
    trend: "down",
    icon: ShoppingCart,
  },
  "Total Customer": {
    value: "237,782",
    percent: "+8.02%",
    trend: "up",
    icon: Users,
  },
};

export default function StatCard({
  title,
  value, // dynamic value (string, e.g. "1248560")
  percent, // dynamic percent (string, e.g. "+12.5%")
  trend, // "up" | "down"
  loading = false,
}) {
  // Use dynamic props if provided, otherwise fallback to static config
  const config = {
    value: value !== undefined ? value : statsConfig[title]?.value || "—",
    percent:
      percent !== undefined ? percent : statsConfig[title]?.percent || "0%",
    trend: trend !== undefined ? trend : statsConfig[title]?.trend || "up",
    icon: statsConfig[title]?.icon || CreditCard,
  };

  const Icon = config.icon;

  // Sparkline now matches trend color (green for up, red for down)
  const lineColor =
    config.trend === "up"
      ? "rgba(34, 197, 94, 0.9)" // green-600-ish
      : "rgba(239, 68, 68, 0.9)"; // red-500-ish

  const fillColorStart =
    config.trend === "up"
      ? "rgba(34, 197, 94, 0.39)"
      : "rgba(239, 68, 68, 0.30)";

  /* Sparkline Data */
  const chartData = {
    labels: Array(10).fill(""),
    datasets: [
      {
        data: Array.from({ length: 10 }, () =>
          Math.floor(Math.random() * 100 + 40),
        ),
        borderColor: lineColor,
        borderWidth: 2,
        tension: 0.45,
        pointRadius: 0,
        fill: true,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 90);
          gradient.addColorStop(0, fillColorStart);
          gradient.addColorStop(1, "rgba(198,59,47,0.02)");
          return gradient;
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  // Format display value — only add ₹ for Total Sales + Indian number format
  let displayValue = config.value;
  if (title === "Total Sales") {
    const cleanNum = config.value.replace(/[₹,]/g, "");
    const num = Number(cleanNum);
    displayValue = isNaN(num)
      ? config.value
      : `₹${num.toLocaleString("en-IN")}`;
  } else {
    const cleanNum = config.value.replace(/,/g, "");
    const num = Number(cleanNum);
    displayValue = isNaN(num) ? config.value : num.toLocaleString("en-IN");
  }

  const iconWrapper =
    "p-2 rounded-xl bg-white/60 backdrop-blur-md border border-[rgba(198,59,47,0.15)]";

  // Loading skeleton — unchanged
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-2xl p-3 bg-[var(--bg-main)] shadow-sm min-h-[105px] animate-pulse">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
            <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
          </div>
          <div className={iconWrapper}>
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl p-3 bg-[var(--bg-main)] shadow-sm hover:shadow-lg transition-all duration-300 min-h-[105px]">
      {/* Blurred Background Chart */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 blur-[3px] opacity-38">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-main)] leading-tight">
            {displayValue}
          </h2>

          <div
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold w-fit ${
              config.trend === "up"
                ? "bg-green-200 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {config.trend === "up" ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {config.percent}
          </div>
        </div>

        <div className={iconWrapper}>
          <Icon className="w-5 h-5 text-[var(--primary)]" />
        </div>
      </div>
    </div>
  );
}
