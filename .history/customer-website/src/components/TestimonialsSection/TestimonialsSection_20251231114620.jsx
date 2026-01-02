export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michelle Smith",
      role: "CEO - Weblabs",
      text: "This plugin is amazing with the current version, I am impressed and will be using it again.",
      img: "/images/user1.png",
      active: false,
    },
    {
      name: "David Anderson",
      role: "CEO - Softwares",
      text: "This plugin is amazing with the current version, I am impressed and will be using it again.",
      img: "/images/user2.png",
      active: true,
    },
    {
      name: "Michelle Smith",
      role: "CEO - Amazon",
      text: "This plugin is amazing with the current version, I am impressed and will be using it again.",
      img: "/images/user3.png",
      active: false,
    },
  ];

  return (
    <section className="bg-[var(--bg-main)] py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-[var(--text-main)] mb-20">
          Why Customers Love Us
        </h2>

        {/* Cards */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 relative">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`
                relative bg-[var(--bg-card)] rounded-3xl p-10 flex-1
                shadow-[0_10px_25px_rgba(0,0,0,0.05)] transition-transform duration-500
                ${item.active ? "scale-105 z-10 shadow-[0_20px_35px_rgba(0,0,0,0.1)]" : "scale-95 opacity-80"}
              `}
            >
              {/* Accent Quote */}
              <div className="text-[var(--primary)] text-6xl font-extrabold mb-6">“</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <span key={idx} className="text-[var(--accent)] text-base">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-[var(--text-muted)] text-base leading-relaxed mb-10">
                {item.text}
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-[var(--primary)] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-main)] text-sm sm:text-base">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--secondary)]">{item.role}</p>
                </div>
              </div>

              {/* Bottom accent line */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--primary)] rounded-full" />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((item, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                item.active ? "bg-[var(--primary)]" : "bg-[var(--secondary)]"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
