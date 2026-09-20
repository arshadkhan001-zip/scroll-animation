import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { reveal } from "../lib/motion";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}

/** Single restrained scroll reveal. Respects reduced motion (stays visible). */
export default function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return reveal(el, { delay });
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
