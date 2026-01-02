import { Facebook, Instagram, MessageCircle, Twitter } from "lucide-react";

export default function Footer() {
    const socialIcons = [
        { icon: <Facebook size={18} />, link: "#" },
        { icon: <Instagram size={18} />, link: "#" },
        { icon: <MessageCircle size={18} />, link: "#" },
        { icon: <Twitter size={18} />, link: "#" },
    ];

    const infoLinks = ["About Us", "Blog", "Check Out", "Services"];
    const accountLinks = ["My Account", "Contact", "Shopping Cart", "Store"];
    const categoryLinks = [
        "Nuts & Ingredients",
        "Dairy Products",
        "Beverage Foods",
        "Beverages",
        "Health & Wellness",
    ];

    return (
        <footer className="bg-[var(--bg-main)] text-[var(--text-main)]">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {/* Brand & Info */}
                <div className="flex flex-col">
                    <img
                        src="/Logo_Marvel.png"
                        alt="ChikkiWala Logo"
                        className="h-24 w-24 mb-4 object-contain"
                    />
                    <h4 className="font-bold text-xl mb-2">M Store</h4>
                    <p className="text-sm text-[var(--text-muted)]">
                        123 Chikki Street, Gujarat, India
                    </p>
                    <p className="text-sm text-[var(--text-muted)] mt-2">
                        <span className="font-semibold">Mon - Sat:</span> 8:00 am - 4:00 pm
                        <br />
                        <span className="font-semibold">Sun:</span> 9:00 am - 5:00 pm
                    </p>
                    <p className="text-sm text-[var(--text-muted)] mt-2">
                        +91 99461 37919                    </p>
                </div>

                {/* Information Links */}
                <div>
                    <h4 className="font-bold text-xl mb-4">Information</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                        {infoLinks.map((item, i) => (
                            <li
                                key={i}
                                className="hover:text-[var(--primary)] cursor-pointer transition-colors duration-300"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Account Links */}
                <div>
                    <h4 className="font-bold text-xl mb-4">My Account</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                        {accountLinks.map((item, i) => (
                            <li
                                key={i}
                                className="hover:text-[var(--primary)] cursor-pointer transition-colors duration-300"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Categories & Social */}
                <div>
                    <h4 className="font-bold text-xl mb-4">Categories</h4>
                    <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                        {categoryLinks.map((item, i) => (
                            <li
                                key={i}
                                className="hover:text-[var(--primary)] cursor-pointer transition-colors duration-300"
                            >
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
                  shadow-md hover:shadow-lg
                  transition-all duration-300 ease-in-out"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--bg-soft)]"></div>

            {/* Bottom Bar */}
            <div className="py-4 text-center text-sm text-[var(--text-muted)] flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">
                <p>© {new Date().getFullYear()} Marvel Chikki. All rights reserved.</p>
                <p className="mt-2 md:mt-0">
                    Designed with by Marvel Chikki Team
                </p>
            </div>
        </footer>
    );
}
