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
  Filler
);

export default function StatCard({ title, value, percent, trend }) {
  /* 🔹 Sparkline Data */
  const data = {
    labels: Array(10).fill(""),
    datasets: [
      {
        data: Array.from({ length: 10 }, () =>
          Math.floor(Math.random() * 100 + 40)
        ),
        borderColor: "rgba(198,59,47,0.9)",
        borderWidth: 2,
        tension: 0.45,
        pointRadius: 0,
        fill: true,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 90);
          gradient.addColorStop(0, "rgba(198,59,47,0.30)");
          gradient.addColorStop(1, "rgba(198,59,47,0.02)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  /* 🔹 Right Icon */
  const iconWrapper =
    "p-2 rounded-xl bg-white/60 backdrop-blur-md border border-[rgba(198,59,47,0.15)]";

  const getRightIcon = () => {
    switch (title.toLowerCase()) {
      case "total sales":
        return <CreditCard className="w-5 h-5 text-[var(--primary)]" />;
      case "total orders":
        return <ShoppingCart className="w-5 h-5 text-[var(--primary)]" />;
      case "total visitors":
        return <Users className="w-5 h-5 text-[var(--primary)]" />;
      default:
        return null;
    }
  };

  const displayValue =
    title.toLowerCase() === "total sales" ? `₹${value}` : value;

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-3 bg-[var(--bg-main)]
      shadow-sm hover:shadow-lg transition-all duration-300
      min-h-[105px]"
    >
      {/* 🔹 Blurred Background Chart */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 blur-[3px] opacity-25">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* 🔹 Content */}
      <div className="relative z-10 flex justify-between items-start">
        {/* Left */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-[var(--text-main)] leading-tight">
            {displayValue}
          </h2>

          {/* Trend Badge */}
          <div
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold w-fit
              ${
                trend === "up"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
          >
            {trend === "up" ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            {percent}
          </div>
        </div>

        {/* Right */}
        <div className={iconWrapper}>{getRightIcon()}</div>
      </div>
    </div>
  );
}
