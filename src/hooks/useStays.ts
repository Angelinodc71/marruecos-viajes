import { useEffect, useState } from "react";
import type { Stay } from "@/services/stays";
 
type State = { data: Stay[]; loading: boolean; error: string | null };
 
let cache: Stay[] | null = null;
 
export function useStays() {
  const [state, setState] = useState<State>({
    data: cache ?? [],
    loading: cache === null,
    error: null,
  });
 
  useEffect(() => {
    if (cache !== null) return;
    fetch("/api/stays")
      .then((r) => { if (!r.ok) throw new Error("Error fetching stays"); return r.json() as Promise<Stay[]>; })
      .then((data) => { cache = data; setState({ data, loading: false, error: null }); })
      .catch((err) => setState({ data: [], loading: false, error: err.message }));
  }, []);
 
  return state;
}
 