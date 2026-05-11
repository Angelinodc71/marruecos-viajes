"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const { t } = useTranslation();
  const gallery = useMemo(() => Array.from(new Set(images)).filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIndex(0); }, [gallery]);

  useEffect(() => {
    const el = stripRef.current?.querySelector<HTMLElement>(`[data-thumb="${index}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  if (gallery.length === 0) return null;
  const total = gallery.length;
  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <section className="container-page">
      <div
        className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl bg-secondary group"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
          touchStartX.current = null;
        }}
      >
        <div className="flex h-full w-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {gallery.map((src, i) => (
            <img key={`${src}-${i}`} src={src} alt={`${title} — ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="h-full w-full flex-shrink-0 object-cover" />
          ))}
        </div>

        <button type="button" onClick={prev} aria-label={t("gallery.prev")} className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-cream/95 text-primary shadow-elegant hover:bg-cream transition">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={next} aria-label={t("gallery.next")} className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-cream/95 text-primary shadow-elegant hover:bg-cream transition">
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute right-4 bottom-4 rounded-full bg-primary/80 backdrop-blur px-3 py-1 text-xs font-medium text-cream shadow-soft">
          {index + 1} / {total}
        </div>
      </div>

      <div className="mt-4 relative">
        <div ref={stripRef} className="flex gap-3 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: "thin" }}>
          {gallery.map((src, i) => (
            <button
              key={`${src}-thumb-${i}`}
              type="button"
              data-thumb={i}
              onClick={() => setIndex(i)}
              aria-label={`${title} ${i + 1}`}
              className={`relative h-20 w-28 sm:h-24 sm:w-36 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${i === index ? "border-terracotta opacity-100" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <img src={src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
