import { User, Mail, Lock, Phone, MapPin, EyeOff, Check } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#f9f3ef] relative font-sans">

      {/* Texture Background */}
      <div
        className="absolute inset-0 bg-[url('/login.png')] bg-cover opacity-100 pointer-events-none"
      />

      {/* HEADER */}
      <header className="relative z-10 px-8 py-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#7a2e1d] flex items-center justify-center text-white font-bold">
          S
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#7a2e1d] leading-none">
            Shree Chikki
          </h1>
          <p className="text-[10px] text-[#9b6a4a] tracking-widest italic uppercase">
            — Pure & Traditional Taste —
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 h-[calc(100vh-180px)] flex items-center px-8 lg:px-24">
        <div className="w-full grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT FORM CARD */}
          <div className="bg-white rounded-[36px] shadow-xl w-full max-w-[420px] mx-auto flex flex-col">

            {/* FIXED TITLE */}
            <div className="p-8 pb-4 text-center">
              <h2 className="text-2xl font-serif font-bold text-[#7a2e1d]">
                Create Account
              </h2>
              <p className="text-sm text-[#9b6a4a]">
                Why join our Chikki family?
              </p>
            </div>

            {/* ✅ ONLY FORM SCROLLS */}
            <div className="px-8 pb-8 overflow-y-auto max-h-[420px] space-y-3 scrollbar-thin">
              <Input icon={<User size={16} />} placeholder="Ishad Ahamed" />
              <Input icon={<Mail size={16} />} placeholder="Email Address" />
              <div className="relative">
                <Input icon={<Lock size={16} />} placeholder="Password" type="password" />
                <EyeOff className="absolute right-4 top-3 text-gray-300" size={16} />
              </div>
              <Input icon={<Phone size={16} />} placeholder="Mobile Number" />
              <Input icon={<MapPin size={16} />} placeholder="Select Your City / State" />

              <button className="w-full mt-3 bg-[#b43424] hover:bg-[#9e2c1f] text-white py-3 rounded-full font-bold shadow-md transition">
                CREATE ACCOUNT
              </button>

              <p className="text-[10px] text-center text-gray-400 mt-3">
                By creating account, you agree to <br />
                <span className="font-semibold underline cursor-pointer">
                  Terms & Privacy Policy
                </span>
              </p>

              <div className="flex items-center gap-3 my-4">
                <span className="flex-1 h-px bg-gray-100"></span>
                <span className="text-[10px] text-gray-400 uppercase">
                  Or join with
                </span>
                <span className="flex-1 h-px bg-gray-100"></span>
              </div>

              <div className="flex justify-center gap-4">
                <SocialBtn />
                <SocialBtn />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT (NO WHITE BG) */}
          <div className="hidden md:block">
            <h3 className="text-4xl font-serif font-bold text-[#7a2e1d] mb-3">
              Create Account
            </h3>
            <p className="text-lg text-[#9b6a4a] mb-8">
              Why join our Chikki family?
            </p>

            <ul className="space-y-4">
              {[
                "Order fresh homemade chikki online",
                "Pure jaggery & premium peanuts",
                "Easy re-order & order tracking",
                "Special festival discounts",
                "Share products with friends & family",
                "Doorstep delivery across India",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#7a2e1d]">
                  <span className="w-5 h-5 rounded border border-[#f2a23a] text-[#f2a23a] flex items-center justify-center">
                    <Check size={12} />
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
      <span className="absolute left-4 top-3 text-gray-400">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-100 bg-[#fdfaf8] text-sm focus:outline-none focus:ring-1 focus:ring-[#7a2e1d]/20"
      />
    </div>
  );
}

/* SOCIAL */
function SocialBtn() {
  return (
    <button className="w-10 h-10 rounded-full border border-gray-100 bg-white shadow-sm hover:bg-gray-50" />
  );
}
