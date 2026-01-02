import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('login-b.jpg')",
      }}
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT – FORM */}
        <div className="p-8 md:p-12">
          {/* Logo */}
          <h2 className="text-2xl font-serif font-bold text-[#7a2e1d] mb-1">
            Shree Chikki
          </h2>
          <p className="text-sm text-[#9b6a4a] mb-6">
            Pure & Traditional Taste
          </p>

          {/* Toggle */}
          <div className="flex gap-6 mb-8 font-medium">
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
              <Input label="Email Address" />
              <Input label="Password" type="password" />

              <button className="w-full mt-6 bg-[#b43424] hover:bg-[#9e2c1f] text-white py-3 rounded-full font-semibold">
                LOGIN
              </button>
            </>
          ) : (
            <>
              <Input label="Full Name" />
              <Input label="Email Address" />
              <Input label="Password" type="password" />
              <Input label="Mobile Number" />
              <Input label="City / State" />

              <button className="w-full mt-6 bg-[#b43424] hover:bg-[#9e2c1f] text-white py-3 rounded-full font-semibold">
                CREATE ACCOUNT
              </button>
            </>
          )}

          <p className="text-xs text-gray-500 mt-4 text-center">
            By continuing, you agree to our{" "}
            <span className="underline">Terms & Privacy Policy</span>
          </p>
        </div>

        {/* RIGHT – CONTENT */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-[#fff6ee]">
          <h3 className="text-3xl font-serif font-bold text-[#7a2e1d] mb-6">
            Why join our Chikki family?
          </h3>

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

/* Reusable Input Component */
function Input({ label, type = "text" }) {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={label}
        className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e6b28a]"
      />
    </div>
  );
}
