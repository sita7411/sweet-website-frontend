import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState("signup");

  return (
    <div className="h-screen w-full bg-[#f9f3ef] relative font-sans overflow-hidden flex flex-col">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/login.png')] bg-cover bg-center opacity-80" />

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-center mt-5 -mb-6 gap-2 py-3">
        <img src="/Logo_Marvel.png" className="w-25 h-25" />
        <div className="text-center">
          <h1 className="text-base font-bold text-[#7a2e1d]">
            Marvel Crunch Chikki
          </h1>
          <p className="text-[11px] text-[#9b6a4a] italic tracking-wide">
            Pure & Traditional Taste
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-2">
        <div
          className="bg-[#fffaf6] rounded-3xl shadow-xl w-full
          max-w-[560px] mx-auto px-6 py-4"
        >

          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-serif font-semibold text-[#7a2e1d]">
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-xs text-[#8a6a52] mt-1">
              {mode === "signup"
                ? "Join us for crunchy happiness"
                : "Login to continue shopping"}
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-6 ">

            {/* SIGNUP */}
            {mode === "signup" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input icon={<User size={15} />} placeholder="Full Name" />
                <Input icon={<Mail size={15} />} placeholder="Email Address" />
                <PasswordInput />
                <Input icon={<Phone size={15} />} placeholder="Mobile Number" />
                <SelectInput
                  icon={<User size={15} />}
                  placeholder="Account Type"
                  options={["Personal", "Wholesale", "Retailer"]}
                />
                <SelectInput
                  icon={<MapPin size={15} />}
                  placeholder="City"
                  options={["Ahmedabad", "Surat", "Mumbai", "Delhi"]}
                />
              </div>
            )}

            {/* LOGIN */}
            {mode === "login" && (
              <div className="max-w-[300px] mx-auto space-y-3">
                <Input icon={<Mail size={15} />} placeholder="Email Address" />
                <PasswordInput />
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col items-center gap-3 pt-1">

              <button
                className="w-[70%]
                bg-[#b43424] hover:bg-[#9e2c1f]
                text-white py-2.5 rounded-full
                text-sm font-semibold tracking-wide
                shadow transition active:scale-95"
              >
                {mode === "signup" ? "CREATE ACCOUNT" : "LOGIN"}
              </button>

              <button
                className="w-[70%]
                flex items-center justify-center gap-2
                border border-[#e6d4c7]
                bg-white py-2.5 rounded-full
                text-xs font-semibold text-[#7a2e1d]
                hover:bg-[#fff1e6] transition"
              >
                <img src="/goggle.png" className="w-4 h-4" />
                Continue with Google
              </button>
            </div>

            {/* TOGGLE */}
            <p className="text-xs text-center text-[#8a6a52] pt-2">
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
        className="w-full pl-10 pr-4 py-2.5
        rounded-full border border-[#f1e6dc]
        bg-[#fffdfb] text-xs
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
      <span className="absolute left-4 top-3 text-[#b08b6f]">
        <Lock size={15} />
      </span>
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        className="w-full pl-10 pr-10 py-2.5
        rounded-full border border-[#f1e6dc]
        bg-[#fffdfb] text-xs
        focus:outline-none focus:ring-2
        focus:ring-[#7a2e1d]/20"
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
        className="flex items-center w-full
        pl-10 pr-4 py-2.5 rounded-full
        border border-[#f1e6dc]
        bg-[#fffdfb] text-xs cursor-pointer"
      >
        <span className="absolute left-4 text-[#b08b6f]">{icon}</span>
        <span className={selected ? "text-[#7a2e1d]" : "text-[#b08b6f]"}>
          {selected || placeholder}
        </span>
        <span className="ml-auto text-xs">⌄</span>
      </div>

      {open && (
        <ul className="absolute z-20 w-full mt-2
        max-h-36 overflow-auto rounded-xl
        border bg-white shadow-md text-xs">
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
