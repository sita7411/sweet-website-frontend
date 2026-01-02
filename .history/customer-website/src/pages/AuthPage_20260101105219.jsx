import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");

  return (
    <div className="h-screen w-full bg-[#f9f3ef] relative font-sans overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/login.png')] bg-cover bg-center opacity-80" />

      {/* HEADER */}
      <header className="relative z-10 flex items-center gap-3 px-8 py-4">
        <img src="/Logo_Marvel.png" className="w-16 h-16" />
        <div>
          <h1 className="text-lg font-bold text-[#7a2e1d]">Marvel Crunch Chikki</h1>
          <p className="text-xs text-[#9b6a4a] italic tracking-wider">
            — Pure & Traditional Taste —
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex justify-center items-center px-6 lg:px-20 h-[calc(100vh-90px)]">
        <div className="grid md:grid-cols-2 gap-16 w-full max-w-6xl items-center">

          {/* LEFT CARD */}
          <div className="bg-[#fffaf6] rounded-3xl shadow-xl max-w-md w-full mx-auto p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-semibold text-[#7a2e1d]">
                {mode === "signup" ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-sm text-[#8a6a52] mt-1">
                {mode === "signup"
                  ? "Join us for crunchy happiness"
                  : "Login to continue shopping"}
              </p>
            </div>

            <div className="space-y-4">
              {mode === "signup" && <Input icon={<User size={18} />} placeholder="Full Name" />}
              <Input icon={<Mail size={18} />} placeholder="Email Address" />
              <PasswordInput />

              {mode === "signup" && (
                <>
                  <SelectInput
                    icon={<User size={18} />}
                    placeholder="Account Type"
                    options={[
                      "Personal Customer",
                      "Wholesale Buyer",
                      "Retail Shop Owner",
                    ]}
                  />
                  <Input icon={<Phone size={18} />} placeholder="Mobile Number" />
                  <SelectInput
                    icon={<MapPin size={18} />}
                    placeholder="Select City"
                    options={[
                      "Ahmedabad, Gujarat",
                      "Surat, Gujarat",
                      "Rajkot, Gujarat",
                      "Vadodara, Gujarat",
                      "Mumbai, Maharashtra",
                      "Pune, Maharashtra",
                      "Delhi",
                      "Bengaluru",
                      "Hyderabad",
                    ]}
                  />
                </>
              )}

              <button className="w-full py-3 rounded-full font-semibold text-white
                bg-gradient-to-r from-[#b43424] to-[#9e2c1f]
                shadow-lg hover:from-[#9e2c1f] hover:to-[#b43424]
                transition-all active:scale-95">
                {mode === "signup" ? "CREATE ACCOUNT" : "LOGIN"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-px bg-[#eadbcf]" />
                <span className="text-xs text-[#8a6a52]">OR</span>
                <div className="flex-1 h-px bg-[#eadbcf]" />
              </div>

              {/* Google Login */}
              <button
                className="w-full flex items-center justify-center gap-3
                  border border-[#e6d4c7] bg-white py-2.5 rounded-full
                  text-xs font-semibold text-[#7a2e1d]
                  hover:bg-[#fff1e6] transition"
              >
                <img src="/google.svg" className="w-5 h-5" />
                Continue with Google
              </button>

              {/* Toggle */}
              <p className="text-xs text-center text-[#8a6a52] mt-3">
                {mode === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <span
                      onClick={() => setMode("login")}
                      className="text-[#7a2e1d] font-semibold cursor-pointer hover:underline"
                    >
                      Login
                    </span>
                  </>
                ) : (
                  <>
                    New here?{" "}
                    <span
                      onClick={() => setMode("signup")}
                      className="text-[#7a2e1d] font-semibold cursor-pointer hover:underline"
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
            <h3 className="text-3xl font-serif font-bold text-[#7a2e1d] mb-6">
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
                <li
                  key={i}
                  className="flex gap-3 text-[#7a2e1d] text-sm items-center"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f2a23a]/20 text-[#f2a23a] flex items-center justify-center">
                    <Check size={14} />
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
          w-full pl-12 pr-4 py-3
          rounded-full
          border border-[#f1e6dc]
          bg-[#fffdfb]
          text-sm
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-[#7a2e1d]/30
          placeholder:text-[#b08b6f]
        "
      />
    </div>
  );
}

/* PASSWORD INPUT */
function PasswordInput() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <span className="absolute left-4 top-3 text-[#b08b6f]">
        <Lock size={18} />
      </span>
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        className="
          w-full pl-12 pr-12 py-3
          rounded-full
          border border-[#f1e6dc]
          bg-[#fffdfb]
          text-sm
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-[#7a2e1d]/30
          placeholder:text-[#b08b6f]
        "
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-3 text-[#b08b6f] hover:text-[#7a2e1d]"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

/* SELECT DROPDOWN */
function SelectInput({ icon, placeholder, options }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-3 text-[#b08b6f]">{icon}</span>
      <select
        className="
          w-full pl-12 pr-8 py-3
          rounded-full
          border border-[#f1e6dc]
          bg-[#fffdfb]
          text-sm text-[#7a2e1d]
          focus:outline-none
          focus:ring-2 focus:ring-[#7a2e1d]/30
          appearance-none
          shadow-sm
          cursor-pointer
        "
      >
        <option value="">{placeholder}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {/* Custom arrow */}
      <div className="pointer-events-none absolute right-4 top-3.5 text-[#b08b6f]">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
