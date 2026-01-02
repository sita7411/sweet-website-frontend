import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, EyeOff, Check } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");

  return (
    <div className="min-h-screen w-full bg-[#f9f3ef] relative font-sans">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/login.png')] bg-cover bg-center opacity-90" />

      {/* HEADER */}
      <header className="relative z-10 px-8 py-6 flex items-center gap-3">
        <img src="/Logo_Marvel.png" className="w-10 h-10" />
        <div>
          <h1 className="text-xl font-bold text-[#7a2e1d]">
            Marvel Crunch Chikki
          </h1>
          <p className="text-[11px] text-[#9b6a4a] italic tracking-wider">
            — Pure & Traditional Taste —
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex items-center justify-center px-6 lg:px-20 min-h-[calc(100vh-100px)]">
        <div className="grid md:grid-cols-2 gap-20 w-full max-w-6xl items-center">

          {/* LEFT AUTH CARD */}
          <div className="bg-[#fffaf6] rounded-[28px] shadow-2xl max-w-[400px] w-full mx-auto">

            {/* Card Header */}
            <div className="px-8 pt-8 pb-6 text-center">
              <img src="/Logo_Marvel.png" className="w-14 mx-auto mb-3" />
              <h2 className="text-2xl font-serif font-semibold text-[#7a2e1d]">
                {mode === "signup" ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-sm text-[#9b6a4a] mt-1">
                {mode === "signup"
                  ? "Why join our Chikki family?"
                  : "Login to your account"}
              </p>
            </div>

            {/* FORM */}
            <div className="px-8 pb-8 space-y-3">

              {mode === "signup" && (
                <Input icon={<User size={16} />} placeholder="Full Name" />
              )}

              <Input icon={<Mail size={16} />} placeholder="Email Address" />

              <Input icon={<Lock size={16} />} placeholder="Password" type="password" />

              {mode === "signup" && (
                <>
                  <Input icon={<Phone size={16} />} placeholder="Mobile Number" />
                  <Input icon={<MapPin size={16} />} placeholder="City / State" />
                </>
              )}

              <button className="w-full mt-4 bg-[#b43424] hover:bg-[#9e2c1f] text-white py-3 rounded-full font-semibold shadow-lg transition active:scale-95">
                {mode === "signup" ? "CREATE ACCOUNT" : "LOGIN"}
              </button>

              {/* Toggle */}
              <p className="text-xs text-center text-[#8a6a52] mt-4">
                {mode === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <span
                      onClick={() => setMode("login")}
                      className="text-[#7a2e1d] font-semibold cursor-pointer"
                    >
                      Login
                    </span>
                  </>
                ) : (
                  <>
                    New here?{" "}
                    <span
                      onClick={() => setMode("signup")}
                      className="text-[#7a2e1d] font-semibold cursor-pointer"
                    >
                      Create Account
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="hidden md:block">
            <h3 className="text-4xl font-serif font-bold text-[#7a2e1d] mb-6">
              Why Marvel Crunch?
            </h3>

            <ul className="space-y-4">
              {[
                "Fresh handmade chikki",
                "Premium jaggery & nuts",
                "Quick re-orders & tracking",
                "Exclusive festive offers",
                "Trusted by families",
                "Delivery across India",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-[#7a2e1d] text-base">
                  <span className="w-5 h-5 rounded border border-[#f2a23a] text-[#f2a23a] flex items-center justify-center">
                    <Check size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}

/* INPUT */
function Input({ icon, placeholder, type = "text" }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-3 text-[#b08b6f]">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full pl-11 pr-4 py-3
          rounded-full
          border border-[#f1e6dc]
          bg-[#fffdfb]
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-[#7a2e1d]/20
        "
      />
    </div>
  );
}
