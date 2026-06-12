// components/site/PackPrice.tsx
"use client";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";

type Props = {
  price: number;
  formatPrice: (n: number) => string;
  size?: "sm" | "lg";
};

export function PackPrice({ price, formatPrice, size = "sm" }: Props) {
  const { t } = useTranslation();

  if (price === 0) {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-lg border ${size === "lg" ? "px-4 py-3" : "px-2.5 py-1.5"}`}
        style={{
          background: "color-mix(in oklab, var(--terracotta) 8%, transparent)",
          borderColor: "color-mix(in oklab, var(--terracotta) 30%, transparent)",
        }}
      >
        <Sparkles
          className="shrink-0"
          style={{
            width: size === "lg" ? 18 : 12,
            height: size === "lg" ? 18 : 12,
            color: "var(--terracotta)",
          }}
        />
        <span
          className="font-medium tracking-wide"
          style={{
            fontSize: size === "lg" ? "16px" : "11px",
            color: "color-mix(in oklab, var(--terracotta) 80%, var(--foreground))",
          }}
        >
          {t("packs.consultPrice")}
        </span>
      </div>
    );
  }


  if (size === "lg") return (
    <>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("detail.from")}</p>
      <p className={`font-display text-terracotta leading-none text-4xl`}>
        {formatPrice(price)}
      </p>
    </>
  );
  else return (
      <div className="text-right">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">{t("packs.from")}</span>
        <p className={`font-display text-terracotta leading-none text-2xl`}>
          {formatPrice(price)}
        </p>
      </div>
    );
}