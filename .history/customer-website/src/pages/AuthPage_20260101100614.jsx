import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, EyeOff } from "lucide-react";

export default function AuthPage() {
  return (
    // h-screen aur overflow-hidden se scrolling band ho jayegi
    <div className="h-screen w-full flex flex-col overflow-hidden px-4 bg-[#f9f3ef] font-sans relative">
      
      {/* Background Image/Texture Overlay (Optional) */}
      <div className="absolute inset-0 opacity- pointer-events-none" 
           style={{ backgroundImage: "url('login-bg.jpg')", backgroundSize: 'cover' }}></div>

      {/* HEADER - Compact Height */}
      <header className="p-4 md:p-6 flex items-center gap-2 z-10">
        <div className="w-10 h-10 bg-[#7a2e1d] rounded-full flex items-center justify-center text-white font-bold">S</div>
        <div>
          <h1 className="text-xl font-bold text-[#7a2e1d] leading-none">Shree Chikki</h1>
          <p className="text-[10px] text-[#9b6a4a] italic uppercase tracking-wider">— Pure & Traditional Taste —</p>
        </div>
      </header>

      {/* MAIN CONTENT - flex-1 keeps it within the screen height */}
      <main className="flex-1 flex items-center justify-center px-6 lg:px-20 z-10">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* LEFT SIDE - WHITE CARD (Slightly more compact) */}
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-black/5 w-full max-w-[400px] mx-auto border border-orange-50/50">
            <h2 className="text-2xl font-serif font-bold text-[#7a2e1d] text-center mb-1">Create Account</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Why join our Chikki family?</p>

            <form className="space-y-3">
              <Input icon={<User size={16}/>} placeholder="Ishad Ahamed" />
              <Input icon={<Mail size={16}/>} placeholder="Email Address" />
              <div className="relative">
                <Input icon={<Lock size={16}/>} placeholder="Password" type="password" />
                <EyeOff className="absolute right-4 top-3 text-gray-300 cursor-pointer" size={16}/>
              </div>
              <Input icon={<Phone size={16}/>} placeholder="Mobile Number" />
              <div className="relative">
                <Input icon={<MapPin size={16}/>} placeholder="Select Your City / State" />
                <span className="absolute right-5 top-3 text-gray-400 text-xs">▼</span>
              </div>

              <button className="w-full bg-[#b43424] hover:bg-[#9e2c1f] text-white py-3 rounded-full font-bold text-base shadow-md transition-all active:scale-95 mt-2">
                CREATE ACCOUNT
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-[9px] text-gray-400 uppercase tracking-tighter mb-4">
                By creating account, you agree to <br/> 
                <span className="font-bold text-gray-600 underline cursor-pointer">Terms & Privacy Policy</span>
              </p>
              
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink mx-4 text-[10px] text-gray-400 uppercase">Or join with</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>
              
              <div className="flex justify-center gap-4 mt-3">
                <SocialBtn type="google" />
                <SocialBtn type="facebook" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FLOATING TEXT (No Box) */}
          <div className="hidden md:block">
            <h3 className="text-4xl font-serif font-bold text-[#7a2e1d] mb-2">Create Account</h3>
            <p className="text-[#9b6a4a] text-lg mb-6">Why join our Chikki family?</p>

            <ul className="space-y-4">
              {[
                "Order fresh homemade chikki online",
                "Pure jaggery & premium peanuts",
                "Easy re-order & order tracking",
                "Special festival discounts",
                "Share products with friends & family",
                "Doorstep delivery across India",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#7a2e1d] font-medium text-sm lg:text-base">
                  <span className="flex-shrink-0 w-5 h-5 border border-[#f2a23a] rounded flex items-center justify-center text-[#f2a23a] text-[10px] font-black bg-white/50">
                    L
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>

      {/* FOOTER - Fixed at bottom */}
      <footer className="p-6 flex justify-between items-center text-[#7a2e1d] text-[12px] z-10">
        <div className="flex gap-6 font-semibold">
          <a href="#" className="hover:underline">Explore</a>
          <a href="#" className="hover:underline">Help & feedback</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 hidden sm:inline">©2024 Shree Chikki. All rights reserved.</span>
          <div className="flex gap-3 text-lg">
             {/* Social Icons FontAwesome or Lucide */}
             <span>f</span> <span>t</span> <span>i</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Input({ icon, placeholder, type = "text" }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-3 text-gray-400">{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-100 bg-[#fdfaf8] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7a2e1d]/20 transition-all text-sm placeholder:text-gray-300"
      />
    </div>
  );
}

function SocialBtn({ type }) {
  return (
    <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors bg-white">
      <img 
        src={type === 'google' ? 'google-icon-url' : 'fb-icon-url'} 
        alt={type} 
        className="w-5 h-5"
      />
    </button>
  );
}