export default function SubscribeSection() {
  return (
    <section className="px-4 md:px-10 py-20 flex justify-center items-center bg-[var(--bg-main)]">
      <div className="relative w-full max-w-6xl min-h-[460px] overflow-hidden">

        {/* SVG SHAPE BG */}
        <svg
          viewBox="0 0 882 491"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full z-0"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff1db" />
              <stop offset="50%" stopColor="#fff7ec" />
              <stop offset="100%" stopColor="#fffaf3" />
            </linearGradient>

            {/* mask so image stays inside shape */}
            <mask id="shapeMask">
              <rect width="100%" height="100%" fill="white" />
            </mask>
          </defs>

          <path
            d="M784.5 15.5C834.5 15.5 866.5 47.5 866.5 97.5C866.5 137.5 842.5 157.5 881.5 197.5V292.5C842.5 332.5 866.5 352.5 866.5 392.5C866.5 442.5 834.5 474.5 784.5 474.5H97.5C47.5 474.5 15.5 442.5 15.5 392.5C15.5 352.5 39.5 332.5 0.5 292.5V197.5C39.5 157.5 15.5 137.5 15.5 97.5C15.5 47.5 47.5 15.5 97.5 15.5H784.5Z"
            fill="url(#bgGradient)"
          />
        </svg>

        {/* RIGHT FULL IMAGE */}
        <div className="absolute right-0 top-0 h-full w-full md:w-[48%] z-0">
          <img
            src="pista.png"
            alt="Chikki"
            className="h-full w-full object-cover"
          />

          {/* soft fade like reference image */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#fffaf3]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full px-10 md:px-24 py-14">

          {/* LEFT TEXT */}
          <div className="flex flex-col justify-center gap-6">
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] leading-tight">
              Subscribe to <br /> Our Newsletter
            </h2>

            <p className="text-[var(--text-muted)] max-w-sm">
              Get fresh chikki updates, offers & healthy treats straight to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center bg-[#3a2416] rounded-full px-5 py-3.5 w-full sm:w-80">
                <span className="text-white mr-3 opacity-70">✉</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent outline-none text-white placeholder:text-gray-300 text-sm w-full"
                />
              </div>

              <button className="bg-[var(--primary)] text-white font-semibold px-10 py-3.5 rounded-full hover:opacity-90 transition active:scale-95">
                Subscribe
              </button>
            </div>
          </div>

          {/* EMPTY RIGHT COLUMN (image handled absolutely) */}
          <div />
        </div>
      </div>
    </section>
  );
}
