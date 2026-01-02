import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");

  return (
    <div className="min-h-screen w-full bg-[#f9f3ef] relative font-sans overflow-hidden flex flex-col">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/login.png')] bg-cover bg-center opacity-90" />

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-center gap-3 py-4">
        <img src="/Logo_Marvel.png" className="w-14 h-14 sm:w-16 sm:h-16" />
        <div className="text-center">
          <h1 className="text-lg font-bold text-[#7a2e1d]">
            Marvel Crunch Chikki
          </h1>
          <p className="text-xs text-[#9b6a4a] italic tracking-wider">
            — Pure & Traditional Taste —
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-2">
        <div
          className="bg-[#fffaf6] rounded-[28px] shadow-2xl w-full
          max-w-[680px] lg:max-w-[720px]
          mx-auto px-8 py-7"
        >

          {/* Title */}
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

          {/* FORM */}
          <div className="space-y-5">

            {/* SIGNUP */}
            {mode === "signup" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input icon={<User size={16} />} placeholder="Full Name" />
                <Input icon={<Mail size={16} />} placeholder="Email Address" />

                <PasswordInput />
                <Input icon={<Phone size={16} />} placeholder="Mobile Number" />

                <SelectInput
                  icon={<User size={16} />}
                  placeholder="Account Type"
                  options={[
                    "Personal Customer",
                    "Wholesale Buyer",
                    "Retail Shop Owner",
                  ]}
                />

                <SelectInput
                  icon={<MapPin size={16} />}
                  placeholder="Select City"
                  options={[
                    "Ahmedabad",
                    "Surat",
                    "Rajkot",
                    "Vadodara",
                    "Mumbai",
                    "Pune",
                    "Delhi",
                    "Bengaluru",
                  ]}
                />
              </div>
            )}

            {/* LOGIN */}
            {mode === "login" && (
              <div className="max-w-[360px] mx-auto space-y-4">
                <Input icon={<Mail size={16} />} placeholder="Email Address" />
                <PasswordInput />
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col items-center gap-3 pt-2">

              <button
                className="w-[75%] sm:w-[60%]
                bg-[#b43424] hover:bg-[#9e2c1f]
                text-white py-3 rounded-full
                font-semibold tracking-wide
                shadow-md transition active:scale-95"
              >
                {mode === "signup" ? "CREATE ACCOUNT" : "LOGIN"}
              </button>

              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-[#eadbcf]" />
                <span className="text-xs text-[#8a6a52]">OR</span>
                <div className="flex-1 h-px bg-[#eadbcf]" />
              </div>

              <button
                className="w-[75%] sm:w-[60%]
                flex items-center justify-center gap-3
                border border-[#e6d4c7]
                bg-white py-3 rounded-full
                text-sm font-semibold text-[#7a2e1d]
                hover:bg-[#fff1e6] transition"
              >
                <img src="/goggle.png" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            {/* TOGGLE */}
            <p className="text-sm text-center text-[#8a6a52] pt-2">
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
      <span className="absolute left-4 top-3.5 text-[#b08b6f]">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3.5
        rounded-full border border-[#f1e6dc]
        bg-[#fffdfb] text-sm
        focus:outline-none focus:ring-2
        focus:ring-[#7a2e1d]/20"
      />
    </div>
  );
}

/* PASSWORD */
function PasswordInput() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <span className="absolute left-4 top-3.5 text-[#b08b6f]">
        <Lock size={16} />
      </span>
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        className="w-full pl-11 pr-11 py-3.5
        rounded-full border border-[#f1e6dc]
        bg-[#fffdfb] text-sm
        focus:outline-none focus:ring-2
        focus:ring-[#7a2e1d]/20"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-3.5 text-[#b08b6f]"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
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
        className="flex items-center w-full
        pl-11 pr-4 py-3.5 rounded-full
        border border-[#f1e6dc]
        bg-[#fffdfb] text-sm cursor-pointer"
      >
        <span className="absolute left-4 text-[#b08b6f]">{icon}</span>
        <span className={selected ? "text-[#7a2e1d]" : "text-[#b08b6f]"}>
          {selected || placeholder}
        </span>
        <span className="ml-auto text-xs">⌄</span>
      </div>

      {open && (
        <ul className="absolute z-20 w-full mt-2
        max-h-44 overflow-auto rounded-xl
        border bg-white shadow-lg text-sm">
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
