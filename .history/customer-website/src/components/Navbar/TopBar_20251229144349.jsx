export default function TopBar() {
  return (
    <div className="w-full bg-[var(--secondary)] text-white text-center py-2 font-medium text-xs sm:text-sm tracking-wide flex justify-center items-center gap-2">
      <span>
        Made with Love & Natural Ingredients{" "}
        <a
          href="/about" 
          className="underline hover:text-yellow-300 transition-colors"
        >
          Learn More
        </a>
      </span>
      <span className="ml-2">→</span>
    </div>
  );
}
