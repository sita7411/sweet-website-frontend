import React from "react";

const TrustSection = () => {
  const trusts = [
    { icon: "/certificate-icon1.svg" },
    { icon: "/certificate-icon2.svg" },
    { icon: "/certificate-icon3.svg"},
    { icon: "/certificate-icon4.svg" },
  ];

  return (
    <section className="py-11" >
      <div className="max-w-7xl mx-auto text-center px-6">
        <p
          className="text-sm mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          You Can Trust Us
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: "var(--text-main)" }}
        >
          Clean, Authentic And Sustainable
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 -mb-10 items-center justify-items-center">
          {trusts.map((trust, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2"
            >
              <img
                src={trust.icon}
                alt={trust.label}
                className="w-30 h-30"
              />
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
