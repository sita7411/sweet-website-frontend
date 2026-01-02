// FeaturesSection.jsx
import React from "react";

export default function FeaturesSection() {
  return (
    <section
      className="border-t"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--bg-soft)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 text-center">

          {/* Feature 1 */}
          <div className="flex flex-col items-center max-w-xs">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--bg-soft)" }}
            >
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: "var(--primary)" }}
              >
                <path d="M12 2l4 8H8l4-8zm0 20c-4.4 0-8-3.6-8-8h2a6 6 0 0 0 12 0h2c0 4.4-3.6 8-8 8z" />
              </svg>
            </div>

            <h3
              className="font-semibold text-base"
              style={{ color: "var(--text-main)" }}
            >
              Freshly Made Chikki
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              Prepared in small batches using pure jaggery & peanuts.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center max-w-xs">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--bg-soft)" }}
            >
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: "var(--primary)" }}
              >
                <path d="M12 1a10 10 0 1 0 10 10A10 10 0 0 0 12 1zm1 17h-2v-1.1a5.01 5.01 0 0 1-4-4.9h2a3 3 0 0 0 6 0h2a5.01 5.01 0 0 1-4 4.9zM12 7a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
              </svg>
            </div>

            <h3
              className="font-semibold text-base"
              style={{ color: "var(--text-main)" }}
            >
              Fair ₹ Pricing
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              Honest pricing with real value for every rupee.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center max-w-xs">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--bg-soft)" }}
            >
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: "var(--primary)" }}
              >
                <path d="M12 1a10 10 0 0 0-10 10v4a3 3 0 0 0 3 3h1v-7H4a8 8 0 0 1 16 0h-2v7h1a3 3 0 0 0 3-3v-4A10 10 0 0 0 12 1z" />
              </svg>
            </div>

            <h3
              className="font-semibold text-base"
              style={{ color: "var(--text-main)" }}
            >
              Trusted Support
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              Friendly help for orders, quality & freshness queries.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
