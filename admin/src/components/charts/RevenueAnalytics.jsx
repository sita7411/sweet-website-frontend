import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const data = [
    { date: "12 Aug", revenue: 9000, order: 4500 },
    { date: "13 Aug", revenue: 10000, order: 3800 },
    { date: "14 Aug", revenue: 12000, order: 5200 },
    { date: "15 Aug", revenue: 11500, order: 4200 },
    { date: "16 Aug", revenue: 14521, order: 8500 },
    { date: "17 Aug", revenue: 12000, order: 5500 },
    { date: "18 Aug", revenue: 10000, order: 3600 },
    { date: "19 Aug", revenue: 13000, order: 4800 },
];

const formatValue = (value) =>
    value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;

export default function RevenueAnalytics() {
    const [range, setRange] = useState("15_days");

    return (
<div className="w-full min-h-full bg-[var(--bg-main)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-9 ">
                <div>
                    <h3 className="text-sm font-semibold text-[#3a2416]">
                        Revenue Analytics
                    </h3>
                    <p className="text-[11px] text-[#8a6a52]">
                        Performance insights
                    </p>
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
            <div className="h-[200px] ">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
                <span>Avg ₹11.8k</span>
                <span>Orders 40.9k</span>
                <span className="text-[#f2b705] font-semibold">+18.4% ↑</span>
            </div>
        </div>
    );
}
