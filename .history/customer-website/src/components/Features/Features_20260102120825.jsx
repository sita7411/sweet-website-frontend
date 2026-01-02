// FeaturesSection.jsx
import React from "react";

export default function FeaturesSection() {
  return (
    <section
      className="py-14"
      style={{ backgroundColor: "" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">

          {/* Fresh & Pure Ingredients */}
          <div className="flex items-start gap-5 max-w-sm">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--bg-soft)" }}
            >
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: "var(--primary)" }}
              >
                <path d="M12 2l4 8H8l4-8zm0 20c-4.4 0-8-3.6-8-8 0-2.5 1.2-4.8 3.1-6.2l1.3 2.6C7.5 11.2 7 12.1 7 14c0 2.8 2.2 5 5 5s5-2.2 5-5c0-1.9-.5-2.8-1.4-3.6l1.3-2.6C18.8 9.2 20 11.5 20 14c0 4.4-3.6 8-8 8z" />
              </svg>
            </div>

            <div>
              <h3
                className="font-semibold text-lg"
                style={{ color: "var(--text-main)" }}
              >
                Fresh & Pure Ingredients
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Made with premium peanuts & pure jaggery, no artificial flavors.
              </p>
            </div>
          </div>

          {/* Honest Pricing */}
          <div className="flex items-start gap-5 max-w-sm">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--bg-soft)" }}
            >
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: "var(--primary)" }}
              >
                <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm1 17.93V19h-2v-.07a7.002 7.002 0 0 1-5-6.65h2a5 5 0 0 0 10 0h2a7.002 7.002 0 0 1-5 6.65zM12 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
              </svg>
            </div>

            <div>
              <h3
                className="font-semibold text-lg"
                style={{ color: "var(--text-main)" }}
              >
                Honest ₹ Pricing
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                Transparent pricing with true value for every rupee you spend.
              </p>
            </div>
          </div>

          {/* Trusted Support */}
          <div className="flex items-start gap-5 max-w-sm">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
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

            <div>
              <h3
                className="font-semibold text-lg"
                style={{ color: "var(--text-main)" }}
              >
                Friendly Customer Care
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                We’re here to help you with orders, freshness & quality queries.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
