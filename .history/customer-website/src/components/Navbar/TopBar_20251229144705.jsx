import { Heart } from "lucide-react"; // cute icon pehle

export default function TopBar() {
  return (
    <div className="w-full bg-[var(--secondary)] text-white py-2 font-medium text-xs sm:text-sm tracking-wide flex justify-center items-center gap-2">
      <Heart className="w-4 h-4 text-white-400" />
      <span>
        LAST CHANCE! Order your delicious chikkis by tomorrow 9AM PT for New Year's Eve delivery.{" "}
        <a
          href="/shop"
          className="underline hover:text-yellow-300 transition-colors duration-300"
        >
          Shop Now
        </a>
      </span>
      <span className="ml-1 text-lg">→</span>
    </div>
  );
}
