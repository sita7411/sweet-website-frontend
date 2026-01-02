import React from "react";

const features = [
  {
    id: 1,
    label: "01",
    title: "Handmade",
    desc: "Prepared fresh daily using traditional methods.",
  },
  {
    id: 2,
    label: "02",
    title: "Naturally Healthy",
    desc: "Pure jaggery, premium nuts, no shortcuts.",
  },
  {
    id: 3,
    label: "03",
    title: "Signature Flavours",
    desc: "Classic recipes with modern taste profiles.",
  },
  {
    id: 4,
    label: "04",
    title: "Daily Offers",
    desc: "Fresh deals curated every single day.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[var(--bg-main)] py-28">
      <div className="max-w-6xl mx-auto px-6">

        {features.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-start gap-10 py-10 border-b border-[var(--secondary)]/10 last:border-0"
          >
            {/* Large Index */}
            <div className="text-5xl font-light text-[var(--accent)] leading-none">
              {item.label}
            </div>

            {/* Content */}
            <div className="max-w-xl">
              <h3 className="text-2xl font-medium text-[var(--text-main)] mb-2">
                {item.title}
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
