export default function SubscribeSection() {
  return (
    <section className="px-4 md:px-10 py-16">
      <div className="relative rounded-3xl bg-[#fff1db] overflow-hidden">
        
        {/* subtle decorative shapes */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#f2b705]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#c63b2f]/10 rounded-full blur-3xl"></div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6 md:px-16 py-16">

          {/* Left Content */}
          <div>
            <span className="inline-block mb-3 text-sm uppercase tracking-wide text-[#c63b2f] font-medium">
              Newsletter
            </span>

            <h2 className="text-3xl md:text-4xl font-serif text-[#3a2416] leading-tight mb-4">
              Subscribe To <br /> Our Letter
            </h2>

            <p className="text-[#8a6a52] max-w-md mb-8">
              Get fresh chikki flavors, festive offers, and wholesome updates
              delivered straight to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">

              {/* Email Input */}
              <div className="flex items-center bg-white rounded-full px-5 py-3 w-full sm:max-w-sm shadow-md focus-within:ring-2 focus-within:ring-[#f2b705]">
                <span className="text-[#3a2416] mr-3 text-lg">✉</span>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-transparent outline-none text-[#3a2416] placeholder:text-[#8a6a52] w-full text-sm"
                />
              </div>

              {/* Button */}
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
              object-contain drop-shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
