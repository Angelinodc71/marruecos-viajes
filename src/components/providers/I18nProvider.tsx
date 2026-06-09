"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

function LangSync() {
  const { i18n } = useTranslation();
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