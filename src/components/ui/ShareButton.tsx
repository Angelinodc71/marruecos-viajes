"use client";
import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function ShareButton({ title }: { title: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const data = { title, text: title, url };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(data);
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch { /* user cancelled */ }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="mt-3 inline-flex w-full h-11 items-center justify-center gap-2 rounded-md border border-border text-sm transition-all hover:border-terracotta hover:text-terracotta hover:-translate-y-0.5"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? t("cta.compartido") : t("cta.compartir")}
    </button>
  );
}
