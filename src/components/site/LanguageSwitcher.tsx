"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";

const LANGS = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = mounted
    ? (LANGS.find((l) => l.code === i18n.resolvedLanguage) ?? LANGS[0])
    : LANGS[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 h-9 text-xs font-medium text-foreground/80 hover:border-terracotta hover:text-terracotta transition"
        aria-label="Cambiar idioma"
        suppressHydrationWarning
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="uppercase" suppressHydrationWarning>
          {mounted ? current.code : "es"}
        </span>
      </button>
      {open && mounted && (
        <div className="absolute right-0 mt-2 w-44 rounded-md border border-border bg-popover shadow-elegant overflow-hidden z-50">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => { i18n.changeLanguage(l.code); setOpen(false); }}
              className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <span>{l.flag}</span>
                {l.label}
              </span>
              {l.code === current.code && <Check className="h-4 w-4 text-terracotta" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}