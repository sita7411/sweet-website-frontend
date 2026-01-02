import React from "react";

const features = [
  {
    id: 1,
    title: "Handmade Fresh Chikki",
    description: "Every piece is freshly made with love using traditional recipes.",
    icon: "chikki.png",
  },
  {
    id: 2,
    title: "Nutritious & Healthy",
    description: "Packed with nuts, seeds, and natural jaggery for a healthy snack.",
    icon: "nuts_icon.png",
  },
  {
    id: 3,
    title: "Variety of Flavors",
    description: "From classic peanut to pistachio and chocolate, we have it all!",
    icon: "flavors.png",
  },
  {
    id: 4,
    title: "Special Offers Daily",
    description: "Enjoy exciting discounts and promotions every day.",
    icon: "/icons/discount.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {features.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              {/* Icon */}
              <img
                src={item.icon}
                alt={item.title}
                className="w-20 h-20 opacity-90 mb-4"
              />

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 max-w-[180px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
