import React from "react";

const features = [
  { id: 1, title: "Handmade", desc: "Freshly prepared daily", icon: "chikki.png" },
  { id: 2, title: "Healthy", desc: "Natural jaggery & nuts", icon: "nuts_icon.png" },
  { id: 3, title: "Flavours", desc: "Classic to premium range", icon: "flavors.png" },
  { id: 4, title: "Offers", desc: "Daily special deals", icon: "discount.png" },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[var(--bg-soft)]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-10">

          {features.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4"
            >
              {/* Icon */}
              <img
                src={item.icon}
                alt={item.title}
                className="w-9 h-9 object-contain opacity-85"
              />

              {/* Text */}
              <div>
                <p className="text-sm font-medium text-[var(--text-main)]">
                  {item.title}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {item.desc}
                </p>
              </div>

              {/* Separator */}
              {index !== features.length - 1 && (
                <span className="hidden md:block ml-8 w-px h-8 bg-[var(--accent)]/40" />
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
