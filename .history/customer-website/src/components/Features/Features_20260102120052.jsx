// FeaturesSection.jsx
import React from 'react';
import { Truck, CreditCard, Headset } from 'lucide-react'; // Using lucide-react icons

export default function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Free Shipping",
      desc: "Free shipping for order above $180",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary" />,
      title: "Flexible Payment",
      desc: "Multiple secure payment options",
    },
    {
      icon: <Headset className="w-8 h-8 text-primary" />,
      title: "24x7 Support",
      desc: "We support online all days.",
    },
  ];

  return (
    <section className="bg-bg-soft py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center gap-2"
          >
            <div className="bg-bg-main p-4 rounded-full">{feature.icon}</div>
            <h3 className="text-text-main font-semibold text-lg">{feature.title}</h3>
            <p className="text-text-muted text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
