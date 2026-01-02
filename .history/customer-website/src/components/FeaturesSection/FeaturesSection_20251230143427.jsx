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
    <section className=" py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--secondary)] tracking-tight">
            Crafted With Care
          </h2>
          <p className="mt-4 text-[var(--text-muted)] max-w-2xl mx-auto">
            Traditional taste, premium ingredients, and authentic Indian flavors in every bite.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14">
          {features.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="mb-6">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-12 h-12 object-contain opacity-90"
                />
              </div>

              {/* Divider Accent */}
              <div className="w-8 h-[2px] bg-[var(--accent)] mb-4" />

              {/* Title */}
              <h3 className="text-base font-medium text-[var(--text-main)] mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-[220px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
