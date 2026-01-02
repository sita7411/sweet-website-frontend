// FeaturesSection.jsx
import React from 'react';

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 4h18l-3 14H6L3 4zm3 4l1.5 7h9l1.5-7H6zm1 10h10l1-4H7l1 4z"/>
        </svg>
      ),
      title: "Free Shipping",
      desc: "Free shipping for order above $180",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: "Flexible Payment",
      desc: "Multiple secure payment options",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1C8.13 1 5 4.13 5 8v8c0 3.87 3.13 7 7 7s7-3.13 7-7V8c0-3.87-3.13-7-7-7zm4.5 12.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5V10h5v3.5zM12 3c2.76 0 5 2.24 5 5h-2c0-1.66-1.34-3-3-3s-3 1.34-3 3H7c0-2.76 2.24-5 5-5z"/>
        </svg>
      ),
      title: "24x7 Support",
      desc: "We support online all days.",
    },
  ];

  return (
    <section className="bg-white py-8 border-t-2 border-b-2 border-red-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center gap-8 px-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 text-left"
          >
            <div>{feature.icon}</div>
            <div>
              <h3 className="text-gray-900 font-medium text-base">{feature.title}</h3>
              <p className="text-gray-700 text-sm">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}