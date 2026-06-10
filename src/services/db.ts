 
const BASE = `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/d1/database/${process.env.CF_D1_DATABASE_ID}/query`;
 
type D1Result<T> = {
  results: T[];
  success: boolean;
  meta: { duration: number; rows_read: number; rows_written: number };
};

export async function d1Query<T = Record<string, unknown>>(
  sql: string,
  params: (string | number | null)[] = []
): Promise<T[]> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
    // Next.js cache: revalidate each 60s (default is 0, which means no caching)
    next: { revalidate: 60 },
  });
   console.log(res, process.env.CF_API_TOKEN, sql, params);

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`D1 query failed [${res.status}]: ${err}`);
  }
 
  const json = (await res.json()) as { result: D1Result<T>[] };
 
  if (!json.result?.[0]?.success) {
    throw new Error("D1 query returned success=false");
  }
 
  return json.result[0].results;
}
 