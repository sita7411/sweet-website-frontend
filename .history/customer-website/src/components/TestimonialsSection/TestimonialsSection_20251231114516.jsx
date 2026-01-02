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
      active: true, // center highlighted
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
    <section className="bg-gray-50 py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-gray-900 mb-20">
          Why Our Customers Love Us
        </h2>

        {/* Cards */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`
                relative bg-white rounded-2xl shadow-xl p-10 flex-1 transition-transform duration-500
                ${item.active ? "scale-105 z-10 shadow-2xl" : "scale-95 opacity-80"}
              `}
            >
              {/* Quote Icon */}
              <div className="text-green-500 text-5xl font-extrabold mb-5">“</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <span key={idx} className="text-yellow-400 text-base">★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                {item.text}
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm">{item.role}</p>
                </div>
              </div>

              {/* Bottom accent line */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-green-500 rounded-full" />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((item, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                item.active ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
