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
    <section className="relative py-32 px-6 bg-[var(--bg-main)] overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] opacity-10 rounded-full filter blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-[var(--text-main)] mb-24">
          Hear From Our Satisfied Clients
        </h2>

        {/* Cards */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 relative">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`
                relative bg-white/70 backdrop-blur-md rounded-3xl p-12 flex-1
                shadow-2xl transition-transform duration-500 transform
                ${item.active ? "scale-105 z-20" : "scale-95 opacity-80 rotate-[2deg]"}
                hover:scale-105 hover:rotate-0
              `}
            >
              {/* Decorative quote */}
              <div className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mb-6">
                ❝
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <span key={idx} className="text-[var(--accent)] text-lg">★</span>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-[var(--text-muted)] text-base leading-relaxed mb-12">
                {item.text}
              </p>

              {/* User info */}
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
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full" />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-16">
          {testimonials.map((item, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                item.active
                  ? "w-4 h-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                  : "bg-[var(--secondary)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
