import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "FEB", value: 12 },
  { month: "MAR", value: 18 },
  { month: "APR", value: 14 },
  { month: "MAY", value: 26 },
  { month: "JUN", value: 15 },
  { month: "JUL", value: 20 },
];

export default function ConversionRateCard() {
  return (
    <div className="relative w-full max-w-sm " >
      
      {/* Card */}
      <div className="
      
        p-5
      ">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4 mt-2">
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-[var(text-main)]">
              Conversion Rate
            </p>

            <div className="flex items-center gap-2 mt-1">
              <h2 className="text-3xl font-semibold text-[var(--text-main)]">
                16.9%
              </h2>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                +2.1%
              </span>
            </div>
          </div>

          <button className="
            text-xs
            px-3 py-1
            rounded-lg
            border border-black/10
            text-[var(--text-muted)]
            hover:bg-[var(--bg-soft)]
            transition
          ">
            Details
          </button>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-4 text-sm">
          <Stat label="Added to Cart" value="3,842" change="+1.8%" positive />
          <Stat label="Reached Checkout" value="1,256" change="-1.2%" />
          <Stat label="Purchased" value="649" change="+2.4%" positive />
        </div>

        {/* Chart Container */}
        <div className="
          bg-[var(--bg-soft)]
          rounded-xl
          p-3
          border border-black/5
        ">
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="orangeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f2b705" stopOpacity={0.65} />
                  <stop offset="100%" stopColor="#f2b705" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e7dccf"
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#8a6a52" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis hide />

              <Tooltip
                cursor={{ stroke: "#f2b705", strokeWidth: 1 }}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  border: "1px solid #f0e4d5",
                  boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
                }}
                labelStyle={{
                  fontSize: 11,
                  color: "#8a6a52",
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#f2b705"
                strokeWidth={2.5}
                fill="url(#orangeFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* Small Stat Component */
function Stat({ label, value, change, positive }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className="text-[var(--text-main)] font-medium">
        {value}{" "}
        <span className={`text-xs ${positive ? "text-green-600" : "text-red-500"}`}>
          {change}
        </span>
      </span>
    </div>
  );
}
