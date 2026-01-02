import React from "react";
import { ShoppingCart, Heart, User, Menu } from "lucide-react";
import styles from "./Navbar.module.css"; 

const Navbar = () => {
  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div>
          <img
            src="/Logo_Marvel.png"
            alt="Marvel Crunch Chikki"
            className={`h-16 w-auto ${styles.float}`}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className={`${styles.menuItem} text-gray-700 hover:text-primary transition font-medium`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Icons - Primary Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/wishlist" className="secondary-icon">
            <Heart size={26} />
          </a>
          <a href="/cart" className="relative primary-icon">
            <ShoppingCart size={26} />
            <span className={`${styles.cartBadge} ${styles.pulseSlow}`}>
              3
            </span>
          </a>
          <a href="/account" className="primary-icon">
            <User size={26} />
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="p-2 text-gray-700 hover:text-primary transition">
            <Menu size={32} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
