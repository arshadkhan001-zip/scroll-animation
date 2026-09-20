import type { ReactNode } from "react";

type Tone = "bleed" | "cinematic" | "editorial" | "readable";

const TONES: Record<Tone, string> = {
  bleed: "wrap-bleed",
  cinematic: "wrap-cinematic",
  editorial: "wrap-editorial",
  readable: "wrap-readable",
};

interface Props {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

/** Responsive container. Hero uses bleed (no container); film sections
    use cinematic; content rows use editorial; copy uses readable. */
export default function Container({ tone = "editorial", children, className = "" }: Props) {
  return <div className={`${TONES[tone]} ${className}`.trim()}>{children}</div>;
}
