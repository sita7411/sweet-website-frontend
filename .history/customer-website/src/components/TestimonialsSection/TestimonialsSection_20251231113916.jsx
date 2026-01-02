'use client'; // optional, Vite me zaroori nahi

const steps = [
  {
    step: '01',
    title: 'Select Your Chikki',
    desc: 'Choose from our wide range of handmade premium chikkis.',
    img: '/images/step1.png',
  },
  {
    step: '02',
    title: 'Freshly Packed',
    desc: 'Prepared fresh and packed with care to retain taste.',
    img: '/images/step2.png',
  },
  {
    step: '03',
    title: 'Fast Delivery',
    desc: 'Delivered quickly to your doorstep with safety.',
    img: '/images/step3.png',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[var(--bg-main)] py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {steps.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center"
          >
            {/* Step */}
            <div className="flex justify-center md:justify-start">
              <div className="w-20 h-20 rounded-full bg-[var(--bg-soft)] flex items-center justify-center text-2xl font-bold text-[var(--primary)] shadow-sm">
                {item.step}
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-semibold text-[var(--text-main)] mb-4">
                {item.title}
              </h3>
              <p className="text-[var(--text-muted)] max-w-md">
                {item.desc}
              </p>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[220px] h-[220px] object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
