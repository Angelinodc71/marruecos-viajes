"use client";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

export function CustomSelect({
  options,
  value,
  onChange,
  label,
  icon,
  placeholder,
  variant = "default",
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  variant?: "default" | "hero";
}) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const current = options.find((o) => o.value === value) ?? options[0];
  const isPlaceholder = !value || value === options[0]?.value;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = Math.min(options.length * 44, 220);
      setDropUp(spaceBelow < menuHeight + 12);
    }
    setOpen((o) => !o);
  };
  

  if (variant === "hero") {
    return (
      <div ref={ref} className="relative w-full">
        {/* Versión móvil: select nativo estilado */}
        <div className="md:hidden flex items-center gap-3 rounded-xl bg-background border border-border px-4 py-2.5">
          {icon && <span className="text-terracotta shrink-0">{icon}</span>}
          <span className="flex-1 min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              {label}
            </span>
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none appearance-none focus:outline-none focus:ring-0"
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </span>
        </div>

        <button
          ref={buttonRef}
          type="button"
          onClick={handleOpen}
          className="hidden md:flex w-full items-center gap-3 rounded-xl bg-background border border-border px-4 py-2.5 hover:border-terracotta/60 transition text-left"
        >
          {icon && <span className="text-terracotta shrink-0">{icon}</span>}
          <span className="flex-1 min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              {label}
            </span>
            <span className={`block text-sm truncate ${isPlaceholder ? "text-muted-foreground" : "text-foreground"}`}>
              {current?.label}
            </span>
          </span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className={`hidden md:block absolute z-50 w-full rounded-xl border border-border bg-card shadow-elegant overflow-hidden animate-scale-in ${dropUp ? "bottom-full mb-1.5" : "top-full mt-1.5"}`}>
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-accent ${o.value === current?.value ? "text-terracotta font-medium bg-terracotta/5" : "text-foreground"}`}
              >
                {o.label}
                {o.value === current?.value && <Check className="h-3.5 w-3.5 text-terracotta shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative w-full">
      {label && <span className="field-label">{label}</span>}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className="w-full h-11 rounded-xl border-[1.5px] border-border bg-card px-3.5 text-sm text-left flex items-center justify-between gap-2 transition-all hover:border-terracotta/60 focus:outline-none focus:border-terracotta"
      >
        <span className="truncate text-foreground">{current?.label}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer md:hidden"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {open && (
        <div className={`hidden md:block absolute z-50 w-full rounded-xl border border-border bg-card shadow-elegant overflow-hidden animate-scale-in ${dropUp ? "bottom-full mb-1.5" : "top-full mt-1.5"}`}>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm transition-colors hover:bg-accent ${o.value === current?.value ? "text-terracotta font-medium bg-terracotta/5" : "text-foreground"}`}
            >
              {o.label}
              {o.value === current?.value && <Check className="h-3.5 w-3.5 text-terracotta shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}