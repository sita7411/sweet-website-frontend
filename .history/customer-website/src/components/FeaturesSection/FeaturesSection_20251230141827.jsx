import React from "react";

const features = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Sed non mauris vitae erat consequat.",
    icon: "fast_delivery.png",
  },
  {
    id: 2,
    title: "Expert Chefs",
    description: "Sed non mauris vitae erat consequat.",
    icon: "/icons/chef-line.png",
  },
  {
    id: 3,
    title: "Delicious Food",
    description: "Sed non mauris vitae erat consequat.",
    icon: "/icons/pizza-line.png",
  },
  {
    id: 4,
    title: "Daily Promotions",
    description: "Sed non mauris vitae erat consequat.",
    icon: "/icons/discount-line.png",
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
                className="w-35 h-35 mb-5 opacity-90"
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
