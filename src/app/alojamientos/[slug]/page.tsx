"use client";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin } from "lucide-react";
import { stays, experiences } from "@/components/site/data";
import { DetailTabs } from "@/components/site/DetailTabs";
import { ImageGallery } from "@/components/site/ImageGallery";
import { ShareButton } from "@/components/site/ShareButton";
import { HammamIcon, LanternIcon, ShieldKeyIcon, StarTileIcon, TagineIcon } from "@/components/site/icons";
import { useFormatPrice } from "@/lib/format";

export default function StayDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const stay = stays.find((s) => s.slug === slug);
  if (!stay) notFound();

  const { t } = useTranslation();
  const formatPrice = useFormatPrice();
  const name = t(`stayCatalog.${stay.slug}.name`);
  const others = experiences.slice(0, 3);

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
              <StarTileIcon className="h-4 w-4 text-terracotta" /> {item}
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
      content: <p className="text-foreground/90 leading-relaxed">{t("detail.stayLocation", { city: t(`city.${stay.city}` as const, { defaultValue: stay.city }) })}</p>,
    },
  ];

  return (
    <>
      <section className="container-page pt-8 pb-4">
        <nav className="text-xs text-muted-foreground mb-3">
          <Link href="/" className="hover:text-terracotta">{t("nav.inicio")}</Link> ›{" "}
          <Link href="/alojamientos" className="hover:text-terracotta">{t("nav.alojamientos")}</Link> ›{" "}
          <span className="text-foreground">{name}</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl text-primary animate-fade-up">{name}</h1>
        <p className="mt-2 text-muted-foreground inline-flex items-center gap-1.5 animate-fade-up delay-100">
          <MapPin className="h-4 w-4" /> {t(`city.${stay.city}` as const, { defaultValue: stay.city })}
        </p>
      </section>

      <ImageGallery images={stay.gallery} title={name} />

      <section className="container-page grid lg:grid-cols-[1.4fr_1fr] gap-10 py-12">
        <div>
          <DetailTabs sections={tabSections} />

          <div className="mt-10">
            <h2 className="font-display text-2xl text-primary mb-4">{t("detail.others")}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map((e) => {
                const eName = t(`expCatalog.${e.slug}.name`);
                return (
                  <Link href={`/experiencias/${e.slug}`} key={e.slug} className="rounded-xl overflow-hidden border border-border bg-card hover:shadow-soft transition">
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

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
            <p className="font-display text-4xl text-terracotta leading-none">{formatPrice(stay.price)}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("detail.perNight")}</p>

            <div className="mt-5 space-y-3">
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("detail.people")}</label>
              <select className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm">
                <option>{t("detail.p1")}</option>
                <option>{t("detail.p2")}</option>
                <option>{t("detail.p3")}</option>
                <option>{t("detail.p4")}</option>
              </select>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3">{t("detail.date")}</label>
              <div className="flex items-center gap-2 h-11 rounded-md border border-input bg-background px-3 text-sm focus-within:border-terracotta">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <input type="date" min={new Date().toISOString().slice(0, 10)} className="flex-1 bg-transparent outline-none" aria-label={t("detail.date")} />
              </div>
            </div>

            <Link href="/contacto" className="mt-5 inline-flex w-full h-12 items-center justify-center rounded-md bg-terracotta text-sm font-medium text-terracotta-foreground transition-all hover:brightness-110 hover:-translate-y-0.5">
              {t("cta.reservar")}
            </Link>
            <ShareButton title={name} />
          </div>
        </aside>
      </section>
    </>
  );
}
