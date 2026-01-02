import { useEffect, useRef } from "react";

export default function TopBar() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    let animationFrame;

    const scroll = () => {
      if (el) {
        el.scrollLeft += 1; // scroll speed
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0; // loop
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="w-full bg-[var(--secondary)] text-white overflow-hidden">
      <div
        ref={scrollRef}
        className="inline-block whitespace-nowrap py-2 px-4 font-medium tracking-wide text-xs sm:text-sm"
      >
        Free Shipping on Orders Above ₹999 &nbsp;|&nbsp; Handcrafted with Love ❤️ &nbsp;|&nbsp; Exclusive Offers Available Now &nbsp;|&nbsp; Shop the Best Deals Online &nbsp;|&nbsp;
      </div>
    </div>
  );
}
