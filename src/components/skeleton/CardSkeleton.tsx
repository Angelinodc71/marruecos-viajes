type Props = {
  count?: number;
  aspect?: "square" | "portrait" | "landscape";
  hasFooter?: boolean;
};

export function CardSkeleton({ count = 3, aspect = "landscape", hasFooter = true }: Props) {
  const aspectClass =
    aspect === "portrait" ? "aspect-[3/4]" :
    aspect === "square"   ? "aspect-square" :
    "aspect-[4/3]";

  const delays = Array.from({ length: count }, (_, i) => i * 80);

  return (
    <div className={`grid gap-5 ${
      count === 4 ? "sm:grid-cols-2 lg:grid-cols-4" :
      count === 3 ? "sm:grid-cols-2 lg:grid-cols-3" :
      "sm:grid-cols-2"
    }`}>
      {delays.map((delay) => (
        <div key={delay} className="rounded-xl overflow-hidden border border-border bg-card shadow-soft">
          <div className={`relative ${aspectClass} overflow-hidden`}>
            <div className="absolute inset-0 bg-secondary" />
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
          </div>

          {hasFooter && (
            <div className="p-4 space-y-2">
              <div
                className="h-5 w-3/4 rounded-md"
                style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
              />
              <div
                className="h-3 w-1/2 rounded-md"
                style={{ background: "color-mix(in oklab, var(--primary) 8%, transparent)" }}
              />
              <div className="flex justify-end pt-1">
                <div
                  className="h-6 w-16 rounded-md"
                  style={{ background: "color-mix(in oklab, var(--terracotta) 15%, transparent)" }}
                />
              </div>
            </div>
          )}
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