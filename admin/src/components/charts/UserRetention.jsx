import React from "react";

/* ================= DATA ================= */

const data = [
  [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.15, 0.1],
  [1, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.28, 0.2, 0.15, 0.1],
  [1, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.22, 0.15, 0.1],
  [1, 0.7, 0.6, 0.5, 0.4, 0.3, 0.22, 0.15],
  [1, 0.6, 0.5, 0.4, 0.3, 0.22],
  [1, 0.5, 0.4, 0.3],
  [1, 0.4],
];

const cohorts = [
  "Week 0",
  "Week 1",
  "Week 2",
  "Week 3",
  "Week 4",
  "Week 5",
  "Week 6",
];

const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);

/* ================= HELPERS ================= */

const getHeatColor = (v) => {
  if (v >= 0.8) return "var(--primary)";
  if (v >= 0.6) return "#f2b705";
  if (v >= 0.4) return "#fb923c";
  if (v >= 0.25) return "#f87171";
  return "#ef4444";
};

const getAverage = (row) =>
  Math.round((row.reduce((a, b) => a + b, 0) / row.length) * 100);

const getTrendColor = (avg) => {
  if (avg >= 60) return "text-green-600";
  if (avg >= 40) return "text-yellow-600";
  return "text-red-500";
};

/* ================= COMPONENT ================= */

const UserRetention = () => {
  return (
    <div
      className="rounded-xl border p-4 min-h-[400px] flex flex-col justify-between"
      style={{ borderColor: "var(--bg-soft)", backgroundColor: "var(--bg-main)" }}
    >
      {/* HEADER */}
      <div>
        <p
          className="text-ls font-medium"
          style={{ color: "var(--text-main)" }}
        >
          User Retention
        </p>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span
            className="text-lg font-semibold"
            style={{ color: "var(--text-main)" }}
          >
            24%
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700">
            +2.0%
          </span>
        </div>
      </div>

      {/* HEATMAP */}
     {/* HEATMAP */}
<div className="space-y-2 mt-3">
  {data.map((row, i) => {
    const avg = getAverage(row);

    return (
      <div key={i} className="flex items-center w-full">
        {/* Cohort Label */}
        <span
          className="w-14 text-[9px] flex-shrink-0"
          style={{ color: "var(--text-muted)" }}
        >
          {cohorts[i]}
        </span>

        {/* Cells */}
        <div className="flex gap-[2px] md:gap-1 flex-1 flex-wrap">
          {row.map((cell, j) => (
            <div
              key={j}
              className="w-[10px] h-[10px] md:w-[12px] md:h-[12px] transition-colors duration-300 flex-shrink-0"
              style={{ backgroundColor: getHeatColor(cell) }}
            />
          ))}
        </div>

        {/* Average */}
        <span
          className={`w-8 text-[9px] text-right ml-2 ${getTrendColor(avg)}`}
        >
          {avg}%
        </span>
      </div>
    );
  })}
</div>

      {/* LEGEND */}
      <div className="flex flex-wrap gap-3 mt-3 text-[9px]">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ background: "var(--primary)" }} />
          <span style={{ color: "var(--text-muted)" }}>80–100%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ background: "#f2b705" }} />
          <span style={{ color: "var(--text-muted)" }}>60–79%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ background: "#fb923c" }} />
          <span style={{ color: "var(--text-muted)" }}>40–59%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ background: "#f87171" }} />
          <span style={{ color: "var(--text-muted)" }}>25–39%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm" style={{ background: "#ef4444" }} />
          <span style={{ color: "var(--text-muted)" }}>Below 25%</span>
        </div>
      </div>

      {/* MONTHS */}
      <div
        className="flex gap-[4px] md:gap-[6px] pl-[56px] text-[9px] -ml-3 mt-2 flex-wrap"
        style={{ color: "var(--text-muted)" }}
      >
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      {/* FOOTER */}
      <p
        className="text-[9px] mt-2"
        style={{ color: "var(--text-muted)" }}
      >
        ⓘ Last 12 months · Updated at 1:51 PM
      </p>
    </div>
  );
};

export default UserRetention;
