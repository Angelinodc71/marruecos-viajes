import { useEffect, useState } from "react";

export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return mobile;
}