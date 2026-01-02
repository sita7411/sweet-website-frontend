import { Heart } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-[var(--secondary)] text-white py-2 font-medium text-xs sm:text-sm tracking-wide flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 text-center sm:text-left px-4">
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Heart className="w-4 h-4 text-white" />
        <span>
          LAST CHANCE! Order your delicious chikkis by tomorrow 9AM PT for New Year's Eve delivery.{" "}
          <a
            href="/products"
            className="underline hover:text-[var(--accent)] transition-colors duration-300"
          >
            Shop Now
          </a>
        </span>
        <span className="ml-1 text-lg hidden sm:inline">→</span>
      </div>

      {/* Mobile arrow at the end of the line */}
      </div>
  );
}
