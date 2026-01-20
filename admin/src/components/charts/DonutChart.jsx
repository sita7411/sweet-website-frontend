import { PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Crown, Activity } from "lucide-react";

const data = [
  { name: "Peanut Chikki", value: 38 },
  { name: "Pista Chikki", value: 27 },
  { name: "Chocolate", value: 22 },
  { name: "Dryfruit", value: 13 },
];

const COLORS = [
  "var(--primary)",
  "var(--accent)",
  "var(--secondary)",
  "var(--text-muted)",
];

export default function TopProducts() {
  return (
<div className="bg-[var(--bg-card)] rounded-xl shadow p-5 w-full bg-[var(--bg-main)] max-w-[550px] mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-main)]">
            Top Products
          </h3>
          <p className="text-xs text-gray-400">This Month</p>
        </div>
        <span className="flex items-center gap-1 text-xs text-green-600">
          <TrendingUp size={14} />
          14%
        </span>
      </div>

      {/* Donut */}
      <div className="relative flex justify-center my-3">
        <PieChart width={175} height={175}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={76}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>

        {/* Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-xs text-gray-400">Revenue</p>
          <p className="text-xl font-bold text-[var(--text-main)]">
            ₹32,450
          </p>
          <p className="text-[11px] text-green-600 mt-0.5">
            +9.3%
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4" />

      {/* Best Product */}
      <div className="flex items-center justify-between bg-[var(--bg-soft)] rounded-lg px-3 py-2 mb-3">
        <div className="flex items-center gap-2 text-xs text-[var(--text-main)]">
          <Crown size={14} className="text-[var(--primary)]" />
          Best Seller
        </div>
        <span className="text-xs font-semibold text-[var(--text-main)]">
          Peanut Chikki
        </span>
      </div>

      {/* Legend */}
      <div className="space-y-2 text-xs mb-4">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="flex items-center gap-2 mb-1 text-[var(--text-muted)]">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              {item.name}
            </span>
            <span className="font-medium text-[var(--text-main)]">
              {item.value}%
            </span>
          </div>
        ))}
      </div>

      {/* Footer Metric */}
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span className="flex items-center gap-2">
          <Activity size={13} />
          Avg Order Value
        </span>
        <span className="font-semibold text-[var(--text-main)]">
          ₹540
        </span>
      </div>

    </div>
  );
}
