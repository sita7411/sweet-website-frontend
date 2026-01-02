'use client';

import React from 'react';
import { SparklesIcon, HeartIcon, CheckCircleIcon, TruckIcon } from '@heroicons/react/24/solid';

const steps = [
  {
    id: 1,
    title: "Select Ingredients",
    description: "We choose the finest peanuts, jaggery, and nuts for premium chikki.",
    icon: <SparklesIcon className="h-6 w-6 text-white" />,
  },
  {
    id: 2,
    title: "Handcrafted Preparation",
    description: "Our expert chefs prepare chikki with traditional techniques.",
    icon: <HeartIcon className="h-6 w-6 text-white" />,
  },
  {
    id: 3,
    title: "Quality Check",
    description: "Every batch goes through strict quality control for perfect taste.",
    icon: <CheckCircleIcon className="h-6 w-6 text-white" />,
  },
  {
    id: 4,
    title: "Fast Delivery",
    description: "Fresh chikki delivered to your doorstep with love.",
    icon: <TruckIcon className="h-6 w-6 text-white" />,
  },
];

const OurProcessStepper = () => {
  return (
    <section className=" py-20 px-4 md:px-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#c63b2f]">Our Process</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          From selecting the best ingredients to delivering fresh chikki to your doorstep, every step is handled with care.
        </p>
      </div>

      {/* Horizontal Stepper for Desktop */}
      <div className="hidden md:flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex flex-col items-center relative">
            {/* Connector line */}
            {index !== steps.length - 1 && (
              <div className="absolute top-3.5 left-1/2 w-full h-1 bg-gray-300 z-0 -translate-x-1/2"></div>
            )}
            {/* Circle icon */}
            <div className="relative z-10 bg-[#c63b2f] rounded-full p-4 mb-4 flex items-center justify-center shadow-lg">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-[#3a2416] mb-2 text-center">{step.title}</h3>
            <p className="text-gray-600 text-center text-sm max-w-xs">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Vertical Stepper for Mobile */}
      <div className="flex flex-col md:hidden space-y-12">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start space-x-6">
            <div className="flex flex-col items-center">
              <div className="bg-[#c63b2f] rounded-full p-4 flex items-center justify-center shadow-lg">
                {step.icon}
              </div>
              <div className="flex-1 w-1 bg-gray-300 mt-2"></div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#3a2416] mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProcessStepper;
