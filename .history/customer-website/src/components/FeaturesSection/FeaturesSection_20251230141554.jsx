import React from "react";

const features = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Get your chikki delivered fresh and on time.",
    icon: "fast_delivery.png",
  },
  {
    id: 2,
    title: "Expert Chefs",
    description: "Our chikki is prepared by skilled hands.",
    icon: "/icons/chef.png",
  },
  {
    id: 3,
    title: "Delicious Taste",
    description: "Enjoy mouth-watering traditional flavors.",
    icon: "/icons/pizza.png",
  },
  {
    id: 4,
    title: "Daily Promotions",
    description: "Grab special discounts every day!",
    icon: "/icons/discount.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-yellow-100 rounded-full mb-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
