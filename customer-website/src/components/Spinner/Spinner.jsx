export default function DotLoader({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[rgba(255,250,243,0.7)] backdrop-blur-sm z-[999]">
      <div className="flex gap-2">
        <span className="h-3 w-3 rounded-full bg-[var(--primary)] animate-[bounce_0.6s_infinite]" />
        <span className="h-3 w-3 rounded-full bg-[var(--primary)] animate-[bounce_0.6s_0.2s_infinite]" />
        <span className="h-3 w-3 rounded-full bg-[var(--primary)] animate-[bounce_0.6s_0.4s_infinite]" />
      </div>

      <p className="mt-4 text-[var(--text-main)] font-medium tracking-wide">
        {message}
      </p>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: .7; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
