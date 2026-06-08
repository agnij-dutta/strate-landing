"use client";

import { useEffect, useState } from "react";
import { TOC } from "./toc";

/**
 * Sticky left rail. Mirrors the bond-certificate "Contents" block:
 * a foil-ruled header, then a numbered index that highlights the
 * section currently in view via an IntersectionObserver scroll-spy.
 *
 * Reading-progress hairline at the very top tracks scroll depth.
 */
export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>(TOC[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // The topmost section intersecting the upper third of the
        // viewport wins. Sorting by boundingClientRect.top keeps the
        // active row stable when several sections are on screen.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Trigger band sits in the top third of the viewport.
      { rootMargin: "-12% 0px -70% 0px", threshold: 0 },
    );

    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
