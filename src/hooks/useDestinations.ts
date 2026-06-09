import { useEffect, useState } from "react";
import type { Destination } from "@/services/destinations";

type State = {
  data: Destination[];
  loading: boolean;
  error: string | null;
};

let cache: Destination[] | null = null;

export function useDestinations() {
  const [state, setState] = useState<State>({
    data: cache ?? [],
    loading: cache === null,
    error: null,
  });

  useEffect(() => {
    if (cache !== null) return;

    fetch("/api/destinations")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching destinations");
        return res.json() as Promise<Destination[]>;
      })
      .then((data) => {
        cache = data;
        setState({ data, loading: false, error: null });
      })
      .catch((err) => setState({ data: [], loading: false, error: err.message }));
  }, []);

  return state;
}