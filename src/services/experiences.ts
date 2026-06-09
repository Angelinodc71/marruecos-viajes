import { d1Query } from "./db";
 
export type Experience = {
  slug: string;
  category: "Wellness" | "Gastronomy" | "Cultural" | "Adventure";
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  schedule: string;
  image: string;
  gallery: string[];
  included: string[];
};
 
type ExperienceRaw = Omit<Experience, "gallery" | "included"> & {
  gallery: string;
  included: string;
};
 
function parse(raw: ExperienceRaw): Experience {
  return {
    ...raw,
    gallery: JSON.parse(raw.gallery),
    included: JSON.parse(raw.included),
  };
}
 
const SELECT = `
  SELECT slug, category, price, duration, rating, reviews,
         schedule, image, gallery, included
  FROM experiences
`;
 
export async function getExperiences(): Promise<Experience[]> {
  const rows = await d1Query<ExperienceRaw>(`${SELECT} ORDER BY rating DESC`);
  return rows.map(parse);
}
 
export async function getExperience(slug: string): Promise<Experience | null> {
  const rows = await d1Query<ExperienceRaw>(`${SELECT} WHERE slug = ?`, [slug]);
  return rows[0] ? parse(rows[0]) : null;
}
 
export async function getExperiencesByCategory(category: Experience["category"]): Promise<Experience[]> {
  const rows = await d1Query<ExperienceRaw>(`${SELECT} WHERE category = ? ORDER BY rating DESC`, [category]);
  return rows.map(parse);
}
 
export async function getExperienceSlugs(): Promise<string[]> {
  const rows = await d1Query<{ slug: string }>(`SELECT slug FROM experiences`);
  return rows.map((r) => r.slug);
}