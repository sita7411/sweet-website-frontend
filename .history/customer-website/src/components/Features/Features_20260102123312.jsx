// FeaturesSection.jsx
import React from "react";

const features = [
  {
  title: "Premium Ingredients",
  desc: "Made with high-quality nuts & jaggery",
  icon: "/premium-quality.png",
},

  {
    title: "Flexible Payment",
    desc: "Multiple secure payment options",
    icon: "/payment.png",
  },
  {
    title: "24×7 Support",
    desc: "We support online all days",
    icon: "/support.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="border-b" style={{ borderColor: "var(--bg-soft)" }}>
      <div className="max-w-7xl mx-auto px-7">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 py-8">

          {features.map((item, i) => (
            <div key={i} className="flex gap-4 items-start">

              {/* Icon + Circle Wrapper */}
              <div className="relative w-10 h-10 flex-shrink-0">

                {/* Background Circle */}
                <div
                  className="absolute bottom-0 left-4 top-4 w-6 h-6 rounded-full"
                  style={{ backgroundColor: "var(--bg-soft)" }}
                />

                {/* Icon Image */}
                <img
                  src={item.icon}
                  alt={item.title}
                  className="relative w-15 h-5 object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h4
                  className="font-semibold text-base"
                  style={{ color: "var(--text-main)" }}
                >
                  {item.title}
                </h4>

                <p
                  className="text-sm mt-1"
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
