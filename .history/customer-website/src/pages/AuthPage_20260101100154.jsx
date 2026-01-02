import { useState } from "react";

export default function AuthPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center py-10"
      style={{ 
        backgroundImage: "url('login-bg.jpg')", // Replace with your generated image path
        backgroundColor: "#fdf8f5" 
      }}
    >
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 rounded-3xl shadow-2xl overflow-hidden bg-white/40 backdrop-blur-md border border-white/20">
        
        {/* LEFT SIDE – LOGIN FORM */}
        <div className="p-8 md:p-12 bg-white/60 flex flex-col justify-center border-r border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#7a2e1d]">Shree Chikki</h2>
            <p className="text-[#9b6a4a] font-medium">Welcome Back!</p>
          </div>

          <h3 className="text-xl font-bold text-[#7a2e1d] mb-6">Login to Your Account</h3>
          
          <form className="space-y-4">
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Password" type="password" />
            
            <div className="text-right">
              <span className="text-sm text-[#b43424] cursor-pointer hover:underline">Forgot Password?</span>
            </div>

            <button className="w-full bg-[#b43424] hover:bg-[#9e2c1f] text-white py-3.5 rounded-full font-bold shadow-lg transition-transform active:scale-95">
              LOGIN
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-orange-100 text-center">
            <p className="text-sm text-[#9b6a4a]">Don't want to login? Browse as Guest</p>
          </div>
        </div>

        {/* RIGHT SIDE – SIGN UP FORM */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-3xl font-serif font-bold text-[#7a2e1d]">New Member?</h3>
            <p className="text-[#9b6a4a] font-medium">Join our Chikki family today.</p>
          </div>

          <form className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Full Name" />
              <Input placeholder="Mobile No." />
            </div>
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Password" type="password" />
            <Input placeholder="City / State" />

            <button className="w-full mt-4 bg-[#7a2e1d] hover:bg-[#5a2216] text-white py-3.5 rounded-full font-bold shadow-lg transition-transform active:scale-95">
              CREATE ACCOUNT
            </button>
          </form>

          <p className="text-[11px] text-gray-500 mt-6 text-center leading-relaxed">
            By joining, you agree to our <br />
            <span className="underline cursor-pointer font-medium">Terms of Service</span> & <span className="underline cursor-pointer font-medium">Privacy Policy</span>
          </p>
        </div>

      </div>
    </div>
  );
}

/* REUSABLE INPUT COMPONENT */
function Input({ placeholder, type = "text" }) {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-5 py-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-[#f2a23a] bg-white/80 placeholder:text-gray-400 text-[#7a2e1d] transition-all"
      />
    </div>
  );
}