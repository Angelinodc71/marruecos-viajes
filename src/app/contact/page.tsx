"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { useBookingStore } from "@/lib/booking-store";
import { toInputValue } from "@/hooks/useDate";

export default function ContactoPage() {
  const { t, i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage ?? "es") as string;

  const { people: storedPeople, date: storedDate, itemName, itemType, clear } = useBookingStore();

  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState(storedPeople || "1");
  const [dateOut, setDateOut] = useState<Date | null>(storedDate ? new Date(storedDate) : null);
  const [dateBack, setDateBack] = useState<Date | null>(null);
  const [tripType, setTripType] = useState(() => {
    if (itemType === "pack") return "t1";
    if (itemType === "stay") return "t2";
    if (itemType === "experience") return "t3";
    return "t1";
  });
  const [prefs, setPrefs] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const tripLabels: Record<string, string> = {
      t1: t("contact.t1"),
      t2: t("contact.t2"),
      t3: t("contact.t3"),
      t4: t("contact.t4"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          people,
          dateOut: dateOut ? toInputValue(dateOut) : null,
          dateBack: dateBack ? toInputValue(dateBack) : null,
          tripType: tripLabels[tripType],
          prefs,
          itemName,
        }),
      });

      if (res.status === 429) {
        setError(true);
        return;
      }

      if (!res.ok) throw new Error();
      setSent(true);
      clear();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const tripOptions = [
    { value: "t1", label: t("contact.t1") },
    { value: "t2", label: t("contact.t2") },
    { value: "t3", label: t("contact.t3") },
    { value: "t4", label: t("contact.t4") },
  ];

  const peopleOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4+" },
  ];

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
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft space-y-5"
        >
          {/* Item summary banner */}
          {itemName && !sent && (
            <div className="rounded-xl border border-terracotta/25 bg-terracotta/5 px-4 py-3 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-terracotta shrink-0" />
              <p className="text-sm text-foreground">
                <span className="text-muted-foreground">{t("contact.tripType")}: </span>
                <span className="font-semibold">{itemName}</span>
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label={t("contact.name")}>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field-input"
                placeholder={t("contact.namePh")}
              />
            </Field>
            <Field label={t("contact.email")}>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input"
                placeholder="email@..."
              />
            </Field>
            <Field label={t("contact.phone")}>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="field-input"
                placeholder="+34 ..."
              />
            </Field>
            <Field label={t("contact.people")}>
              <CustomSelect
                value={people}
                onChange={setPeople}
                options={peopleOptions}
              />
            </Field>
            <Field label={t("contact.dateOut")}>
              <CustomDatePicker
                value={dateOut}
                onChange={setDateOut}
                minDate={new Date()}
                lng={lng}
              />
            </Field>
            <Field label={t("contact.dateBack")}>
              <CustomDatePicker
                value={dateBack}
                onChange={setDateBack}
                minDate={dateOut ?? new Date()}
                lng={lng}
              />
            </Field>
          </div>

          <Field label={t("contact.tripType")}>
            <CustomSelect
              value={tripType}
              onChange={setTripType}
              options={tripOptions}
            />
          </Field>

          <Field label={t("contact.prefs")}>
            <textarea
              rows={5}
              value={prefs}
              onChange={(e) => setPrefs(e.target.value)}
              className="field-input"
              style={{ height: "auto", paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
              placeholder={t("contact.prefsPh")}
            />
          </Field>

          <button type="submit" disabled={loading} className="btn-primary h-12 px-8 w-full sm:w-auto">
            <Send className="h-4 w-4" />
            {loading ? "..." : t("cta.enviar")}
          </button>

          {error && (
            <p className="text-sm font-medium text-red-500 animate-fade-up">
              {t("contact.errorMessage")}
            </p>
          )}

          {sent && (
            <p className="text-sm font-medium text-terracotta animate-fade-up">
              {t("contact.thanks")}
            </p>
          )}
        </form>

        <aside className="space-y-5">
          <InfoCard
            icon={<Mail className="h-5 w-5" />}
            title={t("contact.email")}
            lines={["hola@marruecosviajes.com"]}
          />
          <InfoCard
            icon={<Phone className="h-5 w-5" />}
            title={`${t("contact.phone")} / WhatsApp`}
            lines={["+212 600 123 456"]}
          />
          <InfoCard
            icon={<MapPin className="h-5 w-5" />}
            title={t("contact.office")}
            lines={["Marrakech, Marruecos"]}
          />
          <InfoCard
            icon={<Clock className="h-5 w-5" />}
            title={t("contact.hours")}
            lines={[t("contact.hoursVal1"), t("contact.hoursVal2")]}
          />
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
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex items-start gap-4">
      <div className="h-11 w-11 grid place-items-center rounded-full bg-terracotta/10 text-terracotta shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm font-medium mt-0.5">{l}</p>
        ))}
      </div>
    </div>
  );
}