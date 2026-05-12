"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";
import { experiences } from "@/components/site/data";
import { PageHero } from "@/components/site/PageHero";
import { useFormatPrice } from "@/lib/format";

const categories = ["Todas", "Bienestar", "Gastronomía", "Cultural", "Aventura"] as const;
type Category = typeof categories[number];

function ExperienciasContent() {
  const { t } = useTranslation();
  const formatPrice = useFormatPrice();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cat = (searchParams.get("cat") ?? "Todas") as Category;

  useEffect(() => { document.title = t("experiences.metaTitle"); }, [t]);

  const labelFor = (c: Category) => c === "Todas" ? t("expCategory.all") : t(`expCategory.${c}` as const);

  const filtered = useMemo(() => {
    if (cat === "Todas") return experiences;
    return experiences.filter((e) => e.category === cat);
  }, [cat]);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("nav.inicio"), to: "/" }, { label: t("nav.experiencias") }]}
        eyebrow={t("experiences.heroEyebrow")}
        title={t("experiences.heroTitle")}
        description={t("experiences.heroDesc")}
      />

      <section className="container-page">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => router.push(`/experiences?cat=${c}`)}
              className={`h-10 px-5 rounded-full text-sm transition ${cat === c ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-terracotta hover:text-terracotta"}`}
            >
              {labelFor(c)}
            </button>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        {filtered.length === 0 ? (
          <p className="text-center py-20 font-display text-2xl text-primary">{t("experiences.noResults")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => {
              const name = t(`expCatalog.${e.slug}.name`);
              const short = t(`expCatalog.${e.slug}.short`);
              return (
                <Link href={`/experiences/${e.slug}`} key={e.slug} className="group block rounded-xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elegant transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={e.image} alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 bg-cream/95 text-primary text-[10px] uppercase tracking-widest px-2.5 py-1 rounded">
                      {labelFor(e.category as Category)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-primary">{name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{short}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {e.duration}
                      </span>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("packs.from")}</span>
                        <p className="font-display text-2xl text-terracotta leading-none">{formatPrice(e.price)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default function ExperienciasPage() {
  return (
    <Suspense>
      <ExperienciasContent />
    </Suspense>
  );
}
