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
    <section >
      <div className="max-w-7xl mx-auto px-4 sm:px-7">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-6 sm:gap-10 py-8">

          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex flex-1 sm:flex-none gap-4 items-start min-w-[220px]"
              >

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
