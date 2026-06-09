// hooks/usePackages.ts
import { useEffect, useState } from "react";
import type { Package } from "@/services/packages";

type State<T> = { data: T[]; loading: boolean; error: string | null };

let cache: Package[] | null = null;

export function usePackages() {
  const [state, setState] = useState<State<Package>>({
    data: cache ?? [],
    loading: cache === null,
    error: null,
  });

  useEffect(() => {
    if (cache !== null) return;
    fetch("/api/packages")
      .then((r) => { if (!r.ok) throw new Error("Error fetching packages"); return r.json() as Promise<Package[]>; })
      .then((data) => { cache = data; setState({ data, loading: false, error: null }); })
      .catch((err) => setState({ data: [], loading: false, error: err.message }));
  }, []);

  return state;
}