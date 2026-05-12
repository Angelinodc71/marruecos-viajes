"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const MONTHS_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const DAYS_ES = ["L","M","X","J","V","S","D"];
const DAYS_EN = ["M","T","W","T","F","S","S"];
const DAYS_FR = ["L","M","M","J","V","S","D"];

function getMonths(lng: string) {
  if (lng === "en") return MONTHS_EN;
  if (lng === "fr") return MONTHS_FR;
  return MONTHS_ES;
}
function getDays(lng: string) {
  if (lng === "en") return DAYS_EN;
  if (lng === "fr") return DAYS_FR;
  return DAYS_ES;
}
function formatDate(date: Date, lng: string) {
  const months = getMonths(lng);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

// Formatea Date a "YYYY-MM-DD" en hora local (sin desfase UTC)
export function toInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Parsea "YYYY-MM-DD" a Date local (sin desfase UTC)
function parseLocalDate(str: string): Date {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function CustomDatePicker({
  value,
  onChange,
  label,
  minDate,
  lng = "es",
  icon,
  variant = "default",
}: {
  value: Date | null;
  onChange: (d: Date) => void;
  label?: string;
  minDate?: Date;
  lng?: string;
  icon?: React.ReactNode;
  variant?: "default" | "hero";
}) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [view, setView] = useState(() => {
    const d = value ?? new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const months = getMonths(lng);
  const days = getDays(lng);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = minDate
    ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
    : today;

  const isMobile = useIsMobile();

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
      setDropUp(spaceBelow < 340);
    }
    setOpen((o) => !o);
  };

  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    onChange(parseLocalDate(e.target.value));
  };

  const prevMonth = () => setView((v) => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
  const nextMonth = () => setView((v) => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

  const daysInMonth = getDaysInMonth(view.year, view.month);
  const firstDay = getFirstDayOfMonth(view.year, view.month);
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);
  while (cells.length % 7 !== 0) cells.push(null);

  const isSelected = (day: number) => value?.getFullYear() === view.year && value?.getMonth() === view.month && value?.getDate() === day;
  const isDisabled = (day: number) => new Date(view.year, view.month, day) < min;
  const isToday = (day: number) => new Date(view.year, view.month, day).toDateString() === today.toDateString();

  const calendarPanel = (
    <div className={`absolute z-50 w-72 rounded-2xl border border-border bg-card shadow-elegant p-4 animate-scale-in ${dropUp ? "bottom-full mb-1.5" : "top-full mt-1.5"}`}>
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold">{months[view.month]} {view.year}</span>
        <button type="button" onClick={nextMonth} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {days.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const selected = isSelected(day);
          const disabled = isDisabled(day);
          const tod = isToday(day);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => { onChange(new Date(view.year, view.month, day)); setOpen(false); }}
              className={`h-8 w-full rounded-lg text-sm transition-all
                ${selected ? "bg-terracotta text-terracotta-foreground font-semibold shadow-soft" : ""}
                ${!selected && !disabled ? "hover:bg-accent text-foreground" : ""}
                ${disabled ? "text-muted-foreground/40 cursor-not-allowed" : "cursor-pointer"}
                ${tod && !selected ? "font-semibold text-terracotta" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
        <button
          type="button"
          onClick={() => { onChange(new Date(today.getFullYear(), today.getMonth(), today.getDate())); setView({ year: today.getFullYear(), month: today.getMonth() }); setOpen(false); }}
          className="text-xs text-terracotta font-medium hover:brightness-110"
        >
          {lng === "en" ? "Today" : lng === "fr" ? "Aujourd'hui" : "Hoy"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-muted-foreground hover:text-foreground">
          {lng === "en" ? "Close" : lng === "fr" ? "Fermer" : "Cerrar"}
        </button>
      </div>
    </div>
  );

  // ── HERO variant ────────────────────────────────────────────────────────────
  if (variant === "hero") {
    if (isMobile) {
      return (
        <div className="flex items-center gap-3 rounded-xl bg-background border border-border px-4 py-2.5 h-full min-h-[56px]">
          {icon && <span className="text-terracotta shrink-0 flex items-center">{icon}</span>}
          <div className="flex flex-col flex-1 min-w-0 justify-center">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold leading-none mb-0.5">
              {label}
            </span>
            <input
              type="date"
              value={value ? toInputValue(value) : ""}
              min={toInputValue(min)}
              onChange={handleNativeChange}
              className="w-full bg-transparent text-sm text-foreground outline-none appearance-none focus:outline-none focus:ring-0 [color-scheme:light] p-0 border-0"
            />
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className="relative w-full">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleOpen}
          className="w-full flex items-center gap-3 rounded-xl bg-background border border-border px-4 py-2.5 hover:border-terracotta/60 transition text-left"
        >
          {icon && <span className="text-terracotta shrink-0">{icon}</span>}
          <span className="flex-1 min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              {label}
            </span>
            <span className={`block text-sm truncate ${value ? "text-foreground" : "text-muted-foreground"}`}>
              {value ? formatDate(value, lng) : label ?? "Selecciona fecha"}
            </span>
          </span>
          <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
        </button>
        {open && calendarPanel}
      </div>
    );
  }

  // ── DEFAULT variant ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="w-full">
        {label && <span className="field-label">{label}</span>}
        <div className="flex items-center gap-2.5 h-11 rounded-xl border-[1.5px] border-border bg-card px-3.5">
          <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="date"
            value={value ? toInputValue(value) : ""}
            min={toInputValue(min)}
            onChange={handleNativeChange}
            className="w-full bg-transparent text-sm text-foreground outline-none appearance-none focus:outline-none focus:ring-0 [color-scheme:light] p-0 border-0"
          />
        </div>
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
        className="w-full h-11 rounded-xl border-[1.5px] border-border bg-card px-3.5 text-sm text-left flex items-center gap-2.5 transition-all hover:border-terracotta/60 focus:outline-none focus:border-terracotta"
      >
        <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value ? formatDate(value, lng) : label ?? "Selecciona fecha"}
        </span>
      </button>
      {open && calendarPanel}
    </div>
  );
}