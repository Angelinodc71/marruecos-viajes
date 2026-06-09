"use client";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";
import { useExperiences } from "@/hooks/useExperiences";
import { DetailTabs } from "@/components/ui/DetailTabs";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { ShareButton } from "@/components/ui/ShareButton";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { CamelIcon, HammamIcon, LanternIcon, ShieldKeyIcon, StarTileIcon, TagineIcon } from "@/components/icons";
import { useFormatPrice } from "@/lib/format";
import { useBookingStore } from "@/lib/booking-store";
import { getDateValue } from "@/hooks/useDate";

export default function ExperienceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: experiences } = useExperiences();
  const exp = experiences.find((e) => e.slug === slug);

  const { t, i18n } = useTranslation();
  const formatPrice = useFormatPrice();
  const lng = (i18n.resolvedLanguage ?? "es") as string;
  const { people, date, update } = useBookingStore();
  const dateValue = getDateValue(date);

  useEffect(() => {
    if (exp) update({ itemName: t(`expCatalog.${exp.slug}.name`), itemType: "experience", expSlug: exp.slug });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exp?.slug]);

  if (experiences.length > 0 && !exp) notFound();
  if (!exp) return null;

  const name = t(`expCatalog.${exp.slug}.name`);
  const short = t(`expCatalog.${exp.slug}.short`);

  const categoryIcon =
    exp.category === "Wellness"   ? <HammamIcon className="h-5 w-5" /> :
    exp.category === "Gastronomy" ? <TagineIcon className="h-5 w-5" /> :
    exp.category === "Adventure"  ? <CamelIcon className="h-5 w-5" /> :
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
          {exp.included.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <StarTileIcon className="h-4 w-4 text-terracotta shrink-0" /> {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "horario",
      label: t("detail.schedule"),
      icon: <Clock className="h-5 w-5" />,
      content: (
        <p className="text-foreground/90 leading-relaxed">
          {t("detail.duration")}: {exp.duration}. {exp.schedule}
        </p>
      ),
    },
  ];

  return (
    <>
      <section className="container-page pt-8 pb-4">
        <nav className="breadcrumb mb-3">
          <span className="inline-flex items-center gap-1.5"><Link href="/">{t("nav.inicio")}</Link></span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" style={{ color: "var(--border)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            <Link href="/experiences">{t("nav.experiencias")}</Link>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" style={{ color: "var(--border)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            <span className="breadcrumb-current">{name}</span>
          </span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl text-primary animate-fade-up">{name}</h1>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground animate-fade-up delay-100">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {exp.duration}</span>
          <span>· {t(`expCategory.${exp.category}` as const)}</span>
        </div>
      </section>

      <ImageGallery images={exp.gallery} title={name} />

      <section className="container-page grid lg:grid-cols-[1.4fr_1fr] gap-8 py-12">
        <div className="min-w-0 overflow-hidden">
          <DetailTabs sections={tabSections} />
        </div>
        <aside className="lg:sticky lg:top-24 self-start w-full min-w-0">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("detail.from")}</p>
            <p className="font-display text-4xl text-terracotta leading-none">{formatPrice(exp.price)}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("detail.perPerson")}</p>
            <div className="mt-5 space-y-4">
              <CustomSelect label={t("detail.people")} value={people} onChange={(v) => update({ people: v })}
                options={[
                  { value: "1", label: t("detail.p1") },
                  { value: "2", label: t("detail.p2") },
                  { value: "3", label: t("detail.p3") },
                  { value: "4", label: t("detail.p4") },
                ]}
              />
              <CustomDatePicker label={t("detail.date")} value={dateValue}
                onChange={(d) => update({ date: d.toISOString() })} minDate={new Date()} lng={lng}
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