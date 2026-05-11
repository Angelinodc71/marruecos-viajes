import Link from "next/link";

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
    <section className="container-page pt-10 pb-8 md:pt-14 md:pb-10">
      {breadcrumbs && (
        <nav className="mb-4 text-xs text-muted-foreground">
          {breadcrumbs.map((b, i) => (
            <span key={i}>
              {b.to ? <Link href={b.to} className="hover:text-terracotta">{b.label}</Link> : <span className="text-foreground">{b.label}</span>}
              {i < breadcrumbs.length - 1 && <span className="px-2">›</span>}
            </span>
          ))}
        </nav>
      )}
      {eyebrow && <p className="text-xs uppercase tracking-[0.25em] text-terracotta mb-3">{eyebrow}</p>}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary text-balance">{title}</h1>
      {description && <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground text-balance">{description}</p>}
    </section>
  );
}
