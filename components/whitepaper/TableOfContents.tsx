"use client";

import { TOC } from "./toc";
import { useActiveSection } from "./useActiveSection";

/**
 * Sticky left rail (desktop). Mirrors the bond-certificate "Contents"
 * block: a foil-ruled header, then a numbered index that highlights the
 * section currently in view, plus a reading-progress hairline. Scroll-
 * spy state is shared with the mobile bar via useActiveSection.
 */
export default function TableOfContents() {
  const { activeId, progress } = useActiveSection();

  return (
    <nav
      aria-label="Whitepaper contents"
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.36em] text-foil/80">
          Contents
        </span>
        <span className="h-px flex-1 rule-foil" />
      </div>

      {/* reading progress */}
      <div className="mb-6 h-px w-full bg-parchment/10">
        <div
          className="h-px bg-foil transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <ol className="space-y-1.5">
        {TOC.map((entry, i) => {
          const active = entry.id === activeId;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={`group flex items-baseline gap-3 py-1 transition-colors duration-200 ${
                  active ? "text-foil" : "text-parchment/45 hover:text-parchment/80"
                }`}
              >
                <span className="num font-mono text-[9px] tabular-nums tracking-widest opacity-70">
                  {String(i).padStart(2, "0")}
                </span>
                <span
                  className="text-[12.5px] leading-snug"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  {entry.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
