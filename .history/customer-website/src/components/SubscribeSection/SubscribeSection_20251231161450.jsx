export default function SubscribeSection() {
    return (
        <section className="px-4 md:px-10 py-16 flex justify-center items-center">
            {/* Main Container with Shape */}
            <div className="relative w-full max-w-6xl min-h-[400px] flex items-center">
                
                {/* Background Shape SVG - Pure background layer */}
                <div className="absolute inset-0 z-0">
                    <svg 
                        className="w-full h-full fill-[#fdf0e4] drop-shadow-sm" 
                        viewBox="0 0 500 250" 
                        preserveAspectRatio="none"
                    >
                        <path d="M450,40 C450,10 420,10 400,10 L100,10 C80,10 50,10 50,40 C20,40 10,70 10,100 L10,150 C10,180 20,210 50,210 C50,240 80,240 100,240 L400,240 C420,240 450,240 450,210 C480,210 490,180 490,150 L490,100 C490,70 480,40 450,40 Z" />
                    </svg>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-8 md:px-20 py-10 w-full">
                    
                    {/* Left Content */}
                    <div className="text-left">
                        <h2 className="text-3xl md:text-5xl font-serif text-[#3a2416] mb-4 leading-tight">
                            Subscribe To <br /> Our Letter
                        </h2>

                        <p className="text-[#8a6a52] max-w-md mb-8 text-sm md:text-base">
                            Summer flavors & giving back! Try our new treats & support a local
                            charity – every purchase counts. Thanks for choosing us!
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="flex items-center bg-black rounded-full px-5 py-3 w-full sm:w-72">
                                <span className="text-white mr-3">✉</span>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-transparent outline-none text-white placeholder:text-gray-400 text-sm w-full"
                                />
                            </div>

                            <button className="bg-white text-[#3a2416] font-bold px-8 py-3 rounded-full hover:bg-[#f2b705] transition shadow-md w-full sm:w-auto">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center md:justify-end">
                        <img
                            src="/images/subscribe-product.png"
                            alt="Chikki Product"
                            className="max-w-[250px] md:max-w-[380px] object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}