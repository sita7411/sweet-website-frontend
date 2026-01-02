export default function Footer() {
  const latestProducts = [
    {
      img: "/products/chikki1.jpg",
      name: "Peanut Chikki",
      description: "Crunchy peanuts with jaggery, perfect healthy snack.",
      icon: "🥜",
    },
    {
      img: "/products/chikki2.jpg",
      name: "Sesame Chikki",
      description: "Sweet & nutty sesame chikki, handmade with love.",
      icon: "🌾",
    },
    {
      img: "/products/chikki3.jpg",
      name: "Dry Fruit Chikki",
      description: "Loaded with dry fruits for an energy boost anytime.",
      icon: "🍇",
    },
  ];

  return (
    <footer className="bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand with Logo */}
        <div>
          <img src="/logo.png" alt="ChikkiWala Logo" className="h-14 mb-4" />
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Traditional Indian chikki made with premium peanuts, jaggery & love. Healthy, crunchy & delicious snacks for every age.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li className="hover:text-[var(--primary)] cursor-pointer">Home</li>
            <li className="hover:text-[var(--primary)] cursor-pointer">Shop</li>
            <li className="hover:text-[var(--primary)] cursor-pointer">About Us</li>
            <li className="hover:text-[var(--primary)] cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Latest Products */}
        <div>
          <h3 className="font-semibold mb-4">Latest Products</h3>
          <div className="grid grid-cols-1 gap-4">
            {latestProducts.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-[var(--bg-soft)] rounded-lg p-3 hover:shadow-lg transition cursor-pointer"
              >
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--primary)]">{item.name}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-[var(--text-muted)]">
            📍 Gujarat, India  
            <br /> 📞 +91 98765 43210  
            <br /> ✉️ info@chikkiwala.com
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            {["F", "I", "T"].map((s, i) => (
              <div
                key={i}
                className="w-9 h-9 flex items-center justify-center rounded-full
                bg-[var(--bg-soft)] text-[var(--primary)]
                hover:bg-[var(--primary)] hover:text-white
                transition cursor-pointer"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--bg-soft)] py-4 text-center text-sm text-[var(--text-muted)]">
        © {new Date().getFullYear()} ChikkiWala. All rights reserved.
      </div>
    </footer>
  );
}
