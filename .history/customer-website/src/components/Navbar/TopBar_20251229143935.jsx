export default function TopBar() {
  return (
    <div className="w-full bg-[var(--secondary)] text-white overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2 font-medium text-xs sm:text-sm">
        <span className="mr-12">
          Free Shipping on Orders Above ₹999 | Handcrafted with Love ❤️ | Exclusive Offers Available Now | Shop the Best Deals Online
        </span>
        <span className="mr-12">
          Free Shipping on Orders Above ₹999 | Handcrafted with Love ❤️ | Exclusive Offers Available Now | Shop the Best Deals Online
        </span>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
