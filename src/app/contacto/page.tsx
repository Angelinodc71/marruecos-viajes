"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export default function ContactoPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  useEffect(() => { document.title = t("contact.metaTitle"); }, [t]);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("nav.inicio"), to: "/" }, { label: t("nav.contacto") }]}
        eyebrow={t("contact.heroEyebrow")}
        title={t("contact.heroTitle")}
        description={t("contact.heroDesc")}
      />

      <section className="container-page pb-16 grid lg:grid-cols-[1.3fr_1fr] gap-10">
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label={t("contact.name")}><input required className="input" placeholder={t("contact.namePh")} /></Field>
            <Field label={t("contact.email")}><input required type="email" className="input" placeholder="email@..." /></Field>
            <Field label={t("contact.phone")}><input className="input" placeholder="+34 ..." /></Field>
            <Field label={t("contact.people")}>
              <select className="input"><option>1</option><option>2</option><option>3</option><option>4+</option></select>
            </Field>
            <Field label={t("contact.dateOut")}><input type="date" className="input" /></Field>
            <Field label={t("contact.dateBack")}><input type="date" className="input" /></Field>
          </div>
          <Field label={t("contact.tripType")}>
            <select className="input">
              <option>{t("contact.t1")}</option>
              <option>{t("contact.t2")}</option>
              <option>{t("contact.t3")}</option>
              <option>{t("contact.t4")}</option>
            </select>
          </Field>
          <Field label={t("contact.prefs")}>
            <textarea rows={5} className="input min-h-[120px]" placeholder={t("contact.prefsPh")} />
          </Field>
          <button className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-terracotta px-8 text-sm font-medium text-terracotta-foreground hover:brightness-110 shadow-soft">
            <Send className="h-4 w-4" /> {t("cta.enviar")}
          </button>
          {sent && <p className="text-sm text-terracotta">{t("contact.thanks")}</p>}
          <style>{`.input{height:44px;width:100%;border-radius:0.5rem;border:1px solid var(--input);background:var(--background);padding:0 0.75rem;font-size:0.875rem;outline:none}.input:focus{border-color:var(--terracotta)}textarea.input{height:auto;padding:0.75rem}`}</style>
        </form>

        <aside className="space-y-5">
          <InfoCard icon={<Mail className="h-5 w-5" />} title={t("contact.email")} lines={["hola@marruecosviajes.com"]} />
          <InfoCard icon={<Phone className="h-5 w-5" />} title={`${t("contact.phone")} / WhatsApp`} lines={["+212 600 123 456"]} />
          <InfoCard icon={<MapPin className="h-5 w-5" />} title={t("contact.office")} lines={["Marrakech, Marruecos"]} />
          <InfoCard icon={<Clock className="h-5 w-5" />} title={t("contact.hours")} lines={[t("contact.hoursVal1"), t("contact.hoursVal2")]} />
          <div className="rounded-2xl overflow-hidden border border-border aspect-[4/3] bg-secondary grid place-items-center text-muted-foreground text-sm relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.62_0.165_45/0.15),transparent),radial-gradient(circle_at_70%_30%,oklch(0.28_0.045_155/0.15),transparent)]" />
            <div className="relative flex flex-col items-center gap-2">
              <MapPin className="h-7 w-7 text-terracotta" />
              <span>{t("contact.mapLabel")}</span>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex items-start gap-4">
      <div className="h-11 w-11 grid place-items-center rounded-full bg-terracotta/10 text-terracotta shrink-0">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
        {lines.map((l) => <p key={l} className="text-sm font-medium mt-0.5">{l}</p>)}
      </div>
    </div>
  );
}
