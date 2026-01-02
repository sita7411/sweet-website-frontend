import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, EyeOff, Check } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState("signup"); // signup | login

  return (
    <div className="h-screen w-full overflow-hidden bg-[#f9f3ef] relative font-sans">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/login.png')] bg-cover opacity-90 pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-10 px-8 py-6 flex items-center gap-3">
        <img src="/Logo_Marvel.png" alt="Marvel Crunch Chikki" className="w-10 h-10" />
        <div>
          <h1 className="text-xl font-bold text-[#7a2e1d] leading-none">
            Marvel Crunch Chikki
          </h1>
          <p className="text-[10px] text-[#9b6a4a] tracking-widest italic uppercase">
            — Pure & Traditional Taste —
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 h-[calc(100vh-120px)] flex items-center px-8 lg:px-24">
        <div className="w-full grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT CARD */}
          <div className="bg-white rounded-[36px] shadow-xl w-full max-w-[420px] mx-auto">

            {/* CARD HEADER */}
            <div className="p-8 text-center border-b border-gray-100">
              <img src="/Logo_Marvel.png" className="w-14 mx-auto mb-3" />
              <h2 className="text-2xl font-serif font-bold text-[#7a2e1d]">
                {mode === "signup" ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-sm text-[#9b6a4a]">
                {mode === "signup"
                  ? "Join the Marvel Crunch family"
                  : "Login to continue"}
              </p>
            </div>

            {/* FORM (SCROLLABLE, HIDDEN BAR) */}
            <div className="px-8 pb-8 pt-6 max-h-[420px] overflow-y-auto no-scrollbar space-y-3">

              {mode === "signup" && (
                <>
                  <Input icon={<User size={16} />} placeholder="Full Name" />
                  <Input icon={<Phone size={16} />} placeholder="Mobile Number" />
                </>
              )}

              <Input icon={<Mail size={16} />} placeholder="Email Address" />

              <div className="relative">
                <Input icon={<Lock size={16} />} placeholder="Password" type="password" />
                <EyeOff className="absolute right-4 top-3 text-gray-300" size={16} />
              </div>

              {mode === "signup" && (
                <Input icon={<MapPin size={16} />} placeholder="City / State" />
              )}

              <button className="w-full mt-3 bg-[#b43424] hover:bg-[#9e2c1f] text-white py-3 rounded-full font-semibold shadow-md transition active:scale-95">
                {mode === "signup" ? "CREATE ACCOUNT" : "LOGIN"}
              </button>

              {/* TOGGLE */}
              <p className="text-xs text-center text-gray-500 mt-4">
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

          {/* RIGHT SIDE CONTENT */}
          <div className="hidden md:block">
            <h3 className="text-4xl font-serif font-bold text-[#7a2e1d] mb-4">
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
                <li key={i} className="flex gap-3 text-[#7a2e1d]">
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
      <span className="absolute left-4 top-3 text-gray-400">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-100 bg-[#fdfaf8] text-sm focus:outline-none focus:ring-1 focus:ring-[#7a2e1d]/20"
      />
    </div>
  );
}
