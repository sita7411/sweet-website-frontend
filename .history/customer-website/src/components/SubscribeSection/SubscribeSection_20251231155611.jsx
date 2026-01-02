export default function SubscribeSection() {
  return (
    <section className="px-4 md:px-10 py-20">
      <div className="relative">

        {/* SHAPE BACKGROUND */}
        <svg
          viewBox="0 0 1440 420"
          className="w-full h-[420px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C120,180 260,40 420,80 620,130 700,300 900,260 1100,220 1180,100 1440,140 L1440,0 L0,0 Z"
            fill="#fff1db"
          />
        </svg>

        {/* CONTENT */}
        <div className="absolute inset-0 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 px-6 md:px-20 w-full">

            {/* Left Content */}
            <div>
              <span className="inline-block mb-3 text-sm uppercase tracking-wide text-[#c63b2f] font-medium">
                Newsletter
              </span>

              <h2 className="text-3xl md:text-4xl font-serif text-[#3a2416] leading-tight mb-4">
                Subscribe To <br /> Our Letter
              </h2>

              <p className="text-[#8a6a52] max-w-md mb-8">
                Fresh chikki flavors, festive offers, and wholesome updates
                straight to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center bg-white rounded-full px-5 py-3 w-full sm:max-w-sm shadow-md">
                  <span className="text-[#3a2416] mr-3">✉</span>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-transparent outline-none text-[#3a2416] placeholder:text-[#8a6a52] w-full text-sm"
                  />
                </div>

                <button className="bg-[#3a2416] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#2b1b10] transition shadow-md">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/images/subscribe-product.png"
                alt="Chikki Product"
                className="max-w-[260px] md:max-w-[360px] lg:max-w-[420px]
                object-contain drop-shadow-2xl -translate-y-6"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
