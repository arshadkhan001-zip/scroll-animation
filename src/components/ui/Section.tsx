import type { ReactNode } from "react";
import Container from "./Container";

interface Props {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  tone?: "cinematic" | "editorial" | "readable";
  theme?: "dark" | "light";
  large?: boolean;
  children: ReactNode;
  className?: string;
}

/** Section scaffold: consistent rhythm + container + optional kicker/title.
    Dark cinematic by default; theme="light" enables the warm editorial surface. */
export default function Section({
  id,
  eyebrow,
  title,
  tone = "editorial",
  theme = "dark",
  large = false,
  children,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      aria-label={eyebrow ?? id}
      data-theme={theme === "light" ? "light" : undefined}
      className={`${large ? "section-lg" : "section"} ${
        theme === "light" ? "bg-cream text-ink" : ""
      } ${className}`.trim()}
    >
      <Container tone={tone}>
        {eyebrow && <p className={theme === "light" ? "label" : "eyebrow"}>{eyebrow}</p>}
        {title && <h2 className="heading-xl mt-3">{title}</h2>}
        {children}
      </Container>
    </section>
  );
}
