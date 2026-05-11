"use client";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin } from "lucide-react";
import { packs } from "@/components/site/data";
import { DetailTabs } from "@/components/site/DetailTabs";
import { ImageGallery } from "@/components/site/ImageGallery";
import { ShareButton } from "@/components/site/ShareButton";
import { CamelIcon, ColumnIcon, LanternIcon, ShieldKeyIcon, StarTileIcon } from "@/components/site/icons";
import { useFormatPrice } from "@/lib/format";

const itineraryKeys = [
  { day: 1, t: { es: ["Llegada a Marrakech", "Recogida en aeropuerto y traslado a riad. Cena de bienvenida."], en: ["Arrival in Marrakech", "Airport pickup and transfer to riad. Welcome dinner."], fr: ["Arrivée à Marrakech", "Accueil à l'aéroport et transfert au riad. Dîner de bienvenue."] } },
  { day: 2, t: { es: ["Medina y zocos", "Tour guiado por la medina y plaza Jemaa el-Fna."], en: ["Medina & souks", "Guided tour of the medina and Jemaa el-Fna square."], fr: ["Médina & souks", "Visite guidée de la médina et de la place Jemaa el-Fna."] } },
  { day: 3, t: { es: ["Ruta al desierto", "Salida hacia Merzouga atravesando el Atlas."], en: ["Route to the desert", "Departure to Merzouga across the Atlas."], fr: ["Route vers le désert", "Départ vers Merzouga à travers l'Atlas."] } },
  { day: 4, t: { es: ["Sahara y noche en jaima", "Camellos, dunas Erg Chebbi y noche bajo las estrellas."], en: ["Sahara & night in tent", "Camels, Erg Chebbi dunes and a night under the stars."], fr: ["Sahara & nuit sous tente", "Chameaux, dunes d'Erg Chebbi et nuit à la belle étoile."] } },
  { day: 5, t: { es: ["Regreso", "Vuelta a Marrakech y traslado al aeropuerto."], en: ["Return", "Back to Marrakech and airport transfer."], fr: ["Retour", "Retour à Marrakech et transfert à l'aéroport."] } },
];

export default function PackDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const pack = packs.find((p) => p.slug === slug);
  if (!pack) notFound();

  const { t, i18n } = useTranslation();
  const formatPrice = useFormatPrice();
  const lng = (i18n.resolvedLanguage ?? "es") as "es" | "en" | "fr";
  const name = t(`packCatalog.${pack.slug}.name`);
  const short = t(`packCatalog.${pack.slug}.short`);

  const included = [
    t("detail.packInc1"), t("detail.packInc2"), t("detail.packInc3"),
    t("detail.packInc4"), t("detail.packInc5"), t("detail.packInc6"),
  ];

  const tabSections = [
    {
      id: "descripcion",
      label: t("detail.description"),
      icon: <LanternIcon className="h-5 w-5" />,
      content: (
        <div className="space-y-5 text-foreground/90 leading-relaxed">
          <p>{t("detail.packDesc1", { city: t(`city.${pack.city}` as const, { defaultValue: pack.city }), short })}</p>
          <p>{t("detail.packDesc2")}</p>
        </div>
      ),
    },
    {
      id: "incluye",
      label: t("detail.includes"),
      icon: <ShieldKeyIcon className="h-5 w-5" />,
      content: (
        <ul className="grid sm:grid-cols-2 gap-3">
          {included.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <StarTileIcon className="h-4 w-4 text-terracotta" /> {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "itinerario",
      label: t("detail.itinerary"),
      icon: <CamelIcon className="h-5 w-5" />,
      content: (
        <ol className="space-y-4">
          {itineraryKeys.map((it) => (
            <li key={it.day} className="flex gap-4 rounded-lg border border-border bg-card p-5 shadow-soft">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-terracotta/10 font-display text-lg text-terracotta">
                {t("detail.day")[0]}{it.day}
              </div>
              <div>
                <h3 className="font-medium">{it.t[lng][0]}</h3>
                <p className="text-sm text-muted-foreground mt-1">{it.t[lng][1]}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: "info",
      label: t("detail.info"),
      icon: <ColumnIcon className="h-5 w-5" />,
      content: (
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          {[t("detail.freeCancel"), t("detail.instantConfirm"), t("detail.securePay")].map((item) => (
            <div key={item} className="rounded-lg border border-border bg-card p-4">
              <StarTileIcon className="mb-3 h-5 w-5 text-terracotta" />
              {item}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <section className="container-page pt-8 pb-4">
        <nav className="text-xs text-muted-foreground mb-3">
          <Link href="/" className="hover:text-terracotta">{t("nav.inicio")}</Link> ›{" "}
          <Link href="/packs" className="hover:text-terracotta">{t("nav.packs")}</Link> ›{" "}
          <span className="text-foreground">{name}</span>
        </nav>
      </section>

      <ImageGallery images={pack.gallery} title={name} />

      <section className="container-page grid lg:grid-cols-[1.4fr_1fr] gap-10 pt-10 pb-20">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-primary animate-fade-up">{name}</h1>
          <p className="mt-2 text-muted-foreground inline-flex items-center gap-1.5 animate-fade-up delay-100">
            <MapPin className="h-4 w-4" /> {t(`city.${pack.city}` as const, { defaultValue: pack.city })}
          </p>
          <DetailTabs sections={tabSections} />
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("detail.from")}</p>
            <p className="font-display text-4xl text-terracotta leading-none">{formatPrice(pack.price)}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("detail.perPerson")}</p>

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

            <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><StarTileIcon className="h-3.5 w-3.5 text-terracotta" /> {t("detail.freeCancel")}</li>
              <li className="flex items-center gap-2"><ShieldKeyIcon className="h-3.5 w-3.5 text-terracotta" /> {t("detail.instantConfirm")}</li>
              <li className="flex items-center gap-2"><ColumnIcon className="h-3.5 w-3.5 text-terracotta" /> {t("detail.securePay")}</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
