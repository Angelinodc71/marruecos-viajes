"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const nav = [
    { to: "/destinos", label: t("nav.destinos") },
    { to: "/packs", label: t("nav.packs") },
    { to: "/alojamientos", label: t("nav.alojamientos") },
    { to: "/experiencias", label: t("nav.experiencias") },
    { to: "/sobre-nosotros", label: t("nav.sobre") },
    { to: "/contacto", label: t("nav.contacto") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" className="shrink-0 transition-transform duration-300 hover:scale-105">
          <Logo />
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <Link
              key={n.to}
              href={n.to}
              className="link-underline relative text-sm font-medium text-foreground/80 transition-colors hover:text-terracotta"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+212600123456" className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Phone className="h-3.5 w-3.5" />
            +212 600 123 456
          </a>
          <LanguageSwitcher />
          <Link href="/contacto" className="inline-flex h-10 items-center rounded-md bg-terracotta px-5 text-sm font-medium text-terracotta-foreground transition-all hover:brightness-110 hover:-translate-y-0.5 shadow-soft">
            {t("cta.reservar")}
          </Link>
        </div>
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            aria-label="Menú"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-slide-down">
          <nav className="container-page flex flex-col py-4">
            {nav.map((n, i) => (
              <Link
                key={n.to}
                href={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-foreground/80 hover:text-terracotta animate-fade-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
              <a href="tel:+212600123456" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-terracotta transition-colors">
                <Phone className="h-4 w-4" />
                +212 600 123 456
              </a>
              <LanguageSwitcher />
            </div>
            <Link href="/contacto" onClick={() => setOpen(false)} className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-terracotta px-5 text-sm font-medium text-terracotta-foreground hover:brightness-110 transition">
              {t("cta.reservar")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
