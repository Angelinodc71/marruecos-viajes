import { useEffect, useState } from "react";
import type { SiteSettings } from "@/services/settings";

type State = {
  data: SiteSettings | null;
  loading: boolean;
  error: string | null;
};

let cache: SiteSettings | null = null;

export function useSiteSettings() {
  const [state, setState] = useState<State>({
    data: cache,
    loading: cache === null,
    error: null,
  });

  useEffect(() => {
    if (cache !== null) return;

    fetch("/api/settings")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching settings");
        return res.json() as Promise<SiteSettings>;
      })
      .then((data) => {
        cache = data;
        setState({ data, loading: false, error: null });
      })
      .catch((err) => setState({ data: null, loading: false, error: err.message }));
  }, []);

  return state;
}