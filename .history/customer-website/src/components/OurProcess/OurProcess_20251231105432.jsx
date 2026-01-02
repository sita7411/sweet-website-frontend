'use client';

import React from 'react';
import { CheckCircleIcon, SparklesIcon, TruckIcon, HeartIcon } from '@heroicons/react/24/solid';

const steps = [
  {
    id: 1,
    title: "Select Ingredients",
    description: "We choose the finest peanuts, jaggery, and nuts for premium chikki.",
    icon: <SparklesIcon className="h-8 w-8 text-yellow-500" />,
  },
  {
    id: 2,
    title: "Handcrafted Preparation",
    description: "Our expert chefs prepare chikki with traditional techniques.",
    icon: <HeartIcon className="h-8 w-8 text-red-500" />,
  },
  {
    id: 3,
    title: "Quality Check",
    description: "Every batch goes through strict quality control for perfect taste.",
    icon: <CheckCircleIcon className="h-8 w-8 text-green-500" />,
  },
  {
    id: 4,
    title: "Fast Delivery",
    description: "Fresh chikki delivered to your doorstep with love.",
    icon: <TruckIcon className="h-8 w-8 text-blue-500" />,
  },
];

const OurProcess = () => {
  return (
    <section className="bg-[#fffaf3] py-16 px-4 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#c63b2f]">Our Process</h2>
        <p className="mt-2 text-gray-700 max-w-xl mx-auto">
          From selecting the best ingredients to delivering them fresh to your doorstep, we ensure quality at every step.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div key={step.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-[#3a2416] mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProcess;
