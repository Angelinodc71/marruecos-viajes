"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className="container-page pt-8 pb-8 md:pt-12 md:pb-10" suppressHydrationWarning>
      {breadcrumbs && (
        <nav aria-label="Breadcrumb" className="breadcrumb mb-5" suppressHydrationWarning>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-1.5" suppressHydrationWarning>
              {i > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 flex-shrink-0"
                  style={{ color: "var(--border)" }}
                  aria-hidden
                />
              )}
              {b.to ? (
                <Link href={b.to} suppressHydrationWarning>{b.label}</Link>
              ) : (
                <span className="breadcrumb-current" suppressHydrationWarning>{b.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {eyebrow && (
        <p className="mb-3 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-terracotta" suppressHydrationWarning>
          <span className="inline-block h-px w-6 bg-terracotta/60" />
          {eyebrow}
        </p>
      )}

      <h1
        className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-primary text-balance"
        style={{ lineHeight: 1.1 }}
        suppressHydrationWarning
      >
        {title}
      </h1>

      {description && (
        <p
          className="mt-4 max-w-2xl text-[1rem] md:text-[1.05rem] text-muted-foreground text-balance leading-relaxed"
          suppressHydrationWarning
        >
          {description}
        </p>
      )}
    </section>
  );
}