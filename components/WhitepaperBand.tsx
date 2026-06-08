"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

/**
 * Prominent whitepaper CTA band. Sits between the Showcase and the FAQ.
 * Reads as a bond certificate laid on the page: a foil-ruled document
 * card with a serial header, the pitch, a stamped page-count motif, and
 * a single dominant "Read the Whitepaper" action.
 */
export default function WhitepaperBand() {
  const reduced = useReducedMotion();

  return (
    <section id="whitepaper" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      {/* atmospheric foil glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 60% at 50% 24%, rgba(201,169,97,0.10) 0%, rgba(201,169,97,0) 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-6 lg:px-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-foil/25 bg-ink-deep/60 shadow-certificate"
          style={{ borderRadius: 3 }}
        >
          {/* serial header */}
          <div className="flex items-center justify-between border-b border-foil/15 px-7 py-4 lg:px-10">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.36em] text-foil/80">
              The Whitepaper
            </span>
            <span className="num font-mono text-[9.5px] uppercase tracking-[0.3em] text-parchment/40">
              v1.0 · MMXXVI
            </span>
          </div>

          <div className="grid grid-cols-12 items-center gap-x-10 gap-y-10 px-7 py-12 lg:px-10 lg:py-16">
            {/* left: pitch */}
            <div className="col-span-12 lg:col-span-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-foil/75">
                The full design
              </p>
              <h2
                className="mt-4 font-display font-medium text-parchment"
                style={{
                  fontSize: "clamp(34px, 4.6vw, 60px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.022em",
                  maxWidth: "16ch",
                }}
              >
                Read how the{" "}
                <span className="italic text-foil-gradient" style={{ fontWeight: 400 }}>
                  curve
                </span>{" "}
                is built.
              </h2>
              <p
                className="mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-parchment/65"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                The mechanism, the architecture, the push topology that made
                yield accrual work under Soroban{"'"}s reentry ban, the security
                model, and the mainnet beta posture. Nine parts, about eighteen
                minutes, no marketing.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/whitepaper"
                  className="group inline-flex h-12 items-center gap-3 border border-foil bg-foil px-7 font-mono text-[11px] uppercase tracking-[0.28em] text-ink transition-all duration-300 hover:bg-foil-deep hover:border-foil-deep"
                  style={{ borderRadius: 2 }}
                >
                  <span>Read the Whitepaper</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/agnij-dutta/strate-protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-parchment/55 underline decoration-foil/40 underline-offset-4 transition-colors hover:text-foil"
                >
                  Or read the contracts
                </Link>
              </div>
            </div>

            {/* right: stamped contents motif */}
            <div className="col-span-12 lg:col-span-4">
              <div className="border-l border-foil/15 pl-7 lg:pl-9">
                <ol className="space-y-2.5">
                  {[
                    "The Idea, From Zero",
                    "The Mechanism",
                    "System Architecture",
                    "Why Stellar, Why Now",
                    "Worked Examples",
                    "Security & Risks",
                    "Mainnet Beta Posture",
                    "Roadmap",
                    "Glossary",
                  ].map((t, i) => (
                    <li key={t} className="flex items-baseline gap-3">
                      <span className="num font-mono text-[9px] tabular-nums tracking-widest text-foil/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-[13px] leading-snug text-parchment/60"
                        style={{ fontFamily: "var(--font-fraunces), serif" }}
                      >
                        {t}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
