import React from "react";
import { ShoppingCart, Heart, User, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-[#FFFBF0] shadow-md sticky top-0 z-50 border-b border-[#F0E6D2]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/Logo_Marvel.png"
            alt="Marvel Crunch Chikki"
            className="h-14 w-auto"
          />
        </div>

        {/* Menu Items - Desktop */}
        <div className="hidden md:flex space-x-10 items-center">
          <a
            href="/"
            className="text-[#4A3C2A] hover:text-[#A52A2A] font-semibold text-lg transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/products"
            className="text-[#4A3C2A] hover:text-[#A52A2A] font-semibold text-lg transition-colors duration-300"
          >
            Products
          </a>
          <a
            href="/about"
            className="text-[#4A3C2A] hover:text-[#A52A2A] font-semibold text-lg transition-colors duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-[#4A3C2A] hover:text-[#A52A2A] font-semibold text-lg transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/wishlist"
            className="text-[#4A3C2A] hover:text-[#A52A2A] transition-colors duration-300"
          >
            <Heart size={26} strokeWidth={2} />
          </a>
          <a
            href="/cart"
            className="text-[#4A3C2A] hover:text-[#A52A2A] relative transition-colors duration-300"
          >
            <ShoppingCart size={26} strokeWidth={2} />
            <span className="absolute -top-3 -right-3 bg-[#D94536] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              3
            </span>
          </a>
          <a
            href="/account"
            className="text-[#4A3C2A] hover:text-[#A52A2A] transition-colors duration-300"
          >
            <User size={26} strokeWidth={2} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-[#4A3C2A] hover:text-[#A52A2A] transition-colors duration-300">
            <Menu size={30} strokeWidth={2} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;