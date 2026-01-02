// FeaturesSection.jsx
import React from "react";

const features = [
  {
    title: "Free Shipping",
    desc: "Free shipping for order above ₹180",
    icon: (
      <path d="M3 7h13l3 5v5a2 2 0 0 1-2 2h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H4a1 1 0 0 1-1-1V7z" />
    ),
  },
  {
    title: "Flexible Payment",
    desc: "Multiple secure payment options",
    icon: (
      <path d="M2 6h20v12H2z M2 10h20" />
    ),
  },
  {
    title: "24×7 Support",
    desc: "We support online all days",
    icon: (
      <path d="M12 2a8 8 0 0 0-8 8v4a2 2 0 0 0 2 2h2v-6H6a6 6 0 0 1 12 0h-2v6h2a2 2 0 0 0 2-2v-4a8 8 0 0 0-8-8z" />
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="border-b"
      style={{ borderColor: "var(--bg-soft)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-6">

          {features.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 text-center md:text-left"
            >
              {/* Icon with half overlap */}
              <div
                className="relative w-0 h-3 rounded-full flex items-end justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--bg-soft)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-6 h-6 absolute -top-3"
                  style={{ color: "var(--primary)" }}
                >
                  {item.icon}
                </svg>
              </div>

              {/* Text */}
              <div>
                <h4
                  className="font-semibold text-sm"
                  style={{ color: "var(--text-main)" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
