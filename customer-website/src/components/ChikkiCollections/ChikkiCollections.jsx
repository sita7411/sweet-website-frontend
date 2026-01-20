import { ArrowRight } from "lucide-react";

export default function ChikkiCollectionGrid() {
  return (
    <section className="w-full bg-[var(--bg-main)]">
      {/* ==================== DESKTOP LAYOUT (lg and above) ==================== */}
      <div className="hidden lg:grid lg:grid-cols-4 mt-6">
        {/* Original desktop order - exactly as you have */}
        <div className="h-[250px]">
          <img src="pista.png" alt="Pista Chikki" className="w-full h-full object-cover" />
        </div>

        <div className="h-[250px] bg-[var(--bg-main)] flex flex-col justify-center items-center text-center px-6">
          <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">Pista Chocolate Chikki</h3>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition">
            Shop Now <ArrowRight size={16} />
          </button>
        </div>

        <div className="h-[250px]">
          <img src="/stwabarry_chikki.png" alt="Strawberry Chikki" className="w-full h-full object-cover" />
        </div>

        <div className="h-[250px] bg-[var(--bg-main)] flex flex-col justify-center items-center text-center px-6">
          <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">Strawberry Chocolate Chikki</h3>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition">
            Shop Now <ArrowRight size={16} />
          </button>
        </div>

        <div className="h-[250px] bg-[var(--bg-soft)] flex flex-col justify-center items-center text-center px-6">
          <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">Mango Chocolate Chikki</h3>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition">
            Shop Now <ArrowRight size={16} />
          </button>
        </div>

        <div className="h-[250px]">
          <img src="mango_chikki.png" alt="Mango Chikki" className="w-full h-full object-cover" />
        </div>

        <div className="h-[250px] bg-[var(--bg-soft)] flex flex-col justify-center items-center text-center px-6">
          <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">Chocolate Chikki</h3>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition">
            Shop Now <ArrowRight size={16} />
          </button>
        </div>

        <div className="h-[250px]">
          <img src="choclate.png" alt="Chocolate Chikki" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT (below lg) ==================== */}
      <div className="grid grid-cols-2 lg:hidden">
        {/* 1. Pista: Image → Text */}
        <div className="h-[320px]">
          <img src="pista.png" alt="Pista Chikki" className="w-full h-full object-cover" />
        </div>
        <div className="h-[320px] bg-[var(--bg-main)] flex flex-col justify-center items-center text-center px-6">
          <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">Pista Chocolate Chikki</h3>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition">
            Shop Now <ArrowRight size={16} />
          </button>
        </div>

        {/* 2. Strawberry: Text → Image (zig-zag) */}
        <div className="h-[320px] bg-[var(--bg-main)] flex flex-col justify-center items-center text-center px-6">
          <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">Strawberry Chocolate Chikki</h3>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition">
            Shop Now <ArrowRight size={16} />
          </button>
        </div>
        <div className="h-[320px]">
          <img src="/stwabarry_chikki.png" alt="Strawberry Chikki" className="w-full h-full object-cover" />
        </div>

        {/* 3. Mango: Image → Text */}
        <div className="h-[320px]">
          <img src="mango_chikki.png" alt="Mango Chikki" className="w-full h-full object-cover" />
        </div>
        <div className="h-[320px] bg-[var(--bg-soft)] flex flex-col justify-center items-center text-center px-6">
          <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">Mango Chocolate Chikki</h3>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition">
            Shop Now <ArrowRight size={16} />
          </button>
        </div>

        {/* 4. Chocolate: Text → Image */}
        <div className="h-[320px] bg-[var(--bg-soft)] flex flex-col justify-center items-center text-center px-6">
          <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">Chocolate Chikki</h3>
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition">
            Shop Now <ArrowRight size={16} />
          </button>
        </div>
        <div className="h-[320px]">
          <img src="choclate.png" alt="Chocolate Chikki" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}