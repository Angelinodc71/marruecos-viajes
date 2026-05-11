"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { Facebook, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="relative bg-primary text-primary-foreground">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <p className="font-display text-xl md:text-2xl">{t("footer.tagline")}</p>
          <Link href="/contacto" className="inline-flex h-11 items-center rounded-md bg-terracotta px-6 text-sm font-medium text-terracotta-foreground hover:brightness-110">
            {t("cta.planificar")}
          </Link>
        </div>
      </div>

      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-xs">{t("footer.about")}</p>
          <div className="flex gap-3 pt-2">
            <a aria-label="Instagram" href="#" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:border-terracotta hover:text-terracotta transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a aria-label="Facebook" href="#" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:border-terracotta hover:text-terracotta transition">
              <Facebook className="h-4 w-4" />
            </a>
            <a aria-label="Email" href="mailto:hola@marruecosviajes.com" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:border-terracotta hover:text-terracotta transition">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-terracotta mb-4">{t("footer.destinos")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/destinos" className="hover:text-terracotta">{t("destNames.marrakech")}</Link></li>
            <li><Link href="/destinos" className="hover:text-terracotta">{t("destNames.fez")}</Link></li>
            <li><Link href="/destinos" className="hover:text-terracotta">{t("destNames.chefchaouen")}</Link></li>
            <li><Link href="/destinos" className="hover:text-terracotta">{t("destNames.sahara")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-terracotta mb-4">{t("footer.paginas")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/packs" className="hover:text-terracotta">{t("nav.packs")}</Link></li>
            <li><Link href="/alojamientos" className="hover:text-terracotta">{t("nav.alojamientos")}</Link></li>
            <li><Link href="/experiencias" className="hover:text-terracotta">{t("nav.experiencias")}</Link></li>
            <li><Link href="/sobre-nosotros" className="hover:text-terracotta">{t("nav.sobre")}</Link></li>
            <li><Link href="/contacto" className="hover:text-terracotta">{t("nav.contacto")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-terracotta mb-4">{t("footer.boletin")}</h4>
          <p className="text-sm text-muted-foreground mb-3">{t("footer.boletinText")}</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t("footer.emailPh")} className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-terracotta" />
            <button className="h-10 w-10 grid place-items-center rounded-md bg-terracotta text-terracotta-foreground hover:brightness-110">
              <Send className="h-4 w-4" />
            </button>
          </form>
          <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +212 600 123 456</li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> hola@marruecosviajes.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Marrakech, Marruecos</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-xs text-muted-foreground">
          <p>{t("footer.rights")}</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-foreground">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
