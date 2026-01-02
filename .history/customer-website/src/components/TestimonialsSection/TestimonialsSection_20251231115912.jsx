export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michelle Smith",
      role: "CEO - Weblabs",
      text: "This plugin is amazing with the current version. I am impressed and will be using it again.",
      img: "/images/user1.png",
      active: false,
    },
    {
      name: "David Anderson",
      role: "CEO - Softwares",
      text: "The support and quality are top-notch. Highly recommend to any business!",
      img: "/images/user2.png",
      active: true,
    },
    {
      name: "Alex Johnson",
      role: "CTO - Amazon",
      text: "A game-changing plugin that boosted our productivity and customer engagement.",
      img: "/images/user3.png",
      active: false,
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-[var(--text-main)] mb-20">
          Hear From Our Satisfied Clients
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 relative">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`
                relative bg-white rounded-3xl p-12 flex-1
                shadow-lg transition-transform duration-500 transform
                hover:shadow-2xl hover:-translate-y-2
                ${item.active ? "scale-105 border-2 border-[var(--primary)]" : "scale-95 opacity-90"}
              `}
            >
              {/* Quote symbol inside card */}
              <div className="text-[5rem] text-[var(--primary)] opacity-10 absolute top-6 left-6 select-none">
                ❝
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <span
                    key={idx}
                    className="text-[var(--accent)] text-lg transition-transform duration-300 hover:scale-125"
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed mb-8 relative z-10">
                {item.text}
              </p>

              {/* User info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-16 h-16 rounded-full border-2 border-[var(--primary)] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-main)] text-base">
                    {item.name}
                  </h4>
                  <p className="text-[var(--secondary)] text-sm">{item.role}</p>
                </div>
              </div>

              {/* Bottom accent line */}
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-[var(--primary)] rounded-full" />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-16">
          {testimonials.map((item, i) => (
            <span
              key={i}
              className={`rounded-full transition-all duration-300 ${
                item.active
                  ? "w-4 h-4 bg-[var(--primary)] shadow-lg"
                  : "w-3 h-3 bg-[var(--secondary)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
