export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ramesh Patel",
      city: "Ahmedabad",
      text:
        "The taste is absolutely authentic. Fresh chikki, perfect sweetness and great quality.",
      img: "/images/user1.png",
    },
    {
      name: "Neha Shah",
      city: "Surat",
      text:
        "Premium packaging and amazing flavor. Feels like homemade chikki from childhood.",
      img: "/images/user2.png",
    },
    {
      name: "Amit Joshi",
      city: "Rajkot",
      text:
        "Crunchy, fresh and delicious. My family loved every bite. Highly recommended.",
      img: "/images/user3.png",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[var(--text-main)]">
            Testimonials
          </h2>
          <p className="text-[var(--text-muted)] mt-3">
            What our customers are saying
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-10 shadow-md"
            >
              {/* Quote */}
              <p className="text-[var(--text-muted)] leading-relaxed mb-10">
                “{item.text}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-[var(--text-main)]">
                    {item.name}
                  </h4>
                  <p className="text-sm text-[var(--text-muted)]">
                    {item.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
