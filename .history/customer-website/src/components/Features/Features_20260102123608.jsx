// FeaturesSection.jsx
import React from "react";
import { BadgeCheck, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    title: "Premium Ingredients",
    desc: "Made with high-quality nuts & jaggery",
    icon: BadgeCheck,
  },
  {
    title: "Flexible Payment",
    desc: "Multiple secure payment options",
    icon: CreditCard,
  },
  {
    title: "24×7 Support",
    desc: "We support online all days",
    icon: Headphones,
  },
];

export default function FeaturesSection() {
  return (
    <section className="border-b" style={{ borderColor: "var(--bg-soft)" }}>
      <div className="max-w-7xl mx-auto px-7">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 py-8">

          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex gap-4 items-start">

                {/* Icon + Circle Wrapper */}
                <div className="relative w-10 h-10 flex-shrink-0">

                  {/* Background Circle */}
                  <div
                    className="absolute bottom-0 left-4 top-3 w-7 h-7 rounded-full"
                    style={{ backgroundColor: "var(--bg-soft)" }}
                  />

                  {/* Lucide Icon */}
                  <Icon
                    className="relative w-10 h-10"
                    style={{ color: "var(--primary)" }}
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
            );
          })}

        </div>
      </div>
    </section>
  );
}
