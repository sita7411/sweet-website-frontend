import React from "react";
import { ShoppingCart, Heart, User, Menu } from "lucide-react";
import Navbar from ".."
const Navbar = () => {
  return (
    <nav className="bg-[#FFFBF0]/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-[#F0E6D2] transition-all duration-500">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with bounce animation on load */}
        <div className="flex items-center animate-bounce-once">
          <img
            src="/Logo_Marvel.png"
            alt="Marvel Crunch Chikki"
            className="h-16 w-auto transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Menu Items - Desktop */}
        <div className="hidden md:flex space-x-10 items-center">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative text-[#4A3C2A] font-semibold text-lg overflow-hidden group"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {item}
              </span>
              {/* Background fill + underline animation */}
              <span className="absolute inset-0 bg-[#A52A2A]/80 transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A52A2A] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/wishlist" className="text-[#4A3C2A] hover:text-[#A52A2A] transition-all duration-300 hover:scale-110">
            <Heart size={26} strokeWidth={2} />
          </a>
          <a href="/cart" className="text-[#4A3C2A] hover:text-[#A52A2A] relative transition-all duration-300 hover:scale-110">
            <ShoppingCart size={26} strokeWidth={2} />
            <span className="absolute -top-3 -right-3 bg-[#D94536] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse-once">
              3
            </span>
          </a>
          <a href="/account" className="text-[#4A3C2A] hover:text-[#A52A2A] transition-all duration-300 hover:scale-110">
            <User size={26} strokeWidth={2} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-[#4A3C2A] hover:text-[#A52A2A] transition-all duration-300 hover:rotate-90">
            <Menu size={30} strokeWidth={2} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;