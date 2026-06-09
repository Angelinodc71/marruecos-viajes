"use client";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import { usePackages } from "@/hooks/usePackages";
import { DetailTabs } from "@/components/ui/DetailTabs";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { ShareButton } from "@/components/ui/ShareButton";
import { CamelIcon, ColumnIcon, LanternIcon, ShieldKeyIcon, StarTileIcon } from "@/components/icons";
import { useFormatPrice } from "@/lib/format";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { useBookingStore } from "@/lib/booking-store";
import { getDateValue, toInputValue } from "@/hooks/useDate";

const itineraryKeys = [
  { day: 1, t: { es: ["Llegada a Marrakech", "Recogida en aeropuerto y traslado a riad. Cena de bienvenida."], en: ["Arrival in Marrakech", "Airport pickup and transfer to riad. Welcome dinner."], fr: ["Arrivée à Marrakech", "Accueil à l'aéroport et transfert au riad. Dîner de bienvenue."], it: ["Arrivo a Marrakech", "Accoglienza in aeroporto e trasferimento al riad. Cena di benvenuto."], de: ["Ankunft in Marrakesch", "Abholung am Flughafen und Transfer zum Riad. Willkommensdinner."] } },
  { day: 2, t: { es: ["Medina y zocos", "Tour guiado por la medina y plaza Jemaa el-Fna."], en: ["Medina & souks", "Guided tour of the medina and Jemaa el-Fna square."], fr: ["Médina & souks", "Visite guidée de la médina et de la place Jemaa el-Fna."], it: ["Medina e souk", "Tour guidato della medina e della piazza Jemaa el-Fna."], de: ["Medina & Souks", "Geführte Tour durch die Medina und den Jemaa el-Fna-Platz."] } },
  { day: 3, t: { es: ["Ruta al desierto", "Salida hacia Merzouga atravesando el Atlas."], en: ["Route to the desert", "Departure to Merzouga across the Atlas."], fr: ["Route vers le désert", "Départ vers Merzouga à travers l'Atlas."], it: ["Strada verso il deserto", "Partenza per Merzouga attraverso l'Atlante."], de: ["Route in die Wüste", "Abfahrt nach Merzouga durch den Atlas."] } },
  { day: 4, t: { es: ["Sahara y noche en jaima", "Camellos, dunas Erg Chebbi y noche bajo las estrellas."], en: ["Sahara & night in tent", "Camels, Erg Chebbi dunes and a night under the stars."], fr: ["Sahara & nuit sous tente", "Chameaux, dunes d'Erg Chebbi et nuit à la belle étoile."], it: ["Sahara e notte in tenda", "Cammelli, dune di Erg Chebbi e una notte sotto le stelle."], de: ["Sahara & Nacht im Zelt", "Kamele, Erg-Chebbi-Dünen und eine Nacht unter dem Sternenhimmel."] } },
  { day: 5, t: { es: ["Regreso", "Vuelta a Marrakech y traslado al aeropuerto."], en: ["Return", "Back to Marrakech and airport transfer."], fr: ["Retour", "Retour à Marrakech et transfert à l'aéroport."], it: ["Ritorno", "Rientro a Marrakech e trasferimento all'aeroporto."], de: ["Rückreise", "Rückfahrt nach Marrakesch und Transfer zum Flughafen."] } },
];

export default function PackDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: packs } = usePackages();
  const pack = packs.find((p) => p.slug === slug);

  const { t, i18n } = useTranslation();
  const formatPrice = useFormatPrice();
  const lng = (i18n.resolvedLanguage ?? "es") as "es" | "en" | "fr" | "de" | "it";
  const { people, date, update } = useBookingStore();
  const dateValue = getDateValue(date);

  useEffect(() => {
    if (pack) update({ itemName: t(`packCatalog.${pack.slug}.name`), itemType: "pack", packSlug: pack.slug });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pack?.slug]);

  if (packs.length > 0 && !pack) notFound();
  if (!pack) return null;

  const name = t(`packCatalog.${pack.slug}.name`);
  const short = t(`packCatalog.${pack.slug}.short`);

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
          {pack.included.map((item) => (
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
              <StarTileIcon className="mb-3 h-5 w-5 text-terracotta" /> {item}
            </div>
          ))}
        </div>
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
            <Link href="/packs">{t("nav.packs")}</Link>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" style={{ color: "var(--border)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            <span className="breadcrumb-current">{name}</span>
          </span>
        </nav>
      </section>

      <ImageGallery images={pack.gallery} title={name} />

      <section className="container-page grid lg:grid-cols-[1.4fr_1fr] gap-8 pt-10 pb-20">
        <div className="min-w-0 overflow-hidden">
          <h1 className="font-display text-4xl md:text-5xl text-primary animate-fade-up">{name}</h1>
          <p className="mt-2 text-muted-foreground inline-flex items-center gap-1.5 animate-fade-up delay-100">
            <MapPin className="h-4 w-4" /> {t(`city.${pack.city}` as const, { defaultValue: pack.city })}
          </p>
          <DetailTabs sections={tabSections} />
        </div>

        <aside className="lg:sticky lg:top-24 self-start w-full min-w-0">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("detail.from")}</p>
            <p className="font-display text-4xl text-terracotta leading-none">{formatPrice(pack.price)}</p>
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
                onChange={(d) => update({ date: toInputValue(d) })} minDate={new Date()} lng={lng}
              />
            </div>
            <Link href="/contact" className="btn-primary mt-5 w-full h-12 rounded-lg text-base font-semibold">
              {t("cta.reservar")}
            </Link>
            <ShareButton title={name} />
            <ul className="mt-6 space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><StarTileIcon className="h-3.5 w-3.5 text-terracotta shrink-0" /> {t("detail.freeCancel")}</li>
              <li className="flex items-center gap-2"><ShieldKeyIcon className="h-3.5 w-3.5 text-terracotta shrink-0" /> {t("detail.instantConfirm")}</li>
              <li className="flex items-center gap-2"><ColumnIcon className="h-3.5 w-3.5 text-terracotta shrink-0" /> {t("detail.securePay")}</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}