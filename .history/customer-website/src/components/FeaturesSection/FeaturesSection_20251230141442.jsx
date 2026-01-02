import React from "react";
import { ClockIcon, ChefHatIcon, PizzaSliceIcon, DiscountIcon } from "../icons"; 

const features = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Get your chikki delivered fresh and on time.",
    icon: "fast_deliverypng", 
  },
  {
    id: 2,
    title: "Best Chefs",
    description: "Our chikki is prepared by expert hands.",
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
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center space-y-4 p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <img src={feature.icon} alt={feature.title} className="w-16 h-16" />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
