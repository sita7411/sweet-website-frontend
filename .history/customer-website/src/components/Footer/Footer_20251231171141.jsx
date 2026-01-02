import { Facebook, Instagram, MessageCircle, Twitter } from "lucide-react";

export default function Footer() {
  const latestProducts = [
    {
      img: "/products/pista.png",
      name: "Peanut Chikki",
      description: "Crunchy peanuts with jaggery, perfect healthy snack.",
    },
    {
      img: "/products/chikki2.jpg",
      name: "Sesame Chikki",
      description: "Sweet & nutty sesame chikki, handmade with love.",
    },
    {
      img: "/products/chikki3.jpg",
      name: "Dry Fruit Chikki",
      description: "Loaded with dry fruits for an energy boost anytime.",
    },
  ];

  const socialIcons = [
    { icon: <Facebook size={18} />, link: "#" },
    { icon: <Instagram size={18} />, link: "#" },
    { icon: <MessageCircle size={18} />, link: "#" },
    { icon: <Twitter size={18} />, link: "#" },
  ];

  return (
    <footer className="bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* Brand & Logo */}
        <div>
          <img
            src="/Logo_Marvel.png"
            alt="ChikkiWala Logo"
            className="h-12 mb-4"
          />
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Traditional Indian chikki made with premium peanuts, jaggery & love. Healthy, crunchy & delicious snacks for every age.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            {["Home", "Shop", "About Us", "Contact"].map((link, i) => (
              <li
                key={i}
                className="hover:text-[var(--primary)] cursor-pointer transition-colors duration-300"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Products */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Latest Products</h3>
          <div className="space-y-4">
            {latestProducts.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3  rounded-lg p-3 hover:shadow-lg hover:scale-105 transition transform cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-14 w-14 object-cover rounded"
                />
                <div>
                  <h4 className="text-sm font-semibold text-[var(--primary)]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <p className="text-sm text-[var(--text-muted)] space-y-1">
            <span>📍 Gujarat, India</span>
            <br />
            <span>📞 +91 98765 43210</span>
            <br />
            <span>✉️ info@chikkiwala.com</span>
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            {socialIcons.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full
                  bg-[var(--bg-soft)] text-[var(--primary)]
                  hover:bg-[var(--primary)] hover:text-white
                  shadow-sm hover:shadow-md
                  transition duration-300 ease-in-out"
              >
                {item.icon}
              </a>
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
