"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, MapPin, Users, Headphones, Search, CalendarDays } from "lucide-react";
import { CamelIcon, TagineIcon, ColumnIcon, ShieldKeyIcon, StarTileIcon } from "@/components/icons";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { useFormatPrice } from "@/lib/format";
import { useBookingStore } from "@/lib/booking-store";
import { toInputValue } from "@/hooks/useDate";
import { useDestinations } from "@/hooks/useDestinations";
import { usePackages } from "@/hooks/usePackages";
import { DestinationSkeleton } from "@/components/skeleton/DestinationSkeleton";
import { CardSkeleton } from "@/components/skeleton/CardSkeleton";
import type { Package } from "@/services/packages";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const formatPrice = useFormatPrice();
  const router = useRouter();
  const { update } = useBookingStore();
  const { data: destinations, loading: loadingDest } = useDestinations();
  const { data: packs, loading: loadingPacks } = usePackages();

  const lng = (i18n.resolvedLanguage ?? "es") as string;
  const [destino, setDestino] = useState("all");
  const [fecha, setFecha] = useState<Date | null>(null);
  const [personas, setPersonas] = useState("2");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = destinations.find((d) => d.slug === destino);
    const city = selected?.city ?? "all";
    update({ people: personas, ...(fecha ? { date: toInputValue(fecha) } : {}) });
    router.push(`/packs?city=${city}&duration=all&price=all&type=all&page=1`);
  };

  const destinoOptions = [
    { value: "all", label: t("hero.destinoPh") },
    ...destinations.map((d) => ({
      value: d.slug,
      label: t(`destNames.${d.slug}` as const),
    })),
  ];

  const popularPacks = packs.filter((p) => p.popular);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
          <img
            src="/assets/hero-marrakech.jpg"
            alt="Atardecer sobre Marrakech con la mezquita Koutoubia"
            className="absolute inset-0 h-full w-full object-cover scale-105 animate-[fade-in_1.2s_ease-out_both]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/30 to-primary/70" />
          <div className="container-page relative h-full flex flex-col items-center justify-center text-center text-cream pt-12">
            <p className="text-xs uppercase tracking-[0.4em] text-cream/90 animate-fade-up">{t("hero.eyebrow")}</p>
            <h1 className="mt-5 font-display text-5xl md:text-7xl lg:text-8xl font-medium text-balance leading-[1.05] animate-fade-up delay-100">
              {t("hero.title1")}<br />{t("hero.title2")}
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-cream/90 text-balance animate-fade-up delay-200">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div className="container-page -mt-16 relative z-10 animate-fade-up delay-300">
          <form onSubmit={handleSearch} className="mx-auto max-w-5xl rounded-2xl bg-card shadow-elegant border border-border p-3 md:p-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-stretch">
              <CustomSelect
                variant="hero"
                label={t("hero.destino")}
                icon={<MapPin className="h-4 w-4" />}
                value={destino}
                onChange={setDestino}
                options={destinoOptions}
              />
              <CustomDatePicker
                variant="hero"
                label={t("hero.fechas")}
                icon={<CalendarDays className="h-4 w-4" />}
                value={fecha}
                onChange={setFecha}
                minDate={new Date()}
                lng={lng}
              />
              <CustomSelect
                variant="hero"
                label={t("hero.personas")}
                icon={<Users className="h-4 w-4" />}
                value={personas}
                onChange={setPersonas}
                options={[
                  { value: "1", label: "1 persona" },
                  { value: "2", label: "2 personas" },
                  { value: "3", label: "3 personas" },
                  { value: "4", label: "4+ personas" },
                ]}
              />
              <button type="submit" className="inline-flex items-center justify-center gap-2 h-full min-h-[56px] rounded-xl bg-terracotta px-6 text-sm font-semibold text-terracotta-foreground hover:brightness-110 transition shadow-soft">
                <Search className="h-4 w-4" />
                {t("cta.buscar")}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* DESTINOS */}
      <section className="container-page py-20">
        <SectionHeader eyebrow={t("sections.destinosEyebrow")} title={t("sections.destinosTitle")} />
        <div className="mt-10">
          {loadingDest ? (
            <DestinationSkeleton />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((d, i) => (
                <Link key={d.slug} href="/destinations"
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-soft hover-lift animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <img src={d.image} alt={t(`destNames.${d.slug}` as const)} loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 gradient-card-overlay" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-cream transition-transform duration-500 group-hover:-translate-y-1">
                    <h3 className="font-display text-2xl uppercase tracking-wider">{t(`destNames.${d.slug}` as const)}</h3>
                    <p className="text-xs text-cream/85 mt-1">{t(`destBlurb.${d.slug}` as const)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PACKS POPULARES */}
      <section className="container-page pb-20">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          <div>
            <div className="flex items-end justify-between mb-8">
              <SectionHeader eyebrow={t("sections.packsEyebrow")} title={t("sections.packsTitle")} align="left" />
              <Link href="/packs" className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:brightness-110">
                {t("cta.verTodos")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {loadingPacks ? (
              <CardSkeleton count={3} aspect="landscape" />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {popularPacks.map((p) => (
                  <PackCard key={p.slug} pack={p} formatPrice={formatPrice} t={t} />
                ))}
              </div>
            )}
          </div>

          <aside className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 flex flex-col justify-between min-h-[500px]">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cream/70">{t("sections.readyEyebrow")}</p>
              <h3 className="font-display text-3xl md:text-4xl mt-3 text-balance">{t("sections.readyTitle")}</h3>
              <Link href="/packs" className="mt-6 inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-terracotta px-6 text-sm font-semibold text-terracotta-foreground hover:brightness-110">
                {t("cta.verPacks")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-8 space-y-4 text-sm">
              <Bullet icon={<ShieldKeyIcon width={22} height={22} />} title={t("bullets.precio")} />
              <Bullet icon={<Headphones className="h-5 w-5" />} title={t("bullets.atencion")} />
              <Bullet icon={<StarTileIcon width={22} height={22} />} title={t("bullets.personal")} />
            </ul>
          </aside>
        </div>
      </section>

      {/* EXPERIENCIAS BAR */}
      <section className="bg-cream border-y border-border">
        <div className="container-page py-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="grid sm:grid-cols-3 gap-8">
            <Feature icon={<CamelIcon width={28} height={28} />} title={t("features.desierto")} sub={t("features.desiertoSub")} />
            <Feature icon={<TagineIcon width={28} height={28} />} title={t("features.gastro")} sub={t("features.gastroSub")} />
            <Feature icon={<ColumnIcon width={28} height={28} />} title={t("features.cultura")} sub={t("features.culturaSub")} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="relative overflow-hidden rounded-3xl">
          <img src="/assets/cta-mountains.jpg" alt="Atlas mountains" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
          <div className="relative p-10 md:p-16 max-w-xl text-cream">
            <p className="text-xs uppercase tracking-[0.3em] text-cream/80">{t("sections.ctaEyebrow")}</p>
            <h3 className="font-display text-4xl md:text-5xl mt-3 text-balance">{t("sections.ctaTitle")}</h3>
            <p className="mt-4 text-cream/90">{t("sections.ctaText")}</p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 h-12 rounded-lg bg-terracotta px-6 text-sm font-semibold text-terracotta-foreground hover:brightness-110">
              {t("cta.contactar")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="container-page pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <TrustItem text={t("bullets.precio")} />
          <TrustItem text={t("bullets.sinCargos")} />
          <TrustItem text={t("bullets.pago")} />
        </div>
      </section>
    </>
  );
}

function SectionHeader({ eyebrow, title, align = "center" }: { eyebrow: string; title: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className={`text-xs uppercase tracking-[0.25em] text-terracotta ${align === "center" ? "before:content-['—'] before:mr-2 after:content-['—'] after:ml-2" : ""}`}>
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl md:text-4xl text-primary text-balance">{title}</h2>
    </div>
  );
}

function PackCard({ pack, formatPrice, t }: { pack: Package; formatPrice: (n: number) => string; t: (k: string) => string }) {
  const { slug, image, duration, nights, price, popular } = pack;
  const name = t(`packCatalog.${slug}.name`);
  return (
    <Link href={`/packs/${slug}`} className="group block rounded-xl overflow-hidden bg-card border border-border shadow-soft hover-lift hover:shadow-elegant">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        {popular && (
          <span className="absolute top-3 left-3 bg-terracotta text-terracotta-foreground text-[10px] uppercase tracking-widest px-2.5 py-1 rounded animate-fade-in">
            {t("packs.popular")}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl text-primary">{name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{duration} / {nights} {t("packs.nights")}</p>
        <div className="mt-3 flex items-center justify-end">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("packs.from")}</span>
            <p className="font-display text-2xl text-terracotta leading-none">{formatPrice(price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Bullet({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="grid place-items-center h-9 w-9 rounded-full bg-cream/10 text-cream">{icon}</span>
      <span>{title}</span>
    </li>
  );
}

function Feature({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-14 w-14 rounded-full border border-terracotta/40 grid place-items-center text-terracotta shrink-0">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function TrustItem({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      <ShieldKeyIcon width={18} height={18} className="text-terracotta" />
      <span>{text}</span>
    </div>
  );
}