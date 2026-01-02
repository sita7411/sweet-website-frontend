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
      <div className="absolute inset-0 bg-[url('/login.png')] bg-cover bg-center opacity-90" />

      {/* HEADER */}
      <header className="relative z-10 px-4 md:px-8 py-3 flex items-center gap-3">
        <img src="/Logo_Marvel.png" className="w-16 h-16" />
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
      <main className="relative z-10 flex items-start justify-center px-4 lg:px-20 h-screen overflow-hidden">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 w-full max-w-6xl items-start">

          {/* LEFT CARD: scrollable, scrollbar hidden */}
          <div className="bg-[#fffaf6] rounded-[26px] shadow-2xl w-full md:max-w-[380px] mx-auto
            max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">

            <div className="px-7 pt-6 pb-5 space-y-2">

              {/* Card Header */}
              <div className="text-center">
                <h2 className="text-xl font-serif font-semibold text-[#7a2e1d]">
                  {mode === "signup" ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-[11px] text-[#8a6a52] mt-1">
                  {mode === "signup"
                    ? "Join us for crunchy happiness"
                    : "Login to continue shopping"}
                </p>
              </div>

              {/* FORM */}
              {mode === "signup" && (
                <Input icon={<User size={15} />} placeholder="Full Name" />
              )}

              <Input icon={<Mail size={15} />} placeholder="Email Address" />

              <PasswordInput />

              {mode === "signup" && (
                <>
                  {/* Account Type */}
                  <SelectInput
                    icon={<User size={15} />}
                    placeholder="Account Type"
                    options={[
                      "Personal Customer",
                      "Wholesale Buyer",
                      "Retail Shop Owner",
                    ]}
                  />

                  {/* Mobile */}
                  <Input icon={<Phone size={15} />} placeholder="Mobile Number" />

                  {/* City Dropdown */}
                  <SelectInput
                    icon={<MapPin size={15} />}
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

              {/* Submit */}
              <button className="w-full mt-2 bg-[#b43424] hover:bg-[#9e2c1f] text-white py-2.5 rounded-full font-semibold shadow-md transition active:scale-95">
                {mode === "signup" ? "CREATE ACCOUNT" : "LOGIN"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-[#eadbcf]" />
                <span className="text-[10px] text-[#8a6a52]">OR</span>
                <div className="flex-1 h-px bg-[#eadbcf]" />
              </div>

              {/* Google Login */}
              <button
                className="w-full flex items-center justify-center gap-3
                border border-[#e6d4c7]
                bg-white
                py-2.5 rounded-full
                text-xs font-semibold
                text-[#7a2e1d]
                hover:bg-[#fff1e6]
                transition"
              >
                <img src="/goggle.png" className="w-5 h-5" />
                Continue with Google
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

          {/* RIGHT CONTENT: fixed, never scrolls */}
          <div className="hidden md:flex flex-col">
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

/* INPUT COMPONENT */
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

/* PASSWORD INPUT */
function PasswordInput() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <span className="absolute left-4 top-2.5 text-[#b08b6f]">
        <Lock size={15} />
      </span>

      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        className="
          w-full pl-10 pr-10 py-2.5
          rounded-full
          border border-[#f1e6dc]
          bg-[#fffdfb]
          text-xs
          focus:outline-none
          focus:ring-2
          focus:ring-[#7a2e1d]/20
        "
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-2.5 text-[#b08b6f] hover:text-[#7a2e1d]"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

/* SELECT DROPDOWN */
function SelectInput({ icon, placeholder, options }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center w-full pl-12 pr-4 py-3 rounded-full border border-[#f1e6dc]
          bg-[#fffdfb] text-sm text-[#7a2e1d] shadow-sm cursor-pointer
          focus-within:ring-2 focus-within:ring-[#7a2e1d]/30"
      >
        <span className="absolute left-4 text-[#b08b6f]">{icon}</span>
        <span className={`${selected ? "text-[#7a2e1d]" : "text-[#b08b6f]"}`}>
          {selected || placeholder}
        </span>
        <span className="ml-auto">
          <svg
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      {open && (
        <ul
          className="absolute z-20 w-full mt-1 max-h-48 overflow-y-auto rounded-xl border border-[#f1e6dc]
          bg-white shadow-lg text-sm text-[#7a2e1d] py-1 scrollbar-hide"
        >
          {options.map((opt, i) => (
            <li
              key={i}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-[#f9f3ef] transition"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
