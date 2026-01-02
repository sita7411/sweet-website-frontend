import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Check } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");

  return (
    <div className="min-h-screen w-full bg-[#f9f3ef] relative font-sans">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/login.png')] bg-cover bg-center opacity-90" />

      {/* HEADER (compact) */}
      <header className="relative z-10 px-8 ml-48 py-4 flex items-center gap-3">
        <img src="/Logo_Marvel.png" className="w-20 h-20" />
        <div>
          <h1 className="text-lg font-bold text-[#7a2e1d]">
            Marvel Crunch Chikki
          </h1>
          <p className="text-[10px] text-[#9b6a4a] italic tracking-wider">
            — Pure & Traditional Taste —
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex items-center justify-center -mt-10 px-6 lg:px-20 min-h-[calc(100vh-80px)]">
        <div className="grid md:grid-cols-2 gap-16 w-full max-w-6xl items-center">

          {/* LEFT AUTH CARD */}
          <div className="bg-[#fffaf6] rounded-[26px] shadow-2xl max-w-[380px] w-full mx-auto">

            {/* Card Header */}
            <div className="px-7 pt-6 pb-4 text-center">
              <h2 className="text-xl font-serif font-semibold text-[#7a2e1d]">
                {mode === "signup" ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-xs text-[#9b6a4a] mt-0.5">
                {mode === "signup"
                  ? "Why join our Chikki family?"
                  : "Login to your account"}
              </p>
            </div>

            {/* FORM */}
            <div className="px-7 pb-6 space-y-2.5">

              {mode === "signup" && (
                <Input icon={<User size={15} />} placeholder="Full Name" />
              )}

              <Input icon={<Mail size={15} />} placeholder="Email Address" />
              <Input icon={<Lock size={15} />} placeholder="Password" type="password" />

              {mode === "signup" && (
                <>
                  <Input icon={<Phone size={15} />} placeholder="Mobile Number" />
                  <Input icon={<MapPin size={15} />} placeholder="City / State" />
                </>
              )}

              <button className="w-full mt-3 bg-[#b43424] hover:bg-[#9e2c1f] text-white py-2.5 rounded-full font-semibold shadow-md transition active:scale-95">
                {mode === "signup" ? "CREATE ACCOUNT" : "LOGIN"}
              </button>

              {/* Toggle */}
              <p className="text-[11px] text-center text-[#8a6a52] mt-3">
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
            <h3 className="text-3xl font-serif font-bold text-[#7a2e1d] mb-5">
              Why Marvel Crunch?
            </h3>

            <ul className="space-y-3">
              {[
                "Fresh handmade chikki",
                "Premium jaggery & nuts",
                "Quick re-orders & tracking",
                "Exclusive festive offers",
                "Trusted by families",
                "Delivery across India",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-[#7a2e1d] text-sm">
                  <span className="w-5 h-5 rounded border border-[#f2a23a] text-[#f2a23a] flex items-center justify-center">
                    <Check size={11} />
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

/* INPUT – compact */
function Input({ icon, placeholder, type = "text" }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-2.5 text-[#b08b6f]">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-4 py-2.5
          rounded-full
          border border-[#f1e6dc]
          bg-[#fffdfb]
          text-xs
          focus:outline-none
          focus:ring-2
          focus:ring-[#7a2e1d]/20
        "
      />
    </div>
  );
}
