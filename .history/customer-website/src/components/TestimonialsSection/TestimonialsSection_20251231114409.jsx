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
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-4xl font-semibold text-gray-800 mb-16">
          Why Customer Love Us ?
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-xl shadow-lg p-8 transition
                ${item.active ? "scale-105" : "scale-100"}`}
            >
              {/* Green Quote */}
              <div className="text-green-600 text-4xl font-bold mb-4">“</div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {item.text}
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>

              {/* Bottom green line */}
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-green-500 rounded-b-xl" />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-12">
          <span className="w-2 h-2 bg-gray-300 rounded-full" />
          <span className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>

      </div>
    </section>
  );
}
