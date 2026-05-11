import type { SVGProps } from "react";

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ColumnIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 28 V14 a8 8 0 0 1 16 0 V28" />
      <path d="M6 28 H26" />
      <path d="M8 14 H24" />
      <path d="M16 6 V3" />
      <circle cx="16" cy="3" r="0.8" fill="currentColor" />
      <path d="M12 18 V24 M16 18 V24 M20 18 V24" opacity="0.6" />
    </svg>
  );
}

export function TagineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 22 H27" />
      <path d="M7 22 V20 a9 9 0 0 1 18 0 V22" />
      <path d="M16 11 V5" />
      <circle cx="16" cy="4" r="1.2" />
      <path d="M9 28 H23" opacity="0.5" />
    </svg>
  );
}

export function HammamIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M16 4 C12 10 9 13 9 18 a7 7 0 0 0 14 0 C23 13 20 10 16 4 Z" />
      <path d="M12 18 a4 4 0 0 0 4 4" opacity="0.6" />
      <path d="M6 26 c2-1 3-1 5 0" opacity="0.6" />
      <path d="M21 26 c2-1 3-1 5 0" opacity="0.6" />
    </svg>
  );
}

export function CamelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 22 c0-2 2-3 3-3 c1-3 2-5 3-5 c1 0 2 2 2 4 c1-2 3-3 5-3 c2 0 3 2 3 3 c1 0 3 1 3 4" />
      <path d="M22 22 V26" />
      <path d="M8 22 V26" />
      <path d="M14 22 V26" />
      <path d="M18 22 V26" />
      <path d="M22 14 c0-1 1-2 2-2 c0 1 0 2-1 3" />
    </svg>
  );
}

export function LanternIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M16 4 V7" />
      <path d="M12 7 H20" />
      <path d="M11 9 c1-1 9-1 10 0 L19 22 c-2 1-4 1-6 0 Z" />
      <path d="M14 12 V19 M18 12 V19" opacity="0.5" />
      <path d="M13 25 H19" />
      <path d="M16 25 V28" />
    </svg>
  );
}

export function StarTileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M16 4 L19 10 L26 10 L21 14 L23 21 L16 17 L9 21 L11 14 L6 10 L13 10 Z" transform="rotate(0 16 16)" />
      <path d="M16 4 L19 10 L26 10 L21 14 L23 21 L16 17 L9 21 L11 14 L6 10 L13 10 Z" transform="rotate(22.5 16 16)" opacity="0.5" />
    </svg>
  );
}

export function ShieldKeyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M16 4 L26 8 V16 c0 6-4 10-10 12 c-6-2-10-6-10-12 V8 Z" />
      <circle cx="16" cy="14" r="2.5" />
      <path d="M16 16.5 V21" />
      <path d="M14.5 19 H17.5" />
    </svg>
  );
}
