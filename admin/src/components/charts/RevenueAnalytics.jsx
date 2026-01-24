import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RevenueAnalytics() {
  const [range, setRange] = useState("15_days");
  const [chartData, setChartData] = useState([]);
  const [footerStats, setFooterStats] = useState({
    avgRevenue: 0,
    totalOrders: 0,
    revenueChange: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const days = range === "15_days" ? 15 : range === "1_month" ? 30 : 90;
        const res = await axios.get(
          `http://localhost:5000/api/orders/admin/daily-stats?days=${days}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          },
        );

        if (res.data.success) {
          setChartData(res.data.data);

          // Calculate footer stats from daily data
          const totalRevenue = res.data.data.reduce(
            (sum, item) => sum + item.revenue,
            0,
          );
          const totalOrders = res.data.data.reduce(
            (sum, item) => sum + item.order,
            0,
          );
          const avgRevenue = totalRevenue / (res.data.data.length || 1);

          const prevRes = await axios.get(
            `http://localhost:5000/api/orders/admin/daily-stats?days=${days}&prev=true`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
              },
            },
          );
          let prevTotalRevenue = 0;
          if (prevRes.data.success) {
            prevTotalRevenue = prevRes.data.data.reduce(
              (sum, item) => sum + item.revenue,
              0,
            );
          }
          const revenueChange =
            prevTotalRevenue > 0
              ? (
                  ((totalRevenue - prevTotalRevenue) / prevTotalRevenue) *
                  100
                ).toFixed(1)
              : 100;

          setFooterStats({
            avgRevenue,
            totalOrders,
            revenueChange,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [range]);

  const formatValue = (value) =>
    value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;

  return (
    <div className="w-full min-h-full bg-[var(--bg-main)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-9">
        <div>
          <h3 className="text-sm font-semibold text-[#3a2416]">
            Revenue Analytics
          </h3>
          <p className="text-[11px] text-[#8a6a52]">Performance insights</p>
        </div>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="text-[11px] font-medium rounded-md px-2 py-1 border border-[#6b3f26] bg-white text-[#3a2416] cursor-pointer"
        >
          <option value="15_days">15 Days</option>
          <option value="1_month">1 Month</option>
          <option value="3_months">3 Months</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 6"
              stroke="#e7e7e7"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8a6a52", fontSize: 9, fontWeight: 700, dy: 10 }}
            />
            <YAxis
              width={34}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatValue}
              tick={{ fill: "#8a6a52", fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip
              cursor={{ stroke: "#c63b2f", strokeDasharray: "4 4" }}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="bg-[#fff1db] rounded-lg px-3 py-2 shadow text-xs">
                    <p className="font-semibold mb-1">{label}</p>
                    <p className="text-[#c63b2f]">
                      Revenue: ₹{payload[0].value.toLocaleString()}
                    </p>
                    <p className="text-[#8a6a52]">
                      Orders: {payload[1]?.value.toLocaleString()}
                    </p>
                  </div>
                ) : null
              }
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#c63b2f"
              strokeWidth={2}
              dot={{ r: 2.5 }}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="order"
              stroke="#6b3f26"
              strokeWidth={1.8}
              strokeDasharray="4 4"
              dot={false}
              opacity={0.85}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-3 text-[11px] text-[#3a2416]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c63b2f]" />
          Revenue
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-dashed border-[#6b3f26]" />
          Orders
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-3 pt-2 border-t text-[11px] text-[#8a6a52]">
        <span>Avg ₹{footerStats.avgRevenue.toLocaleString("en-IN")}</span>
        <span>Orders {footerStats.totalOrders.toLocaleString("en-IN")}</span>
        <span className="text-[#f2b705] font-semibold">
          +{footerStats.revenueChange}% ↑
        </span>
      </div>
    </div>
  );
}
