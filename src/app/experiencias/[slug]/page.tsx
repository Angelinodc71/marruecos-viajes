"use client";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";
import { experiences } from "@/components/site/data";
import { DetailTabs } from "@/components/site/DetailTabs";
import { ImageGallery } from "@/components/site/ImageGallery";
import { ShareButton } from "@/components/site/ShareButton";
import { CamelIcon, HammamIcon, LanternIcon, ShieldKeyIcon, StarTileIcon, TagineIcon } from "@/components/site/icons";
import { useFormatPrice } from "@/lib/format";

export default function ExperienceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp) notFound();

  const { t } = useTranslation();
  const formatPrice = useFormatPrice();
  const name = t(`expCatalog.${exp.slug}.name`);
  const short = t(`expCatalog.${exp.slug}.short`);

  const categoryIcon =
    exp.category === "Bienestar" ? <HammamIcon className="h-5 w-5" /> :
    exp.category === "Gastronomía" ? <TagineIcon className="h-5 w-5" /> :
    exp.category === "Aventura" ? <CamelIcon className="h-5 w-5" /> :
    <LanternIcon className="h-5 w-5" />;

  const tabSections = [
    {
      id: "descripcion",
      label: t("detail.description"),
      icon: categoryIcon,
      content: <p className="text-foreground/90 leading-relaxed">{short}. {t("detail.expIntro")}</p>,
    },
    {
      id: "incluye",
      label: t("detail.includes"),
      icon: <ShieldKeyIcon className="h-5 w-5" />,
      content: (
        <ul className="grid sm:grid-cols-2 gap-3">
          {[t("detail.incGuide"), t("detail.incMaterial"), t("detail.incDrink"), t("detail.incTransport")].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <StarTileIcon className="h-4 w-4 text-terracotta" /> {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "horario",
      label: t("detail.schedule"),
      icon: <Clock className="h-5 w-5" />,
      content: <p className="text-foreground/90 leading-relaxed">{t("detail.duration")}: {exp.duration}. {t("detail.scheduleText")}</p>,
    },
  ];

  return (
    <>
      <section className="container-page pt-10 pb-4">
        <nav className="text-xs text-muted-foreground mb-3">
          <Link href="/" className="hover:text-terracotta">{t("nav.inicio")}</Link> ›{" "}
          <Link href="/experiencias" className="hover:text-terracotta">{t("nav.experiencias")}</Link> ›{" "}
          <span className="text-foreground">{name}</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl text-primary animate-fade-up">{name}</h1>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground animate-fade-up delay-100">
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {exp.duration}</span>
          <span>· {t(`expCategory.${exp.category}` as const)}</span>
        </div>
      </section>

      <ImageGallery images={exp.gallery} title={name} />

      <section className="container-page grid lg:grid-cols-[1.4fr_1fr] gap-10 py-12">
        <div>
          <DetailTabs sections={tabSections} />
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("detail.from")}</p>
            <p className="font-display text-4xl text-terracotta leading-none">{formatPrice(exp.price)}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("detail.perPerson")}</p>
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
