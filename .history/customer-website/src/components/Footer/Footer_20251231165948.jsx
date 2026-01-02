export default function Footer() {
  return (
    <footer className="bg-[var(--bg-soft)] text-[var(--text-main)]">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--primary)]">
            ChikkiWala
          </h2>
          <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">
            Traditional Indian chikki made with premium peanuts, jaggery &
            love. Healthy, crunchy & delicious snacks for every age.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li className="hover:text-[var(--primary)] cursor-pointer">Home</li>
            <li className="hover:text-[var(--primary)] cursor-pointer">Shop</li>
            <li className="hover:text-[var(--primary)] cursor-pointer">About Us</li>
            <li className="hover:text-[var(--primary)] cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="font-semibold mb-4">Our Products</h3>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li>Peanut Chikki</li>
            <li>Sesame Chikki</li>
            <li>Dry Fruit Chikki</li>
            <li>Special Jaggery Bites</li>
          </ul>
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
                bg-[var(--bg-main)] text-[var(--primary)]
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
      <div className="border-t border-[var(--bg-main)] py-4 text-center text-sm text-[var(--text-muted)]">
        © {new Date().getFullYear()} ChikkiWala. All rights reserved.
      </div>
    </footer>
  );
}
