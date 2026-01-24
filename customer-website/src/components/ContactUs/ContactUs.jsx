import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, MapPin, Send } from "lucide-react";
import Features from "../Features/Features";

// Use your real backend URL
const API_BASE = "https://sweet-backend-nhwt.onrender.com/api/contact/";

export default function ContactUs() {
  const [contactInfo, setContactInfo] = useState({
    logo: "/logo-placeholder.png",
    phone: "+91 99461 37919",
    whatsapp: "+91 99461 37919",
    email: "Info@MarvelCrunch.com",
    address:
      "Plot No. 133, Shreeji Textile Velenja Sayan Road, Nr.Ramvatika Velenja – 394150",
    googleMapEmbedUrl:
      "https://www.google.com/maps?q=Plot+No.+133,+Shreeji+Textile+Velenja+Sayan+Road,+Nr.Ramvatika+Velenja+–+394150&output=embed",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(API_BASE, {
          method: "GET",
          credentials: "include", // Sends cookies (if backend uses cookie-based auth)
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }

        const data = await res.json();
        const info = data || {};

        setContactInfo({
          logo: info.logo || contactInfo.logo,
          phone: info.phone || contactInfo.phone,
          whatsapp: info.whatsapp || contactInfo.whatsapp,
          email: info.email || contactInfo.email,
          address: info.address || contactInfo.address,
          googleMapEmbedUrl:
            info.googleMapEmbedUrl || contactInfo.googleMapEmbedUrl,
        });
      } catch (err) {
        console.error("Error fetching contact info:", err);
        setError(
          "Could not load contact information. Showing default details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-[var(--text-main)] animate-pulse">
          Loading contact information...
        </p>
      </div>
    );
  }

  return (
    <div className="text-[var(--text-main)]">
      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/login.png"
          alt="Products Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--secondary)]/20"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_3px_8px_rgba(107,63,38,0.6)]"
          >
            Get In Touch
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex justify-center items-center gap-3 text-white text-sm sm:text-base"
          >
            <Link
              to="/"
              className="hover:text-[var(--secondary)] hover:underline hover:font-bold transition-all duration-200"
            >
              Home
            </Link>
            <span className="font-bold">\\</span>
            <span className="font-semibold">Contact Us</span>
          </motion.div>
        </div>
      </section>

      {/* ================= ERROR MESSAGE ================= */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-red-500 text-center font-medium">{error}</p>
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-4 py-13">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 rounded-3xl p-10">
          {/* ===== LEFT INFO ===== */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">Contact Information</h3>
            <p className="text-sm text-[var(--text-muted)] mb-10 leading-relaxed">
              Get in touch to place an order, discuss custom gift boxes, Call
              us, drop us an email, or visit us - we’d love to hear from you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              {[
                {
                  icon: <Phone className="w-4 h-4" />,
                  title: "Phone",
                  value: contactInfo.phone,
                },
                {
                  icon: <MessageCircle className="w-4 h-4" />,
                  title: "WhatsApp",
                  value: contactInfo.whatsapp,
                },
                {
                  icon: <Mail className="w-4 h-4" />,
                  title: "Email",
                  value: contactInfo.email,
                },
                {
                  icon: <MapPin className="w-4 h-4" />,
                  title: "Location",
                  value: contactInfo.address,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-soft)] border border-transparent hover:border-[var(--primary)]/30 transition h-full"
                >
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-white rounded-full text-[var(--primary)] shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <div className="mt-10 rounded-xl overflow-hidden border">
              <iframe
                title="Google Map"
                src={contactInfo.googleMapEmbedUrl}
                className="w-full h-60"
                loading="lazy"
              />
            </div>
          </div>

          {/* ===== RIGHT FORM ===== */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">Send Us a Message</h3>
            <p className="text-sm text-[var(--text-muted)] mb-10">
              Fill in the form below and our team will respond shortly.
            </p>

            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-xs font-medium text-[var(--text-muted)]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="mt-2 w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-medium text-[var(--text-muted)]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-xs font-medium text-[var(--text-muted)]">
                  Subject
                </label>
                <div className="relative mt-2">
                  <select
                    required
                    className="w-full appearance-none border rounded-lg px-4 py-3 pr-10 text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
                  >
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Customer Support</option>
                    <option>Business Proposal</option>
                    <option>Career Opportunity</option>
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]">
                    ▼
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-medium text-[var(--text-muted)]">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Write your message here..."
                  className="mt-2 w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--secondary)] text-white py-3 rounded-full text-sm font-semibold transition"
              >
                Submit Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Features />
    </div>
  );
}
