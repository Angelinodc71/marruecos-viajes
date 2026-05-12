"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Heart, Leaf } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ColumnIcon, StarTileIcon } from "@/components/site/icons";

const testimonials = [
  { name: "Laura G.", country: "ES", text: { es: "El mejor viaje de mi vida. Cada detalle estuvo cuidado.", en: "The best trip of my life. Every detail was thought through.", fr: "Le meilleur voyage de ma vie. Chaque détail soigné." } },
  { name: "Jean P.", country: "FR", text: { es: "Profesionales y cercanos. Sin duda repetiremos.", en: "Professional and warm. We'll definitely come back.", fr: "Professionnels et chaleureux. Nous reviendrons sans hésiter." } },
  { name: "Sara M.", country: "MX", text: { es: "El desierto fue una experiencia transformadora.", en: "The desert was a transformative experience.", fr: "Le désert a été une expérience transformatrice." } },
];

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage ?? "es") as "es" | "en" | "fr" | "de" | "it";
  useEffect(() => { document.title = t("about.metaTitle"); }, [t]);

  const values = [
    { icon: <Heart className="h-5 w-5" />, title: t("about.v1"), desc: t("about.v1d") },
    { icon: <StarTileIcon width={22} height={22} />, title: t("about.v2"), desc: t("about.v2d") },
    { icon: <Leaf className="h-5 w-5" />, title: t("about.v3"), desc: t("about.v3d") },
    { icon: <ColumnIcon width={22} height={22} />, title: t("about.v4"), desc: t("about.v4d") },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: t("nav.inicio"), to: "/" }, { label: t("nav.sobre") }]}
        eyebrow={t("about.heroEyebrow")}
        title={t("about.heroTitle")}
        description={t("about.heroDesc")}
      />

      <section className="container-page grid lg:grid-cols-2 gap-10 items-center pb-16">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
          <img src="/assets/cta-mountains.jpg" alt="Atlas mountains" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-primary">{t("about.missionTitle")}</h2>
          <p className="mt-4 text-foreground/85 leading-relaxed">{t("about.missionP1")}</p>
          <p className="mt-3 text-foreground/85 leading-relaxed">{t("about.missionP2")}</p>
        </div>
      </section>

      <section className="bg-cream border-y border-border">
        <div className="container-page py-16">
          <h2 className="font-display text-3xl md:text-4xl text-primary text-center">{t("about.valuesTitle")}</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-card border border-border p-6 shadow-soft">
                <div className="h-11 w-11 rounded-full bg-terracotta/10 text-terracotta grid place-items-center">{v.icon}</div>
                <h3 className="mt-4 font-display text-xl text-primary">{v.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="font-display text-3xl md:text-4xl text-primary text-center">{t("about.testimonialsTitle")}</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((tm) => (
            <figure key={tm.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover-lift">
              <span className="font-display text-5xl text-terracotta/40 leading-none">"</span>
              <blockquote className="mt-3 text-foreground/90">"{tm.text[lng]}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <p className="font-medium">{tm.name}</p>
                <p className="text-xs text-muted-foreground">{t(`country.${tm.country}` as const)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 text-center">
          <h3 className="font-display text-3xl md:text-4xl text-balance">{t("about.ctaTitle")}</h3>
          <p className="mt-3 text-cream/85 max-w-xl mx-auto">{t("about.ctaText")}</p>
          <Link href="/contact" className="mt-6 inline-flex h-12 items-center rounded-md bg-terracotta px-7 text-sm font-medium text-terracotta-foreground hover:brightness-110">
            {t("cta.planificar")}
          </Link>
        </div>
      </section>
    </>
  );
}
