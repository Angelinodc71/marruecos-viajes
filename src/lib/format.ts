import { useTranslation } from "react-i18next";

const CURRENCY: Record<string, { code: string; locale: string; rate: number }> = {
  es: { code: "EUR", locale: "es-ES", rate: 1 },
  en: { code: "EUR", locale: "en-GB", rate: 1 },
  fr: { code: "EUR", locale: "fr-FR", rate: 1 },
  de: { code: "EUR", locale: "de-DE", rate: 1 },
  it: { code: "EUR", locale: "it-IT", rate: 1 },
};

export function useLocaleInfo() {
  const { i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage ?? "es").slice(0, 2);
  return CURRENCY[lng] ?? CURRENCY.es;
}

export function useFormatPrice() {
  const { code, locale, rate } = useLocaleInfo();
  return (eur: number) => {
    const value = Math.round(eur * rate);
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      maximumFractionDigits: 0,
    }).format(value);
  };
}
