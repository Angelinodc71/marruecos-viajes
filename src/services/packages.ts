import { d1Query } from "./db";
 
export type Package = {
  slug: string;
  city: string;
  type: "Cultural" | "Adventure" | "Luxury" | "Family";
  duration: string;
  nights: number;
  price: number;
  rating: number;
  reviews: number;
  popular: boolean;
  image: string;
  gallery: string[];
  included: string[];
};
 
type PackageRaw = Omit<Package, "gallery" | "included" | "popular"> & {
  gallery: string;
  included: string;
  popular: number;
};
 
function parse(raw: PackageRaw): Package {
  return {
    ...raw,
    popular: raw.popular === 1,
    gallery: JSON.parse(raw.gallery),
    included: JSON.parse(raw.included),
  };
}
 
const SELECT = `
  SELECT slug, city, type, duration, nights, price, rating, reviews,
         popular, image, gallery, included
  FROM packages
`;
 
export async function getPackages(): Promise<Package[]> {
  const rows = await d1Query<PackageRaw>(`${SELECT} ORDER BY popular DESC, rating DESC`);
  return rows.map(parse);
}
 
export async function getPackage(slug: string): Promise<Package | null> {
  const rows = await d1Query<PackageRaw>(`${SELECT} WHERE slug = ?`, [slug]);
  return rows[0] ? parse(rows[0]) : null;
}
 
export async function getPopularPackages(): Promise<Package[]> {
  const rows = await d1Query<PackageRaw>(`${SELECT} WHERE popular = 1 ORDER BY rating DESC`);
  return rows.map(parse);
}
 
export async function getPackagesByCity(city: string): Promise<Package[]> {
  const rows = await d1Query<PackageRaw>(`${SELECT} WHERE city = ? ORDER BY rating DESC`, [city]);
  return rows.map(parse);
}
 
export async function getPackagesByType(type: Package["type"]): Promise<Package[]> {
  const rows = await d1Query<PackageRaw>(`${SELECT} WHERE type = ? ORDER BY rating DESC`, [type]);
  return rows.map(parse);
}
 
export async function getPackageSlugs(): Promise<string[]> {
  const rows = await d1Query<{ slug: string }>(`SELECT slug FROM packages`);
  return rows.map((r) => r.slug);
}