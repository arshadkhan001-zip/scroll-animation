import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

interface Base {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonProps = Base &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = Base &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const VARIANTS: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

/** Foundation button. Primary = solid ember, secondary = solid bone, ghost = outline. */
export default function Button(props: ButtonProps | AnchorProps) {
  const { variant = "primary", size = "md", className = "", children, ...rest } = props;
  const cls = `btn ${VARIANTS[variant]} ${size === "sm" ? "btn-sm" : ""} ${className}`.trim();
  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as AnchorProps;
    return (
      <a href={href} className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
