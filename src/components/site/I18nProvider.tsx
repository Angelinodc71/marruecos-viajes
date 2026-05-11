"use client";
import { useEffect, useState } from "react";
import "@/lib/i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  // Render immediately to avoid hydration mismatch; i18n initializes client-side
  return <>{children}</>;
}
