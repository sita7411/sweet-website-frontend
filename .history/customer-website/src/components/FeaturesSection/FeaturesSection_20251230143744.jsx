import React from "react";

const features = [
  {
    id: 1,
    title: "Handmade Fresh Chikki",
    description:
      "Every piece is freshly handcrafted using traditional recipes.",
    icon: "chikki.png",
  },
  {
    id: 2,
    title: "Nutritious & Healthy",
    description:
      "Packed with premium nuts, seeds, and pure jaggery.",
    icon: "nuts_icon.png",
  },
  {
    id: 3,
    title: "Wide Range of Flavors",
    description:
      "From classic peanut to pistachio and chocolate varieties.",
    icon: "flavors.png",
  },
  {
    id: 4,
    title: "Daily Special Offers",
    description:
      "Enjoy exciting discounts and limited-time promotions.",
    icon: "discount.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--secondary)]">
            Crafted With Care
          </h2>
          <p className="mt-4 text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Traditional taste, premium ingredients, and authentic Indian flavors in every bite.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item) => (
            <div
              key={item.id}
              className="group bg-[var(--bg-card)] rounded-2xl p-8 text-center
              shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center 
              rounded-full bg-[var(--bg-soft)] group-hover:scale-110 transition">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Divider */}
              <div className="w-10 h-[2px] bg-[var(--accent)] mx-auto mb-4" />

              {/* Title */}
              <h3 className="text-lg font-medium text-[var(--text-main)] mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
