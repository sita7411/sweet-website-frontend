import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    ShoppingCart,
    User,
    ChevronDown,
    LogOut,
    Search,
    Menu,
    X,
} from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
    const isLoggedIn = true;
    const user = { name: "Ajay" };

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);


    /* ---------- SCROLL SHADOW ---------- */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ---------- CLICK OUTSIDE ---------- */
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all ${scrolled
                    ? "backdrop-blur bg-white/90 shadow-md"
                    : "bg-[var(--bg-main)]"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 h-[90px] flex items-center justify-between">

                {/* LOGO */}
                <a href="/" className="flex items-center">
                    <img src="/Logo_Marvel.png" alt="Marvel Crunch" className="w-24" />
                </a>

                {/* SEARCH */}
                <div className="hidden lg:flex flex-1 max-w-xl mx-10">
                    <div className="relative w-full">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                            size={18}
                        />
                        <input
                            placeholder="Search chikki, peanuts, gifts..."
                            className="w-full pl-11 pr-5 py-3 rounded-full bg-[var(--bg-soft)]
              focus:ring-2 focus:ring-[var(--primary)] outline-none"
                        />
                    </div>
                </div>

                {/* DESKTOP LINKS */}
                <nav className="hidden lg:flex gap-8 text-sm font-semibold uppercase">

                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/products">PRODUCTS</NavLink>



                    <NavLink href="/offers">Offers</NavLink>
                    <NavLink href="/about">Our Story</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                </nav>

                {/* ACTIONS */}
                <div className="flex items-center ml-8 gap-3">

                    <IconBtn className="lg:hidden">
                        <Search size={20} />
                    </IconBtn>

                    {/* WISHLIST */}
                    <IconBtn className="relative">
                        <Heart size={20} />
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-1 w-5 h-5 rounded-full
              bg-[var(--primary)] text-white text-xs
              flex items-center justify-center"
                        >
                            2
                        </motion.span>
                    </IconBtn>

                    {/* CART */}
                    <IconBtn className="relative">
                        <ShoppingCart size={20} />
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-1 w-5 h-5 rounded-full
              bg-[var(--primary)] text-white text-xs
              flex items-center justify-center"
                        >
                            3
                        </motion.span>
                    </IconBtn>

                    {/* USER AUTH */}
                    {isLoggedIn ? (
                        <div className="relative hidden sm:block group">
                            <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[var(--bg-soft)] transition">
                                <User size={20} />
                                <span className="text-sm font-medium">{user.name}</span>
                                <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                            </button>

                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl
      shadow-lg border border-gray-200 opacity-0 invisible group-hover:visible group-hover:opacity-100
      transition-all duration-200 z-50">

                                <AccountItem label="My Orders" />
                                <AccountItem label="Profile" />
                                <div className="border-t border-gray-200 my-1" />
                                <button className="flex items-center gap-2 px-5 py-2
       hover:bg-[var(--bg-main)] hover:text-white rounded-lg w-full
        transition">
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden sm:flex">
                            <a
                                href="/login"
                                className="px-5 py-2 rounded-full border
      border-[var(--primary)] text-[var(--primary)]
      text-sm font-semibold hover:bg-[var(--primary)]
      hover:text-white transition"
                            >
                                Login / Sign Up
                            </a>
                        </div>
                    )}

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden bg-white shadow-md"
                    >
                        <div className="px-6 py-6 space-y-4">
                            <NavLink href="/" mobile>Home</NavLink>
                            <p className="text-sm font-semibold">Products</p>
                            {productCategories.map((item) => (
                                <DropdownItem key={item} title={item} mobile />
                            ))}
                            <NavLink href="/collections" mobile>Collections</NavLink>
                            <NavLink href="/offers" mobile>Offers</NavLink>
                            <NavLink href="/about" mobile>Our Story</NavLink>
                            <NavLink href="/contact" mobile>Contact</NavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

/* ---------- SMALL COMPONENTS ---------- */
const NavLink = ({ href, children, mobile }) => (
    <a
        href={href}
        className={`block ${mobile
                ? "py-2 text-base"
                : "relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[var(--primary)] hover:after:w-full after:transition-all"
            }`}
    >
        {children}
    </a>
);


const IconBtn = ({ children, className = "" }) => (
    <div
        className={`relative p-2.5 rounded-full bg-[var(--bg-soft)]
    hover:bg-[var(--bg-soft)]
    hover:text-[var(--primary)]
    transition ${className}`}
    >
        {children}
    </div>
);

const DropdownItem = ({ title, mobile }) => (
    <a
        href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
        className={`flex items-center justify-between px-4 py-3 rounded-xl
    text-sm font-medium transition-all
    hover:bg-[var(--bg-soft)] hover:pl-6
    ${mobile ? "text-base px-0 py-2" : ""}`}
    >
        {title}
        {!mobile && (
            <ChevronDown size={14} className="rotate-[-90deg] opacity-40" />
        )}
    </a>
);

const AccountItem = ({ label }) => (
    <button className="block w-full text-left px-5 py-2 hover:bg-[var(--bg-soft)]">
        {label}
    </button>
);
