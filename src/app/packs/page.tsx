"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Filter, X } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { useFormatPrice } from "@/lib/format";
import { usePackages } from "@/hooks/usePackages";
import { CardSkeleton } from "@/components/skeleton/CardSkeleton";

const PAGE_SIZE = 6;

function PacksContent() {
  const { t } = useTranslation();
  const formatPrice = useFormatPrice();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: packs, loading } = usePackages();

  const search = {
    duration: searchParams.get("duration") ?? "all",
    price: searchParams.get("price") ?? "all",
    city: searchParams.get("city") ?? "all",
    type: searchParams.get("type") ?? "all",
    page: Number(searchParams.get("page") ?? "1"),
  };

  const [draft, setDraft] = useState({ duration: search.duration, price: search.price, city: search.city, type: search.type });
  useEffect(() => { document.title = t("packs.metaTitle"); }, [t]);

  const filtered = useMemo(() => packs.filter((p) => {
    if (search.duration !== "all") {
      if (search.duration === "1-3" && p.nights > 3) return false;
      if (search.duration === "4-6" && (p.nights < 4 || p.nights > 6)) return false;
      if (search.duration === "7+" && p.nights < 7) return false;
    }
    if (search.price !== "all") {
      if (search.price === "lt400" && p.price >= 400) return false;
      if (search.price === "400-700" && (p.price < 400 || p.price > 700)) return false;
      if (search.price === "gt700" && p.price <= 700) return false;
    }
    if (search.city !== "all" && p.city !== search.city) return false;
    if (search.type !== "all" && p.type !== search.type) return false;
    return true;
  }), [packs, search.duration, search.price, search.city, search.type]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(search.page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const buildUrl = (params: Record<string, string | number>) => {
    const p = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => p.set(k, String(v)));
    return `/packs?${p.toString()}`;
  };

  const apply = () => router.push(buildUrl({ ...draft, page: 1 }));
  const reset = () => {
    const def = { duration: "all", price: "all", city: "all", type: "all" };
    setDraft(def);
    router.push(buildUrl({ ...def, page: 1 }));
  };
  const hasFilters = search.duration !== "all" || search.price !== "all" || search.city !== "all" || search.type !== "all";
  const cities = [...new Set(packs.map((p) => p.city))].sort();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("nav.inicio"), to: "/" }, { label: t("nav.packs") }]}
        eyebrow={t("packs.heroEyebrow")}
        title={t("packs.heroTitle")}
        description={t("packs.heroDesc")}
      />

      <section className="container-page">
        <div className="rounded-2xl border border-border bg-card p-4 md:p-5 shadow-soft">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <Select label={t("packs.duration")} value={draft.duration} onChange={(v) => setDraft({ ...draft, duration: v })}
              options={[
                { v: "all", l: t("packs.anyDuration") },
                { v: "1-3", l: t("packs.days1to3") },
                { v: "4-6", l: t("packs.days4to6") },
                { v: "7+", l: t("packs.days7plus") },
              ]}
            />
            <Select label={t("packs.price")} value={draft.price} onChange={(v) => setDraft({ ...draft, price: v })}
              options={[
                { v: "all", l: t("packs.anyPrice") },
                { v: "lt400", l: t("packs.priceLt") },
                { v: "400-700", l: t("packs.priceMid") },
                { v: "gt700", l: t("packs.priceGt") },
              ]}
            />
            <Select label={t("packs.city")} value={draft.city} onChange={(v) => setDraft({ ...draft, city: v })}
              options={[
                { v: "all", l: t("packs.anyCity") },
                ...cities.map((c) => ({ v: c, l: t(`city.${c}` as const, { defaultValue: c }) })),
              ]}
            />
            <Select label={t("packs.expType")} value={draft.type} onChange={(v) => setDraft({ ...draft, type: v })}
              options={[
                { v: "all", l: t("packs.anyType") },
                { v: "Cultural", l: t("packType.Cultural") },
                { v: "Adventure", l: t("packType.Adventure") },
                { v: "Luxury", l: t("packType.Luxury") },
                { v: "Family", l: t("packType.Family") },
              ]}
            />
            <button onClick={apply} className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-terracotta px-6 text-sm font-medium text-terracotta-foreground hover:brightness-110 self-end">
              <Filter className="h-4 w-4" /> {t("cta.filtrar")}
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

      <section className="container-page py-12">
        {loading ? (
          <CardSkeleton count={3} aspect="landscape" />
        ) : paginated.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-primary">{t("packs.noResults")}</p>
            <button onClick={reset} className="mt-4 inline-flex h-10 items-center rounded-md bg-terracotta px-5 text-sm font-medium text-terracotta-foreground">
              {t("cta.limpiar")}
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((p) => {
              const name = t(`packCatalog.${p.slug}.name`);
              const short = t(`packCatalog.${p.slug}.short`);
              return (
                <Link key={p.slug} href={`/packs/${p.slug}`} className="group block rounded-xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elegant transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {p.popular && <span className="absolute top-3 left-3 bg-terracotta text-terracotta-foreground text-[10px] uppercase tracking-widest px-2.5 py-1 rounded">{t("packs.popular")}</span>}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl text-primary">{name}</h3>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t(`packType.${p.type}` as const)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{short}</p>
                    <p className="text-xs text-muted-foreground mt-2">{p.duration} / {p.nights} {t("packs.nights")} · {t(`city.${p.city}` as const, { defaultValue: p.city })}</p>
                    <div className="mt-4 flex items-end justify-between">
                      <span className="text-xs text-muted-foreground">{t(`city.${p.city}` as const, { defaultValue: p.city })}</span>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("packs.from")}</span>
                        <p className="font-display text-2xl text-terracotta leading-none">{formatPrice(p.price)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => router.push(buildUrl({ ...search, page: n }))}
                className={`h-9 w-9 rounded-md text-sm ${n === currentPage ? "bg-terracotta text-terracotta-foreground" : "bg-card border border-border hover:border-terracotta"}`}>
                {n}
              </button>
            ))}
          </div>
        )}
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

export default function PacksPage() {
  return <Suspense><PacksContent /></Suspense>;
}