"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { detectClientLanguage } from "@/lib/i18n";

function LangSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const detected = detectClientLanguage();
    if (detected !== i18n.resolvedLanguage) {
      i18n.changeLanguage(detected);
    }
  }, []);

  useEffect(() => {
    const lng = i18n.resolvedLanguage ?? "es";
    document.documentElement.lang = lng;
  }, [i18n.resolvedLanguage]);

  return null;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LangSync />
      {children}
    </>
  );
}
