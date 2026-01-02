export default function SubscribeSection() {
  return (
    <section className="px-4 md:px-10 py-20 flex justify-center items-center bg-white">
      {/* Main Container */}
      <div className="relative w-full max-w-6xl min-h-[450px] flex items-center">
        
        {/* EXACT SHAPE SVG BACKGROUND */}
        <div className="absolute inset-0 z-0">
   <svg
  viewBox="0 0 882 491"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-full h-full drop-shadow-lg"
  preserveAspectRatio="none"
>
  {/* Gradient Definition */}
  <defs>
    <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="50%" stopColor="#fff1db" />
      <stop offset="100%" stopColor="#faeef6ff" />
    </linearGradient>
  </defs>

  {/* Shape */}
  <path
    d="M784.5 15.5C834.5 15.5 866.5 47.5 866.5 97.5C866.5 137.5 842.5 157.5 881.5 197.5C881.5 197.5 881.5 292.5 881.5 292.5C842.5 332.5 866.5 352.5 866.5 392.5C866.5 442.5 834.5 474.5 784.5 474.5H97.5C47.5 474.5 15.5 442.5 15.5 392.5C15.5 352.5 39.5 332.5 0.5 292.5V197.5C39.5 157.5 15.5 137.5 15.5 97.5C15.5 47.5 47.5 15.5 97.5 15.5H784.5Z"
    fill="url(#bgGradient)"
  />
</svg>

        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-10 md:px-24 py-12 w-full">
          
          {/* Left Side: Text & Input */}
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-serif text-[#3a2416] leading-tight">
              Subscribe To <br /> Our Letter
            </h2>
            
            <p className="text-[#8a6a52] max-w-sm text-base leading-relaxed">
              Summer flavors & giving back! Try our new treats & support a local
              charity – every purchase counts.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <div className="flex items-center bg-black rounded-full px-5 py-3.5 w-full sm:w-80">
                <span className="text-white mr-3 opacity-70">✉</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-sm w-full"
                />
              </div>
              <button className="bg-white text-[#3a2416] font-bold px-10 py-3.5 rounded-full hover:bg-[#f2b705] transition-all shadow-md active:scale-95">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Side: Product Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="side-img.png" 
              alt="Product"
              className="max-w-[300px] md:max-w-[420px] object-contain "
            />
          </div>

        </div>
      </div>
    </section>
  );
}