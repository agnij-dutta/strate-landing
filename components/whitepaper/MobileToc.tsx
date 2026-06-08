"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TOC } from "./toc";
import { useActiveSection } from "./useActiveSection";

/**
 * Mobile Contents bar. Shown below lg. Sticks under the top nav as a
 * compact strip showing the current section, with a foil reading-
 * progress hairline along its bottom edge. Tapping expands the full
 * index; choosing a section scrolls and collapses.
 *
 * Placed as the first child of the article so its sticky containing
 * block is the full document height and it tracks the whole scroll.
 */
export default function MobileToc() {
  const { activeId, progress } = useActiveSection();
  const [open, setOpen] = useState(false);

  const activeIndex = Math.max(0, TOC.findIndex((t) => t.id === activeId));
  const active = TOC[activeIndex] ?? TOC[0];

  return (
    <div className="sticky top-14 z-40 -mx-6 mb-10 border-y border-foil/15 bg-ink/90 backdrop-blur-xl sm:-mx-0 sm:rounded-[3px] sm:border-x lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-3.5 text-left"
      >
        <span className="flex min-w-0 items-baseline gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foil/75">
            Contents
          </span>
          <span
            className="truncate text-[14px] text-parchment/85"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            {active?.title}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="num font-mono text-[9px] tabular-nums tracking-widest text-parchment/40">
            {String(activeIndex).padStart(2, "0")} / {String(TOC.length - 1).padStart(2, "0")}
          </span>
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            className={`text-foil transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
          </svg>
        </span>
      </button>

      {/* progress hairline */}
      <div className="h-px w-full bg-parchment/10">
        <div
          className="h-px bg-foil transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ol
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-parchment/10"
          >
            <div className="max-h-[60vh] overflow-y-auto px-6 py-3">
              {TOC.map((entry, i) => {
                const isActive = entry.id === activeId;
                return (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-baseline gap-3 py-2 transition-colors ${
                        isActive ? "text-foil" : "text-parchment/55"
                      }`}
                    >
                      <span className="num font-mono text-[9px] tabular-nums tracking-widest opacity-70">
                        {String(i).padStart(2, "0")}
                      </span>
                      <span
                        className="text-[14px] leading-snug"
                        style={{ fontFamily: "var(--font-fraunces), serif" }}
                      >
                        {entry.title}
                      </span>
                    </a>
                  </li>
                );
              })}
            </div>
          </motion.ol>
        )}
      </AnimatePresence>
    </div>
  );
}
