import type { ReactNode } from "react";

/** Small uppercase technical label. Accent variant uses the
    contrast-safe ember-soft on dark surfaces. */
export default function Label({
  children,
  accent = false,
  className = "",
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return <p className={`${accent ? "eyebrow-accent" : "eyebrow"} ${className}`.trim()}>{children}</p>;
}
