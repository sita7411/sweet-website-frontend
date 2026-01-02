import { useState } from "react";
import { Heart, ShoppingCart, User, ChevronDown, LogOut } from "lucide-react";

export default function Navbar() {
  const isLoggedIn = true;
  const user = { name: "Ajay" };

  return (
    <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center transform hover:scale-105 transition-transform">
          <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="h-12" />
        </a>

        {/* MENU */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-gray-800 tracking-wide">
          <a href="/" className="group relative nav-link">
            Home
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-red-500 to-yellow-500 transition-all group-hover:w-full"></span>
          </a>

          {/* PRODUCTS DROPDOWN */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-red-600 transition">
              Products <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-52 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {["Chikki Collection","Organic Range","Sugar Free","Gifting Boxes","Combos","Bestsellers"].map(item => (
                <a 
                  key={item} 
                  href={`/products/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block px-6 py-3 hover:bg-gradient-to-r from-red-100 to-yellow-100 rounded-xl transition"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <a href="/collections" className="nav-link group">Collections <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-red-500 to-yellow-500 transition-all group-hover:w-full"></span></a>
          <a href="/offers" className="nav-link group">Offers <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-red-500 to-yellow-500 transition-all group-hover:w-full"></span></a>
          <a href="/about" className="nav-link group">Our Story <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-red-500 to-yellow-500 transition-all group-hover:w-full"></span></a>
          <a href="/contact" className="nav-link group">Contact <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-red-500 to-yellow-500 transition-all group-hover:w-full"></span></a>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {/* Heart Icon */}
          <div className="p-3 rounded-full bg-white/80 backdrop-blur-md hover:bg-red-100 transition cursor-pointer shadow-lg">
            <Heart size={18} className="text-red-600" />
          </div>

          {/* Cart Icon */}
          <div className="relative p-3 rounded-full bg-white/80 backdrop-blur-md hover:bg-yellow-100 transition cursor-pointer shadow-lg">
            <ShoppingCart size={18} className="text-yellow-600" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-yellow-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
          </div>

          {/* Login / Account */}
          {!isLoggedIn ? (
            <a href="/login" className="px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 text-white font-semibold hover:scale-105 transition transform">
              Login / Signup
            </a>
          ) : (
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-gradient-to-r from-red-50 to-yellow-50 transition shadow-lg">
                <User size={16} />
                {user.name}
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {["My Orders","Profile"].map(item => (
                  <a key={item} href="#" className="block px-6 py-3 hover:bg-gradient-to-r from-red-100 to-yellow-100 rounded-xl">{item}</a>
                ))}
                <div className="h-px bg-gray-200 my-1" />
                <button className="flex items-center gap-2 px-6 py-3 w-full rounded-xl hover:bg-red-50 transition text-red-600">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
