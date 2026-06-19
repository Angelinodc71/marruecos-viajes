import { d1Query } from "./db";

export type SiteSettings = {
  email: string;
  phone: string;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const rows = await d1Query<SiteSettings>(
    `SELECT email, phone FROM site_settings WHERE id = 1`
  );
  return rows[0] ?? { email: "", phone: "" };
}