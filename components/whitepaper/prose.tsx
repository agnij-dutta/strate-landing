import type { ReactNode } from "react";

/**
 * Typographic primitives for the whitepaper body. Editorial, bond-
 * certificate register: Fraunces serif for prose, JetBrains Mono for
 * kickers and code, foil-gold rules and accents. No em dashes anywhere
 * in copy, per house style.
 */

export function PartHeading({
  id,
  kicker,
  title,
}: {
  id: string;
  kicker: string;
  title: string;
}) {
  return (
    <header id={id} className="scroll-mt-28 pt-4">
      <div className="mb-4 flex items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.36em] text-foil/80">
          {kicker}
        </span>
        <span className="h-px flex-1 rule-foil" />
      </div>
      <h2
        className="font-display font-medium text-parchment"
        style={{
          fontSize: "clamp(30px, 4vw, 46px)",
          lineHeight: 1.04,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
    </header>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3
      className="mt-12 font-display text-[22px] font-medium text-parchment"
      style={{ letterSpacing: "-0.012em", lineHeight: 1.18 }}
    >
      {children}
    </h3>
  );
}

export function P({
  children,
  dropcap = false,
}: {
  children: ReactNode;
  dropcap?: boolean;
}) {
  return (
    <p
      className={`mt-5 text-[16.5px] leading-[1.72] text-parchment/78 ${
        dropcap ? "dropcap" : ""
      }`}
      style={{ fontFamily: "var(--font-fraunces), serif" }}
    >
      {children}
    </p>
  );
}

export function Em({ children }: { children: ReactNode }) {
  return <span className="italic text-foil-gradient">{children}</span>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <span className="font-medium text-parchment">{children}</span>;
}

export function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[2px] bg-ink-deep/70 px-1.5 py-0.5 font-mono text-[13px] text-foil/90">
      {children}
    </code>
  );
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          <span
            aria-hidden="true"
            className="mt-[0.85em] block h-px w-4 shrink-0 bg-foil/55"
          />
          <span
            className="text-[16px] leading-[1.65] text-parchment/72"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="mt-6 overflow-x-auto rounded-[3px] border border-parchment/10 bg-ink-deep/80 p-5 font-mono text-[13px] leading-[1.7] text-parchment/85">
      <code>{children}</code>
    </pre>
  );
}

export function Callout({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <aside className="mt-6 border-l-2 border-foil/50 bg-foil/[0.05] px-5 py-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-foil/85">
        {label}
      </p>
      <p
        className="mt-2 text-[15px] leading-[1.6] text-parchment/78"
        style={{ fontFamily: "var(--font-fraunces), serif" }}
      >
        {children}
      </p>
    </aside>
  );
}

export function DataTable({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-foil/25">
            {head.map((h, i) => (
              <th
                key={i}
                className="py-2.5 pr-5 font-mono text-[9px] uppercase tracking-[0.28em] text-foil/80"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-parchment/8 align-top">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="py-3 pr-5 text-[14px] leading-[1.55] text-parchment/72"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
