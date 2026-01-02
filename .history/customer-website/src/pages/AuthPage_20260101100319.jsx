import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, EyeOff } from "lucide-react"; // Icons ke liye

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-between bg-[#f9f3ef] font-sans"
      style={{
        backgroundImage: "url('https://your-chikki-background-url.jpg')", // Yahan apni background image dalein
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* HEADER / LOGO */}
      <header className="p-8 flex items-center gap-2">
        <div className="w-10 h-10 bg-[#7a2e1d] rounded-full overflow-hidden">
             {/* Logo Image Here */}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#7a2e1d] leading-none">Shree Chikki</h1>
          <p className="text-xs text-[#9b6a4a] italic">— Pure & Traditional Taste —</p>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex items-center justify-center px-6 lg:px-20 py-10">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE - WHITE FLOATING FORM */}
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-black/5 w-full max-w-md mx-auto">
            <h2 className="text-3xl font-serif font-bold text-[#7a2e1d] text-center mb-2">Create Account</h2>
            <p className="text-gray-500 text-center mb-8">Why join our Chikki family?</p>

            <form className="space-y-4">
              <Input icon={<User size={18}/>} placeholder="Ishad Ahamed" />
              <Input icon={<Mail size={18}/>} placeholder="Email Address" />
              <div className="relative">
                <Input icon={<Lock size={18}/>} placeholder="Password" type="password" />
                <EyeOff className="absolute right-4 top-3 text-gray-300 cursor-pointer" size={18}/>
              </div>
              <Input icon={<Phone size={18}/>} placeholder="Mobile Number" />
              <div className="relative">
                <Input icon={<MapPin size={18}/>} placeholder="Select Your City / State" />
                <span className="absolute right-4 top-3 text-gray-400">▼</span>
              </div>

              <button className="w-full bg-[#b43424] hover:bg-[#9e2c1f] text-white py-4 rounded-full font-bold text-lg shadow-lg transition-transform active:scale-95 mt-4">
                CREATE ACCOUNT
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">By creating an account, you agree to <br/> <span className="font-bold text-gray-600 underline">Terms & Privacy Policy</span></p>
              
              <div className="flex items-center justify-center gap-4 border-t pt-6">
                <span className="text-xs text-gray-400 absolute bg-white px-2">Or join with</span>
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <SocialBtn icon="google" />
                <SocialBtn icon="facebook" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - CONTENT (NO BOX/BG) */}
          <div className="hidden md:block">
            <h3 className="text-4xl font-serif font-bold text-[#7a2e1d] mb-2">Create Account</h3>
            <p className="text-[#9b6a4a] text-lg mb-8">Why join our Chikki family?</p>

            <ul className="space-y-5">
              {[
                "Order fresh homemade chikki online",
                "Pure jaggery & premium peanuts",
                "Easy re-order & order tracking",
                "Special festival discounts",
                "Share products with friends & family",
                "Doorstep delivery across India",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-[#7a2e1d] font-medium">
                  <span className="flex-shrink-0 w-5 h-5 border-2 border-[#f2a23a] rounded flex items-center justify-center text-[#f2a23a] text-xs font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="p-8 flex flex-wrap justify-between items-center text-[#7a2e1d] text-sm">
        <div className="flex gap-8 font-semibold">
          <a href="#">Explore</a>
          <a href="#">Help & feedback</a>
          <a href="#">Contact</a>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="text-gray-400">©2024 Shree Chikki. All rights reserved.</span>
          <div className="flex gap-3">
             {/* Icons for Facebook, Twitter, etc. */}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* CUSTOM COMPONENTS */
function Input({ icon, placeholder, type = "text" }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#7a2e1d]">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-100 bg-[#fdfaf8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7a2e1d]/10 transition-all placeholder:text-gray-300"
      />
    </div>
  );
}

function SocialBtn({ icon }) {
  return (
    <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow bg-white">
      {icon === 'google' ? 'G' : 'F'}
    </button>
  );
}