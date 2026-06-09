import { useEffect, useState } from "react";
import type { Experience } from "@/services/experiences";

type State = { data: Experience[]; loading: boolean; error: string | null };

let cache: Experience[] | null = null;

export function useExperiences() {
  const [state, setState] = useState<State>({
    data: cache ?? [],
    loading: cache === null,
    error: null,
  });

  useEffect(() => {
    if (cache !== null) return;
    fetch("/api/experiences")
      .then((r) => { if (!r.ok) throw new Error("Error fetching experiences"); return r.json() as Promise<Experience[]>; })
      .then((data) => { cache = data; setState({ data, loading: false, error: null }); })
      .catch((err) => setState({ data: [], loading: false, error: err.message }));
  }, []);

  return state;
}