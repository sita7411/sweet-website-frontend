export default function SubscribeSection() {
  return (
    <section className="px-4 md:px-10 py-20 flex justify-center items-center overflow-hidden">
      <div className="relative w-full max-w-6xl min-h-[450px] flex items-center">
        
        {/* EXACT CUSTOM SHAPE SVG */}
        <div className="absolute inset-0 z-0">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full drop-shadow-xl"
            preserveAspectRatio="none"
          >
            <path
              /* Ye path exact corners aur side curves create karta hai */
              d="M150,20 
                 L850,20 
                 C880,20 900,40 900,70 
                 C900,100 930,120 970,120 
                 C1000,120 1000,150 1000,250 
                 C1000,350 1000,380 970,380 
                 C930,380 900,400 900,430 
                 C900,460 880,480 850,480 
                 L150,480 
                 C120,480 100,460 100,430 
                 C100,400 70,380 30,380 
                 C0,380 0,350 0,250 
                 C0,150 0,120 30,120 
                 C70,120 100,100 100,70 
                 C100,40 120,20 150,20 
                 Z"
              fill="#FDF0E4" 
            />
          </svg>
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-12 md:px-24 py-12 w-full">
          
          {/* Left Side */}
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-serif text-[#3a2416] leading-tight">
              Subscribe To <br /> Our Letter
            </h2>
            <p className="text-[#8a6a52] max-w-sm text-lg italic">
              "Summer flavors & giving back! Try our new treats."
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
              <div className="flex items-center bg-black rounded-full px-6 py-4 w-full sm:w-80 shadow-inner">
                <span className="text-white mr-3 opacity-60 text-xl">✉</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-sm w-full font-light"
                />
              </div>
              <button className="bg-[#3a2416] text-white font-bold px-10 py-4 rounded-full hover:bg-black transition-all shadow-lg active:scale-95 uppercase tracking-wider text-xs">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/subscribe-product.png"
              alt="Product"
              className="max-w-[300px] md:max-w-[450px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}