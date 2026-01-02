import React from "react";

const features = [
  {
    id: 1,
    title: "Handmade Fresh Chikki",
    description:
      "Every piece is freshly handcrafted using traditional recipes and pure ingredients.",
    icon: "chikki.png",
  },
  {
    id: 2,
    title: "Nutritious & Healthy",
    description:
      "Loaded with premium nuts, seeds, and natural jaggery for everyday energy.",
    icon: "nuts_icon.png",
  },
  {
    id: 3,
    title: "Wide Range of Flavors",
    description:
      "From classic peanut to pistachio & chocolate — crafted for every taste.",
    icon: "flavors.png",
  },
  {
    id: 4,
    title: "Daily Special Offers",
    description:
      "Enjoy exciting deals, festive discounts, and limited-time offers daily.",
    icon: "discount.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#fffaf3] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6b3f26]">
            Why Choose Our Chikki
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Crafted with tradition, quality ingredients, and a promise of great taste in every bite.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {features.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-[#fff1db] flex items-center justify-center group-hover:scale-105 transition">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
