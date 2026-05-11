"use client";
import { useMemo, useState, type ReactNode } from "react";

export type DetailTab = {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
};

export function DetailTabs({ sections }: { sections: DetailTab[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  const active = useMemo(
    () => sections.find((s) => s.id === activeId) ?? sections[0],
    [activeId, sections],
  );

  if (!active) return null;

  return (
    <div className="mt-8">
      <div role="tablist" aria-label="Detalle" className="flex gap-2 overflow-x-auto border-b border-border pb-px">
        {sections.map((section) => {
          const selected = section.id === active.id;
          return (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${section.id}-panel`}
              onClick={() => setActiveId(section.id)}
              className={`inline-flex h-12 shrink-0 items-center gap-2 border-b-2 px-3 text-sm font-medium transition ${selected ? "border-terracotta text-terracotta" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {section.icon}
              {section.label}
            </button>
          );
        })}
      </div>
      <div id={`${active.id}-panel`} role="tabpanel" className="pt-6">
        {active.content}
      </div>
    </div>
  );
}
