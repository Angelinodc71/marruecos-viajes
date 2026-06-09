import { d1Query } from "./db";
 
export type Destination = {
  slug: string;
  image: string;
  city: string;
  order: number;
};
 
export async function getDestinations(): Promise<Destination[]> {
  return d1Query<Destination>(
    `SELECT slug, image, city, "order" FROM destinations ORDER BY "order"`
  );
}
 
export async function getDestination(slug: string): Promise<Destination | null> {
  const rows = await d1Query<Destination>(
    `SELECT slug, image, city, "order" FROM destinations WHERE slug = ?`,
    [slug]
  );
  return rows[0] ?? null;
}
 
export async function getDestinationSlugs(): Promise<string[]> {
  const rows = await d1Query<{ slug: string }>(
    `SELECT slug FROM destinations ORDER BY "order"`
  );
  return rows.map((r) => r.slug);
}