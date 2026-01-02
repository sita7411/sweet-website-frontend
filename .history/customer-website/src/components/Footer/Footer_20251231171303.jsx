import { Facebook, Instagram, MessageCircle, Twitter } from "lucide-react";

export default function Footer() {
  const socialIcons = [
    { icon: <Facebook size={18} />, link: "#" },
    { icon: <Instagram size={18} />, link: "#" },
    { icon: <MessageCircle size={18} />, link: "#" },
    { icon: <Twitter size={18} />, link: "#" },
  ];

  return (
    <footer className="bg-[var(--bg-main)] text-[var(--text-main)] border-t border-[var(--bg-soft)]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand & Store Info */}
        <div>
          <img src="/Logo_Marvel.png" alt="ChikkiWala Logo" className="h-10 mb-4" />
          <h4 className="font-semibold mb-2">Store Location</h4>
          <p className="text-sm text-[var(--text-muted)]">
            123 Chikki Street, Gujarat, India
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            <span className="font-semibold">Monday - Saturday:</span> 8:00 am - 4:00 pm
            <br />
            <span className="font-semibold">Sunday:</span> 9:00 am - 5:00 pm
          </p>
        </div>

        {/* Information */}
        <div>
          <h4 className="font-semibold mb-4">Information</h4>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            {["About Us", "Blog", "Check Out", "Services"].map((item, i) => (
              <li key={i} className="hover:text-[var(--primary)] cursor-pointer transition-colors duration-300">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h4 className="font-semibold mb-4">My Account</h4>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            {["My Account", "Contact", "Shopping Cart", "Store"].map((item, i) => (
              <li key={i} className="hover:text-[var(--primary)] cursor-pointer transition-colors duration-300">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            {["Nuts & Ingredients", "Dairy Products", "Beverage Foods", "Beverages", "Health & Wellness"].map((item, i) => (
              <li key={i} className="hover:text-[var(--primary)] cursor-pointer transition-colors duration-300">
                {item}
              </li>
            ))}
          </ul>

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
      <div className="py-4 text-center text-sm text-[var(--text-muted)] border-t border-[var(--bg-soft)]">
        © {new Date().getFullYear()} ChikkiWala. All rights reserved.
      </div>
    </footer>
  );
}
