"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, X } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { useFormatPrice } from "@/lib/format";
import { useStays } from "@/hooks/useStays";
import { CardSkeleton } from "@/components/skeleton/CardSkeleton";
import { CustomSelect } from "@/components/ui/CustomSelect";

function AlojamientosContent() {
  const { t } = useTranslation();
  const formatPrice = useFormatPrice();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: stays, loading } = useStays();

  const search = {
    city: searchParams.get("city") ?? "all",
    type: searchParams.get("type") ?? "all",
    maxPrice: Number(searchParams.get("maxPrice") ?? "300"),
  };

  const [draft, setDraft] = useState(search);
  useEffect(() => { document.title = t("stays.metaTitle"); }, [t]);

  const filtered = useMemo(() => stays.filter((s) => {
    if (search.city !== "all" && s.city !== search.city) return false;
    if (search.type !== "all" && s.type !== search.type) return false;
    if (s.price > search.maxPrice) return false;
    return true;
  }), [stays, search.city, search.type, search.maxPrice]);

  const buildUrl = (params: Record<string, string | number>) => {
    const p = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => p.set(k, String(v)));
    return `/accommodations?${p.toString()}`;
  };

  const apply = () => router.push(buildUrl(draft));
  const reset = () => {
    const def = { city: "all", type: "all", maxPrice: 300 };
    setDraft(def);
    router.push(buildUrl(def));
  };
  const hasFilters = search.city !== "all" || search.type !== "all" || search.maxPrice !== 300;
  const cities = [...new Set(stays.map((s) => s.city))].sort();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("nav.inicio"), to: "/" }, { label: t("nav.alojamientos") }]}
        eyebrow={t("stays.heroEyebrow")}
        title={t("stays.heroTitle")}
        description={t("stays.heroDesc")}
      />

      <section className="container-page">
        <div className="rounded-2xl border border-border bg-card p-4 md:p-5 shadow-soft">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_1.2fr_auto]">
            <CustomSelect
              label={t("stays.destination")}
              value={draft.city}
              onChange={(v) => setDraft({ ...draft, city: v })}
              options={[
                { value: "all", label: t("stays.anyDest") },
                ...cities.map((c) => ({ value: c, label: t(`city.${c}` as const, { defaultValue: c }) })),
              ]}
            />
            <CustomSelect
              label={t("stays.typeLabel")}
              value={draft.type}
              onChange={(v) => setDraft({ ...draft, type: v })}
              options={[
                { value: "all", label: t("stays.anyTypeLabel") },
                { value: "Riad", label: t("stayType.Riad") },
                { value: "Hotel", label: t("stayType.Hotel") },
                { value: "Boutique", label: t("stayType.Boutique") },
              ]}
            />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t("stays.maxPrice")}: {formatPrice(draft.maxPrice)}{t("stays.perNight")}
              </span>
              <input type="range" min={50} max={300} value={draft.maxPrice}
                onChange={(e) => setDraft({ ...draft, maxPrice: Number(e.target.value) })}
                className="mt-3 accent-[var(--terracotta)]"
              />
            </div>
            <button onClick={apply} className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-terracotta px-6 text-sm font-medium text-terracotta-foreground hover:brightness-110 self-end">
              {t("cta.filtrar")}
            </button>
          </div>
          {hasFilters && (
            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{filtered.length} {filtered.length === 1 ? t("packs.results") : t("packs.results_plural")}</span>
              <button onClick={reset} className="inline-flex items-center gap-1 hover:text-terracotta">
                <X className="h-3 w-3" /> {t("cta.limpiar")}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-12 space-y-5">
        {loading ? (
          <CardSkeleton count={4} aspect="landscape" />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-primary">{t("stays.noResults")}</p>
            <button onClick={reset} className="mt-4 inline-flex h-10 items-center rounded-md bg-terracotta px-5 text-sm font-medium text-terracotta-foreground">
              {t("cta.limpiar")}
            </button>
          </div>
        ) : filtered.map((s) => {
          const name = t(`stayCatalog.${s.slug}.name`);
          return (
            <article key={s.slug} className="group grid sm:grid-cols-[280px_1fr] overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-elegant transition-all">
              <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full overflow-hidden">
                <img src={s.image} alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-primary">{name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {t(`city.${s.city}` as const, { defaultValue: s.city })} · {t(`stayType.${s.type}` as const)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("packs.from")}</span>
                    <p className="font-display text-3xl text-terracotta leading-none">{formatPrice(s.price)}</p>
                    <span className="text-[10px] text-muted-foreground">{t("stays.perNight")}</span>
                  </div>
                </div>
                <div className="mt-auto pt-2">
                  <Link href={`/accommodations/${s.slug}`} className="inline-flex h-10 items-center rounded-md bg-terracotta px-5 text-sm font-medium text-terracotta-foreground hover:brightness-110">
                    {t("cta.verDetalles")}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { v: string; l: string }[] }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-terracotta">
        {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </label>
  );
}

export default function AlojamientosPage() {
  return <Suspense><AlojamientosContent /></Suspense>;
}