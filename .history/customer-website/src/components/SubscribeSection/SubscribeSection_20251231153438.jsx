export default function SubscribeSection() {
  return (
    <section className="px-4 md:px-10 py-12">
      <div
        className="relative overflow-hidden rounded-[60px] bg-cover bg-center"
        style={{
          backgroundImage: "url('subscribe-bg.png')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 md:px-16 py-14">
          
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#3a2416] mb-4">
              Subscribe To <br /> Our Letter
            </h2>

            <p className="text-[#8a6a52] max-w-md mb-6">
              Summer flavors & giving back! Try our new treats & support a local
              charity – every purchase counts. Thanks for choosing us!
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center bg-black rounded-full px-5 py-3 w-full sm:w-auto">
                <span className="text-white mr-2">✉</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent outline-none text-white placeholder:text-gray-300 w-full"
                />
              </div>

              <button className="bg-white text-[#3a2416] font-medium px-8 py-3 rounded-full hover:bg-[#f2b705] transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/subscribe-product.png"
              alt="Chikki Product"
              className="max-w-[320px] md:max-w-[380px] drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
