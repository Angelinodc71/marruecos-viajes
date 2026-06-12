type D1Result<T> = {
  results: T[];
  success: boolean;
  meta: { duration: number; rows_read: number; rows_written: number };
};

function getEnv(key: string): string {
  const val = (globalThis as Record<string, unknown>)[key] as string | undefined
    ?? process.env[key];
  if (!val) throw new Error(`Missing env var: ${key}`);
  return val;
}

export async function d1Query<T = Record<string, unknown>>(
  sql: string,
  params: (string | number | null)[] = []
): Promise<T[]> {
  const accountId = getEnv("CF_ACCOUNT_ID");
  const databaseId = getEnv("CF_D1_DATABASE_ID");
  const apiToken = getEnv("CF_API_TOKEN");

  const BASE = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
    cache: "no-store",
  });

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