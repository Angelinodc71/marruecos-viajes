"use client";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import { stays, experiences } from "@/components/site/data";
import { DetailTabs } from "@/components/site/DetailTabs";
import { ImageGallery } from "@/components/site/ImageGallery";
import { ShareButton } from "@/components/site/ShareButton";
import { CustomSelect } from "@/components/site/CustomSelect";
import { CustomDatePicker } from "@/components/site/CustomDatePicker";
import { HammamIcon, LanternIcon, ShieldKeyIcon, StarTileIcon, TagineIcon } from "@/components/site/icons";
import { useFormatPrice } from "@/lib/format";
import { useBookingStore } from "@/lib/booking-store";

export default function StayDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const stay = stays.find((s) => s.slug === slug);
  if (!stay) notFound();

  const { t, i18n } = useTranslation();
  const formatPrice = useFormatPrice();
  const lng = (i18n.resolvedLanguage ?? "es") as string;
  const name = t(`stayCatalog.${stay.slug}.name`);
  const others = experiences.slice(0, 3);

  const { people, date, update } = useBookingStore();
  const dateValue = date ? new Date(date) : null;

  const tabSections = [
    {
      id: "descripcion",
      label: t("detail.description"),
      icon: <LanternIcon className="h-5 w-5" />,
      content: (
        <div className="space-y-4 text-foreground/90 leading-relaxed">
          <p>{t("detail.stayDesc1", { type: t(`stayType.${stay.type}` as const).toLowerCase() })}</p>
          <p>{t("detail.stayDesc2")}</p>
        </div>
      ),
    },
    {
      id: "incluye",
      label: t("detail.includes"),
      icon: <ShieldKeyIcon className="h-5 w-5" />,
      content: (
        <ul className="grid sm:grid-cols-2 gap-3">
          {[t("detail.stayInc1"), t("detail.stayInc2"), t("detail.stayInc3"), t("detail.stayInc4")].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <StarTileIcon className="h-4 w-4 text-terracotta shrink-0" /> {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "comodidades",
      label: t("detail.amenities"),
      icon: <HammamIcon className="h-5 w-5" />,
      content: (
        <div className="flex flex-wrap gap-2">
          {stay.amenities.map((amenity) => (
            <span key={amenity} className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
              <TagineIcon className="h-4 w-4 text-terracotta" /> {t(`amenity.${amenity}` as const, { defaultValue: amenity })}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "ubicacion",
      label: t("detail.location"),
      icon: <MapPin className="h-5 w-5" />,
      content: (
        <p className="text-foreground/90 leading-relaxed">
          {t("detail.stayLocation", { city: t(`city.${stay.city}` as const, { defaultValue: stay.city }) })}
        </p>
      ),
    },
  ];

  
  useEffect(() => {
    update({ itemName: name, itemType: "stay", staySlug: stay.slug });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stay.slug]);

  return (
    <>
      <section className="container-page pt-8 pb-4">
        <nav className="breadcrumb mb-3">
          <span className="inline-flex items-center gap-1.5">
            <Link href="/">{t("nav.inicio")}</Link>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" style={{ color: "var(--border)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            <Link href="/accommodations">{t("nav.alojamientos")}</Link>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" style={{ color: "var(--border)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            <span className="breadcrumb-current">{name}</span>
          </span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl text-primary animate-fade-up">{name}</h1>
        <p className="mt-2 text-muted-foreground inline-flex items-center gap-1.5 animate-fade-up delay-100">
          <MapPin className="h-4 w-4" /> {t(`city.${stay.city}` as const, { defaultValue: stay.city })}
        </p>
      </section>

      <ImageGallery images={stay.gallery} title={name} />

      <section className="container-page grid lg:grid-cols-[1.4fr_1fr] gap-8 py-12">
        <div className="min-w-0 overflow-hidden">
          <DetailTabs sections={tabSections} />

          <div className="mt-10">
            <h2 className="font-display text-2xl text-primary mb-4">{t("detail.others")}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map((e) => {
                const eName = t(`expCatalog.${e.slug}.name`);
                return (
                  <Link href={`/experiences/${e.slug}`} key={e.slug} className="rounded-xl overflow-hidden border border-border bg-card hover:shadow-soft transition">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img src={e.image} alt={eName} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm">{eName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t("detail.from")} {formatPrice(e.price)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start w-full min-w-0">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
            <p className="font-display text-4xl text-terracotta leading-none">{formatPrice(stay.price)}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("detail.perNight")}</p>

            <div className="mt-5 space-y-4">
              <CustomSelect
                label={t("detail.people")}
                value={people}
                onChange={(v) => update({ people: v })}
                options={[
                  { value: "1", label: t("detail.p1") },
                  { value: "2", label: t("detail.p2") },
                  { value: "3", label: t("detail.p3") },
                  { value: "4", label: t("detail.p4") },
                ]}
              />
              <CustomDatePicker
                label={t("detail.date")}
                value={dateValue}
                onChange={(d) => update({ date: d.toISOString() })}
                minDate={new Date()}
                lng={lng}
              />
            </div>

            <Link href="/contact" className="btn-primary mt-5 w-full h-12 rounded-lg text-base font-semibold">
              {t("cta.reservar")}
            </Link>
            <ShareButton title={name} />
          </div>
        </aside>
      </section>
    </>
  );
}