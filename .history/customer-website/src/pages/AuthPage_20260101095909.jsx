import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('login-bg.png')" }}
    >
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl shadow-xl overflow-hidden bg-white/80 backdrop-blur-md">

        {/* LEFT – FORM */}
        <div className="p-6 md:p-10">
          {/* Logo */}
          <h2 className="text-2xl font-serif font-bold text-[#7a2e1d]">
            Shree Chikki
          </h2>
          <p className="text-sm text-[#9b6a4a] mb-6">
            Pure & Traditional Taste
          </p>

          {/* Toggle */}
          <div className="flex gap-6 mb-6 font-medium">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-2 ${
                isLogin
                  ? "text-[#7a2e1d] border-b-2 border-[#7a2e1d]"
                  : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-2 ${
                !isLogin
                  ? "text-[#7a2e1d] border-b-2 border-[#7a2e1d]"
                  : "text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* FORM */}
          {isLogin ? (
            <>
              <Input placeholder="Email Address" />
              <Input placeholder="Password" type="password" />

              <button className="w-full mt-5 bg-[#b43424] hover:bg-[#9e2c1f] text-white py-3 rounded-full font-semibold">
                LOGIN
              </button>
            </>
          ) : (
            <>
              <Input placeholder="Full Name" />
              <Input placeholder="Email Address" />
              <Input placeholder="Password" type="password" />
              <Input placeholder="Mobile Number" />
              <Input placeholder="City / State" />

              <button className="w-full mt-5 bg-[#b43424] hover:bg-[#9e2c1f] text-white py-3 rounded-full font-semibold">
                CREATE ACCOUNT
              </button>
            </>
          )}

          <p className="text-xs text-gray-500 mt-4 text-center">
            By creating an account you agree to our{" "}
            <span className="underline cursor-pointer">
              Terms & Privacy Policy
            </span>
          </p>
        </div>

        {/* RIGHT – CONTENT (NO WHITE BG) */}
        <div className="hidden md:flex flex-col justify-center px-10">
          <h3 className="text-3xl font-serif font-bold text-[#7a2e1d] mb-6">
            Create Account
          </h3>

          <p className="text-[#9b6a4a] mb-6">
            Why join our Chikki family?
          </p>

          <ul className="space-y-4 text-[#7a2e1d]">
            {[
              "Order fresh homemade chikki online",
              "Pure jaggery & premium peanuts",
              "Easy re-order & order tracking",
              "Special festival discounts",
              "Share products with friends & family",
              "Doorstep delivery across India",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-[#f2a23a] font-bold">✔</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ placeholder, type = "text" }) {
  return (
    <div className="mb-3">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e6b28a] bg-white/70"
      />
    </div>
  );
}
