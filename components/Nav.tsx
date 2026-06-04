"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";

const links = [
  { label: "Protocol", href: "#protocol" },
  { label: "Markets",  href: "#markets" },
  { label: "Docs",     href: "#docs" },
];

/**
 * Sticky nav. At scroll=0: fully transparent (no backdrop blur). The hero card's
 * rounded corners read through it cleanly. Only when scrolled past 16px does it
 * solidify with bg-ink/80 + backdrop-blur-xl + foil hairline border.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "border-b border-foil/15 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 transition-all duration-300 lg:px-10 ${
          scrolled ? "h-14 lg:h-16" : "h-16 lg:h-18"
        }`}
      >
        <Link href="#top" className="flex items-center" aria-label="Strate, home">
          <Wordmark size={26} color="parchment" />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-12 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.32em] text-parchment/65 transition-colors duration-200 hover:text-parchment"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
            >
              {l.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-foil transition-all duration-300 group-hover:w-full"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="#waitlist"
            className="hidden font-mono text-[11px] uppercase tracking-[0.28em] text-parchment/55 transition-colors duration-200 hover:text-parchment sm:inline-block"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
          >
            Waitlist
          </Link>
          <Link
            href="https://strate-app.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-10 items-center gap-2.5 border border-foil/40 bg-foil/[0.08] px-5 font-mono text-[11px] uppercase tracking-[0.28em] text-foil backdrop-blur-md transition-all duration-300 hover:border-foil hover:bg-foil hover:text-ink"
            style={{ borderRadius: 2 }}
          >
            <span>Launch App</span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
