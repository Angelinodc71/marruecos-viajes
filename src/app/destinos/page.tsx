"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, MapPin } from "lucide-react";
import { destinations, packs, stays, experiences } from "@/components/site/data";
import { PageHero } from "@/components/site/PageHero";
import { useFormatPrice } from "@/lib/format";

const DEST_TO_CITIES: Record<string, string[]> = {
  marrakech: ["Marrakech"],
  fez: ["Fez"],
  chefchaouen: ["Chefchaouen"],
  sahara: ["Merzouga"],
};
const DEST_EXP_SLUGS: Record<string, string[]> = {
  marrakech: ["hammam-spa", "clase-cocina", "tour-medina", "ruta-atlas"],
  fez: ["tour-medina-2"],
  chefchaouen: [],
  sahara: ["excursion-desierto"],
};

export default function DestinosPage() {
  const { t } = useTranslation();
  const formatPrice = useFormatPrice();
  const [active, setActive] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => { document.title = t("destinos.metaTitle"); }, [t]);

  useEffect(() => {
    if (active && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [active]);

  const filtered = useMemo(() => {
    if (!active) return null;
    const cities = DEST_TO_CITIES[active] ?? [];
    const expSlugs = DEST_EXP_SLUGS[active] ?? [];
    return {
      packs: packs.filter((p) => cities.includes(p.city)),
      stays: stays.filter((s) => cities.includes(s.city)),
      experiences: experiences.filter((e) => expSlugs.includes(e.slug)),
    };
  }, [active]);

  const activeDest = destinations.find((d) => d.slug === active);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("nav.inicio"), to: "/" }, { label: t("nav.destinos") }]}
        eyebrow={t("destinos.heroEyebrow")}
        title={t("destinos.heroTitle")}
        description={t("destinos.heroDesc")}
      />

      <section className="container-page py-8">
        <p className="text-center text-sm text-muted-foreground mb-6">{t("destinos.selectPrompt")}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => {
            const name = t(`destNames.${d.slug}` as const);
            const isActive = active === d.slug;
            return (
              <button
                key={d.slug}
                type="button"
                onClick={() => setActive(isActive ? null : d.slug)}
                aria-pressed={isActive}
                className={`group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft text-left transition-all duration-300 ${isActive ? "ring-2 ring-terracotta scale-[1.02] shadow-elegant" : "hover:shadow-elegant hover:-translate-y-1"}`}
              >
                <img
                  src={d.image}
                  alt={name}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                />
                <div className="absolute inset-0 gradient-card-overlay" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <h3 className="font-display text-2xl uppercase tracking-wider">{name}</h3>
                  <p className="text-xs text-cream/85 mt-1">{t(`destBlurb.${d.slug}` as const)}</p>
                </div>
                {isActive && (
                  <span className="absolute top-3 right-3 bg-terracotta text-terracotta-foreground text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full">●</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {filtered && activeDest && (
        <section ref={detailRef} className="container-page pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-soft">
            <header className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-terracotta">{t("destinos.heroEyebrow")}</p>
                <h2 className="font-display text-3xl md:text-4xl text-primary mt-1 inline-flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-terracotta" />
                  {t(`destNames.${activeDest.slug}` as const)}
                </h2>
              </div>
              <button onClick={() => setActive(null)} className="text-sm text-muted-foreground hover:text-terracotta transition">
                ✕ {t("cta.limpiar")}
              </button>
            </header>

            <DestSection title={t("destinos.packsHere")} viewAll={t("destinos.viewAll")} viewAllTo="/packs" empty={t("destinos.noItems")} count={filtered.packs.length}>
              {filtered.packs.map((p) => (
                <Link key={p.slug} href={`/packs/${p.slug}`} className="group block rounded-xl overflow-hidden bg-background border border-border shadow-soft hover:shadow-elegant transition">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={t(`packCatalog.${p.slug}.name`)} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display text-lg text-primary">{t(`packCatalog.${p.slug}.name`)}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.duration}</p>
                    <div className="mt-2 flex items-center justify-end">
                      <span className="font-display text-lg text-terracotta">{formatPrice(p.price)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </DestSection>

            <DestSection title={t("destinos.staysHere")} viewAll={t("destinos.viewAll")} viewAllTo="/alojamientos" empty={t("destinos.noItems")} count={filtered.stays.length}>
              {filtered.stays.map((s) => (
                <Link key={s.slug} href={`/alojamientos/${s.slug}`} className="group block rounded-xl overflow-hidden bg-background border border-border shadow-soft hover:shadow-elegant transition">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={s.image} alt={t(`stayCatalog.${s.slug}.name`)} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display text-lg text-primary">{t(`stayCatalog.${s.slug}.name`)}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{t(`stayType.${s.type}` as const)}</p>
                    <div className="mt-2 flex items-center justify-end">
                      <span className="font-display text-lg text-terracotta">
                        {formatPrice(s.price)}<span className="text-xs text-muted-foreground">{t("stays.perNight")}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </DestSection>

            <DestSection title={t("destinos.expsHere")} viewAll={t("destinos.viewAll")} viewAllTo="/experiencias" empty={t("destinos.noItems")} count={filtered.experiences.length} last>
              {filtered.experiences.map((e) => (
                <Link key={e.slug} href={`/experiencias/${e.slug}`} className="group block rounded-xl overflow-hidden bg-background border border-border shadow-soft hover:shadow-elegant transition">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={e.image} alt={t(`expCatalog.${e.slug}.name`)} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-display text-lg text-primary">{t(`expCatalog.${e.slug}.name`)}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.duration}</p>
                    <div className="mt-2 flex items-center justify-end">
                      <span className="font-display text-lg text-terracotta">{formatPrice(e.price)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </DestSection>
          </div>
        </section>
      )}
    </>
  );
}

function DestSection({
  title, viewAll, viewAllTo, empty, count, children, last,
}: {
  title: string; viewAll: string; viewAllTo: string; empty: string; count: number; children: React.ReactNode; last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-10 pb-10 border-b border-border"}>
      <div className="flex items-end justify-between mb-5">
        <h3 className="font-display text-xl md:text-2xl text-primary">{title}</h3>
        <Link href={viewAllTo} className="text-sm text-terracotta hover:brightness-110 inline-flex items-center gap-1">
          {viewAll} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {count === 0 ? (
        <p className="text-sm text-muted-foreground italic">{empty}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
      )}
    </div>
  );
}
