export default function SubscribeSection() {
    return (
        <section className="px-4 md:px-10 py-12">
    <div class="relative flex items-center justify-center w-80 h-48 bg-orange-50 p-4">
  <svg class="absolute inset-0 w-full h-full fill-[#fdf0e4]" viewBox="0 0 500 300" preserveAspectRatio="none">
    <path d="M450,40 C450,10 420,10 400,10 L100,10 C80,10 50,10 50,40 C20,40 10,70 10,100 L10,200 C10,230 20,260 50,260 C50,290 80,290 100,290 L400,290 C420,290 450,290 450,260 C480,260 490,230 490,200 L490,100 C490,70 480,40 450,40 Z" />
  </svg>

  <div class="relative z-10 text-center">
    <h2 class="text-xl font-bold text-gray-800">Subscribe Now</h2>
    <p class="text-sm text-gray-600">Get the latest updates!</p>
  </div>
</div>

                {/* Optional Overlay (remove if not needed) */}
                <div className="absolute inset-0 bg-white/60"></div>

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
                            className="max-w-[280px] md:max-w-[360px] lg:max-w-[400px]
                         object-contain drop-shadow-xl"
                        />
                    </div>
                </div>
        </section>
    );
}
