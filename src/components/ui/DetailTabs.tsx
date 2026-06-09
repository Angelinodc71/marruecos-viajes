"use client";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type DetailTab = {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
};

export function DetailTabs({ sections }: { sections: DetailTab[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const active = useMemo(
    () => sections.find((s) => s.id === activeId) ?? sections[0],
    [activeId, sections]
  );

  const checkScroll = () => {
    const el = tabsRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 4);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const t = setTimeout(checkScroll, 60);
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [sections]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const container = tabsRef.current;
      const tab = tabRefs.current.get(activeId);
      if (!tab || !container) return;

      // Enough to show icon + a few chars of adjacent tab
      const peek = 72;
      const tabLeft = tab.offsetLeft;
      const tabRight = tabLeft + tab.offsetWidth;
      const visibleLeft = container.scrollLeft;
      const visibleRight = visibleLeft + container.clientWidth;

      let targetScroll: number | null = null;

      if (tabLeft - peek < visibleLeft) {
        targetScroll = tabLeft - peek;
      } else if (tabRight + peek > visibleRight) {
        targetScroll = tabRight + peek - container.clientWidth;
      }

      if (targetScroll !== null) {
        container.scrollTo({ left: Math.max(0, targetScroll), behavior: "smooth" });
      }
    });
  }, [activeId]);

  if (!active) return null;

  return (
    <div className="mt-8">
      <div className="relative border-b border-border">
        {/* Left fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-px w-12 z-10 transition-opacity duration-300"
          style={{
            opacity: showLeft ? 1 : 0,
            background: "linear-gradient(to right, var(--background) 40%, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-px w-12 z-10 transition-opacity duration-300"
          style={{
            opacity: showRight ? 1 : 0,
            background: "linear-gradient(to left, var(--background) 40%, transparent)",
          }}
        />

        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Detalle"
          className="flex overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sections.map((section) => {
            const selected = section.id === active.id;
            return (
              <button
                key={section.id}
                ref={(el) => {
                  if (el) tabRefs.current.set(section.id, el);
                  else tabRefs.current.delete(section.id);
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${section.id}-panel`}
                onClick={() => setActiveId(section.id)}
                className={`
                  inline-flex shrink-0 items-center gap-1.5 px-4 h-12
                  text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap
                  ${selected
                    ? "border-terracotta text-terracotta"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }
                `}
              >
                {section.icon && (
                  <span className={`transition-colors ${selected ? "text-terracotta" : "text-muted-foreground"}`}>
                    {section.icon}
                  </span>
                )}
                {section.label}
              </button>
            );
          })}
          {/* Spacer so last tab never sits flush against the edge */}
          <div className="shrink-0 w-8" aria-hidden />
        </div>
      </div>

      <div
        id={`${active.id}-panel`}
        role="tabpanel"
        key={active.id}
        className="pt-6 animate-fade-up"
      >
        {active.content}
      </div>
    </div>
  );
}