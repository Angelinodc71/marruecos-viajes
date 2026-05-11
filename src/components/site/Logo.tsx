export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 leading-none">
      <svg width="34" height="38" viewBox="0 0 34 38" fill="none" aria-hidden>
        <path d="M3 36 V18 C3 9.7 9.3 3 17 3 C24.7 3 31 9.7 31 18 V36" stroke={light ? "currentColor" : "var(--terracotta)"} strokeWidth="1.6" fill="none" />
        <path d="M11 36 V20 C11 16.7 13.7 14 17 14 C20.3 14 23 16.7 23 20 V36" stroke={light ? "currentColor" : "var(--primary)"} strokeWidth="1.6" fill="none" />
        <path d="M15 14 C15 12 16 10 17 9 C18 10 19 12 19 14" stroke={light ? "currentColor" : "var(--primary)"} strokeWidth="1.6" fill="none" />
        <path d="M17 9 V5" stroke={light ? "currentColor" : "var(--terracotta)"} strokeWidth="1.6" />
        <circle cx="17" cy="4" r="1" fill={light ? "currentColor" : "var(--terracotta)"} />
      </svg>
      <div className="flex flex-col">
        <span className={`font-display text-lg font-semibold tracking-[0.08em] ${light ? "text-cream" : "text-primary"}`} style={{ lineHeight: 1 }}>
          MARRUECOS
        </span>
        <span className={`text-[9px] uppercase tracking-[0.28em] italic ${light ? "text-cream/80" : "text-terracotta"}`} style={{ lineHeight: 1, marginTop: 3, fontFamily: "var(--font-display)" }}>
          Viajes Auténticos
        </span>
      </div>
    </div>
  );
}
