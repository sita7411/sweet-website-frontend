import { ArrowRight } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-[var(--secondary)] text-white py-2 font-medium text-xs sm:text-sm tracking-wide flex justify-center items-center gap-2">
      <span>
        Made with ❤️ & Natural Ingredients{" "}
        <a
          href="/about"
          className="underline hover:text-yellow-300 transition-colors duration-300"
        >
          Learn More
        </a>
      </span>
      <ArrowRight className="ml-1 w-4 h-4 text-white" />
    </div>
  );
}
