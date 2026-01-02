import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");

  return (
    <div className="min-h-screen w-full bg-[#f9f3ef] relative font-sans overflow-hidden flex flex-col">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/login.png')] bg-cover bg-center opacity-90" />

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-center gap-3 px-4 py-3">
        <img src="/Logo_Marvel.png" className="w-12 h-12 sm:w-16 sm:h-16" />
        <div className="text-center">
          <h1 className="text-base sm:text-lg font-bold text-[#7a2e1d]">
            Marvel Crunch Chikki
          </h1>
          <p className="text-[10px] sm:text-xs text-[#9b6a4a] italic tracking-wider">
            — Pure & Traditional Taste —
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-2">
<div className="bg-[#fffaf6] rounded-[26px] shadow-2xl w-full 
max-w-[5200px] md:max-w-[600px] mx-auto p-6 sm:p-8 overflow-y-auto">

          {/* Title */}
          <div className="text-center mb-5">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#7a2e1d]">
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-xs text-[#8a6a52] mt-1">
              {mode === "signup"
                ? "Join us for crunchy happiness"
                : "Login to continue shopping"}
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-4">

            {/* REGISTER FORM (2 COLUMN) */}
            {mode === "signup" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input icon={<User size={15} />} placeholder="Full Name" />
                <Input icon={<Mail size={15} />} placeholder="Email Address" />

                <PasswordInput />
                <Input icon={<Phone size={15} />} placeholder="Mobile Number" />

                <SelectInput
                  icon={<User size={15} />}
                  placeholder="Account Type"
                  options={[
                    "Personal Customer",
                    "Wholesale Buyer",
                    "Retail Shop Owner",
                  ]}
                />

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
              </div>
            )}

            {/* LOGIN FORM (SINGLE COLUMN ONLY) */}
            {mode === "login" && (
              <>
                <Input icon={<Mail size={15} />} placeholder="Email Address" />
                <PasswordInput />
              </>
            )}

            {/* Submit */}
            <button className="w-full bg-[#b43424] hover:bg-[#9e2c1f] text-white py-3 rounded-full font-semibold shadow-md transition active:scale-95">
              {mode === "signup" ? "CREATE ACCOUNT" : "LOGIN"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#eadbcf]" />
              <span className="text-xs text-[#8a6a52]">OR</span>
              <div className="flex-1 h-px bg-[#eadbcf]" />
            </div>

            {/* Google */}
            <button className="w-full flex items-center justify-center gap-3 border border-[#e6d4c7] bg-white py-3 rounded-full text-sm font-semibold text-[#7a2e1d] hover:bg-[#fff1e6] transition">
              <img src="/goggle.png" className="w-5 h-5" />
              Continue with Google
            </button>

            {/* Toggle */}
            <p className="text-xs text-center text-[#8a6a52] mt-3">
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
        className="w-full pl-10 pr-4 py-3 rounded-full border border-[#f1e6dc] bg-[#fffdfb] text-sm focus:outline-none focus:ring-2 focus:ring-[#7a2e1d]/20"
      />
    </div>
  );
}

/* PASSWORD */
function PasswordInput() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <span className="absolute left-4 top-3 text-[#b08b6f]">
        <Lock size={15} />
      </span>
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        className="w-full pl-10 pr-10 py-3 rounded-full border border-[#f1e6dc] bg-[#fffdfb] text-sm focus:outline-none focus:ring-2 focus:ring-[#7a2e1d]/20"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-3 text-[#b08b6f]"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

/* SELECT */
function SelectInput({ icon, placeholder, options }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center w-full pl-10 pr-4 py-3 rounded-full border border-[#f1e6dc] bg-[#fffdfb] text-sm cursor-pointer"
      >
        <span className="absolute left-4 text-[#b08b6f]">{icon}</span>
        <span className={selected ? "text-[#7a2e1d]" : "text-[#b08b6f]"}>
          {selected || placeholder}
        </span>
        <span className="ml-auto">⌄</span>
      </div>

      {open && (
        <ul className="absolute z-20 w-full mt-1 max-h-44 overflow-auto rounded-xl border bg-white shadow-lg text-sm">
          {options.map((opt, i) => (
            <li
              key={i}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-[#f9f3ef] cursor-pointer"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
