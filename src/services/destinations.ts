import { d1Query } from "./db";
 
export type Destination = {
  slug: string;
  name: string;
  image: string;
  blurb: string;
  city: string;
};

export async function getDestinations(): Promise<Destination[]> {
  return d1Query<Destination>(
    `SELECT slug, name, image, blurb, city FROM destinations ORDER BY slug`
  );
}

export async function getDestination(slug: string): Promise<Destination | null> {
  const rows = await d1Query<Destination>(
    `SELECT slug, name, image, blurb, city FROM destinations WHERE slug = ?`,
    [slug]
  );
  return rows[0] ?? null;
}

export async function getDestinationSlugs(): Promise<string[]> {
  const rows = await d1Query<{ slug: string }>(
    `SELECT slug FROM destinations`
  );
  return rows.map((r) => r.slug);
}
