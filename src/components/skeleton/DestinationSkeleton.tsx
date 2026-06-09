export function DestinationSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[0, 80, 160, 240].map((delay) => (
        <div
          key={delay}
          className="relative aspect-[3/4] overflow-hidden rounded-2xl"
          style={{ animationDelay: `${delay}ms` }}
        >
          {/* Base */}
          <div className="absolute inset-0 bg-secondary" />

          {/* Shimmer */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                105deg,
                transparent 30%,
                color-mix(in oklab, var(--gold) 18%, transparent) 50%,
                transparent 70%
              )`,
              backgroundSize: "200% 100%",
              animation: `skeleton-shimmer 1.8s ease-in-out ${delay}ms infinite`,
            }}
          />

          {/* Simulación del texto en la parte inferior */}
          <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
            <div
              className="h-6 w-3/4 rounded-md"
              style={{ background: "color-mix(in oklab, var(--primary) 15%, transparent)" }}
            />
            <div
              className="h-3 w-1/2 rounded-md"
              style={{ background: "color-mix(in oklab, var(--primary) 10%, transparent)" }}
            />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes skeleton-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
