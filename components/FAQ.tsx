"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "Is the protocol audited?",
    a: "Audit is in progress with a tier-one Soroban-fluent firm and completes before mainnet. The full report is published the day it is signed. We do not deploy to mainnet without a clean review and a 14-day public bounty window.",
  },
  {
    q: "What is the Soroban-specific risk?",
    a: "Soroban is young. We keep the contract surface small, avoid cross-contract reentrancy paths, gate upgrades behind a 7-day timelock, and cap TVL programmatically for the first 90 days post-launch.",
  },
  {
    q: "Who holds the underlying RWA?",
    a: "Strate is non-custodial. The underlying RWA sits in the issuer wrapper it already uses on Stellar. The Strate contract holds the wrapper and mints PT and YT against it. Redeem at maturity flows directly from the wrapper, not from us.",
  },
  {
    q: "Is mainnet live?",
    a: "Yes — Strate ships an unaudited mainnet beta with a hard 50,000-unit TVL cap per market. XLM and USDC markets launched first, via the Blend V2 Fixed pool. The OtterSec audit is in flight; the report will be published before we raise the cap or add new markets.",
  },
];

export default function FAQ() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="docs" className="relative bg-parchment py-32 text-ledger lg:py-48">
      {/* Foil wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(201,169,97,0.10) 0%, rgba(201,169,97,0) 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 lg:px-10">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 font-mono text-[10px] uppercase tracking-[0.36em] text-strate"
        >
          The fine print
        </motion.p>
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-medium text-ink"
          style={{
            fontSize: "clamp(48px, 6.5vw, 96px)",
            lineHeight: 0.98,
            letterSpacing: "-0.022em",
            maxWidth: "18ch",
          }}
        >
          Questions
          <br />
          <span className="italic text-strate" style={{ fontWeight: 400 }}>
            worth asking.
          </span>
        </motion.h2>

        <ul className="mt-20 divide-y divide-ink/12 border-y border-ink/15">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full cursor-pointer items-start gap-8 py-8 text-left lg:py-10"
                >
                  <span className="num pt-2 font-mono text-[12px] uppercase tracking-[0.32em] text-strate">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="flex-1 font-display font-medium text-ink transition-colors group-hover:text-strate"
                    style={{
                      fontSize: "clamp(22px, 2.4vw, 32px)",
                      letterSpacing: "-0.012em",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-2 flex h-7 w-7 flex-none items-center justify-center border border-ink/25 transition-all duration-300 ${
                      isOpen ? "rotate-45 border-strate bg-strate text-parchment" : "rotate-0 text-ink"
                    }`}
                    style={{ borderRadius: 999 }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      key="content"
                      initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.32, delay: 0.06 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-8 pb-10">
                        <div className="col-span-12 col-start-1 lg:col-span-9 lg:col-start-2">
                          <p
                            className="text-[18px] leading-[1.65] text-ledger/75"
                            style={{ fontFamily: "var(--font-fraunces), serif", maxWidth: "62ch" }}
                          >
                            {item.a}
                          </p>
                          <motion.div
                            initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                            style={{ transformOrigin: "left" }}
                            className="mt-6 h-px w-32 bg-strate"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
