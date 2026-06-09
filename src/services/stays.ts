import { d1Query } from "./db";

export type Stay = {
  slug: string;
  city: string;
  type: "Riad" | "Hotel" | "Boutique";
  price: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
};

type StayRaw = Omit<Stay, "gallery"> & { gallery: string };

function parse(raw: StayRaw): Stay {
  return { ...raw, gallery: JSON.parse(raw.gallery) };
}

const SELECT = `SELECT slug, city, type, price, rating, reviews, image, gallery FROM stays`;

export async function getStays(): Promise<Stay[]> {
  const rows = await d1Query<StayRaw>(`${SELECT} ORDER BY rating DESC`);
  return rows.map(parse);
}

export async function getStay(slug: string): Promise<Stay | null> {
  const rows = await d1Query<StayRaw>(`${SELECT} WHERE slug = ?`, [slug]);
  return rows[0] ? parse(rows[0]) : null;
}

export async function getStaysByCity(city: string): Promise<Stay[]> {
  const rows = await d1Query<StayRaw>(`${SELECT} WHERE city = ? ORDER BY rating DESC`, [city]);
  return rows.map(parse);
}

export async function getStaysByType(type: Stay["type"]): Promise<Stay[]> {
  const rows = await d1Query<StayRaw>(`${SELECT} WHERE type = ? ORDER BY rating DESC`, [type]);
  return rows.map(parse);
}

export async function getStaySlugs(): Promise<string[]> {
  const rows = await d1Query<{ slug: string }>(`SELECT slug FROM stays`);
  return rows.map((r) => r.slug);
}