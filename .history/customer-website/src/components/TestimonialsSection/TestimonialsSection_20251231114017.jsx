export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ramesh Patel",
      role: "Ahmedabad",
      message:
        "Best chikki I’ve ever tasted. Fresh, crunchy and perfectly sweet. Highly recommended!",
      img: "/images/user1.png",
    },
    {
      name: "Neha Shah",
      role: "Surat",
      message:
        "Packaging was premium and delivery was fast. The taste reminds me of homemade chikki.",
      img: "/images/user2.png",
    },
    {
      name: "Amit Joshi",
      role: "Rajkot",
      message:
        "Amazing quality and authentic flavor. My whole family loved it.",
      img: "/images/user3.png",
    },
  ];

  return (
    <section className="bg-[var(--bg-main)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[var(--text-main)] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Real reviews from people who love our handcrafted chikkis
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg transition"
            >
              {/* Message */}
              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                “{item.message}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-semibold text-[var(--text-main)]">
                    {item.name}
                  </h4>
                  <span className="text-sm text-[var(--text-muted)]">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
