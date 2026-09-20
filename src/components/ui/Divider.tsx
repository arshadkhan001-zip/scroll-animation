/** Hairline rule. Accent variant for emphasis breaks. */
export default function Divider({ accent = false, className = "" }: { accent?: boolean; className?: string }) {
  return <hr aria-hidden className={`${accent ? "divider-accent" : "divider"} ${className}`.trim()} />;
}
