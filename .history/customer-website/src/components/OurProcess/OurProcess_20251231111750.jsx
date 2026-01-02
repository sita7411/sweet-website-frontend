// OurProcessSection.jsx
import React from "react";

const steps = [
  { icon: "🟠", title: "Select Ingredients", desc: "We choose the best peanuts & jaggery." },
  { icon: "🟠", title: "Roast & Mix", desc: "Perfectly roasted & mixed for crunch." },
  { icon: "🟠", title: "Shape & Cut", desc: "Pressed into perfect chikki pieces." },
  { icon: "🟠", title: "Pack Fresh", desc: "Packed fresh to deliver to you." },
];

const products = [
  { img: "/images/pista_chikki.png", title: "Pista Chikki", desc: "Crunchy & Sweet" },
  { img: "/images/mix_chikki.png", title: "Mixed Chikki", desc: "Peanuts & Nuts Blend" },
];

const OurProcessSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16 flex flex-col lg:flex-row items-center gap-12">
      {/* Left: Steps */}
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl font-bold text-[#3a2416]">Our Process</h2>
        <p className="text-[#8a6a52]">
          From selecting the finest ingredients to packing fresh chikki for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-[#fff1db] rounded-lg shadow"
            >
              <span className="text-2xl">{step.icon}</span>
              <div>
                <h3 className="font-semibold text-[#3a2416]">{step.title}</h3>
                <p className="text-[#8a6a52] text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Product Images */}
      <div className="flex-1 flex flex-col gap-6">
        {products.map((prod, idx) => (
          <div
            key={idx}
            className="bg-[#fffaf3] p-4 rounded-lg flex flex-col items-center shadow"
          >
            <img src={prod.img} alt={prod.title} className="w-40 h-40 object-contain" />
            <h3 className="mt-2 font-bold text-[#3a2416]">{prod.title}</h3>
            <p className="text-[#8a6a52]">{prod.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProcessSection;
