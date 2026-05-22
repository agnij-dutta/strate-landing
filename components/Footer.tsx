"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "./WaitlistForm";
import Wordmark from "./Wordmark";

type Props = { position: number };

/**
 * Footer IS the closing CTA. No 4-column nav grid. Just:
 *   - Eyebrow
 *   - Headline "The gateway to decentralized yield."
 *   - Right column: blurb + CTAs
 *   - Faded gauge image on the right (atmospheric)
 *   - Hairline + 1,247 on the waitlist line
 *   - Bottom: wordmark + tiny legal + socials, single thin row
 */
export default function Footer({ position }: Props) {
  const reduced = useReducedMotion();

  return (
    <footer
      id="waitlist"
      className="relative overflow-hidden border-t border-parchment/8 bg-ink-deep"
    >
      {/* Faded gauge image, contained to upper-right of CTA half only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 lg:block"
      >
        <div className="relative h-full w-full">
          <Image
            src="/gauge.png"
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
            style={{ opacity: 0.32 }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--ink-deep) 0%, rgba(7,24,47,0.85) 30%, rgba(7,24,47,0.55) 60%, rgba(7,24,47,0.30) 100%)",
            }}
          />
        </div>
      </div>

      {/* Atmospheric foil glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 50% at 22% 30%, rgba(201,169,97,0.10) 0%, rgba(201,169,97,0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Editorial colophon. Matches the section-opener pattern elsewhere */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex items-baseline gap-4 font-mono text-[10px] uppercase tracking-[0.36em] text-foil/80"
        >
          <span>§ 04</span>
          <span className="block h-px flex-1 bg-foil/15" />
          <span className="text-parchment/40">The gateway</span>
        </motion.div>

        {/* Headline + CTA */}
        <div className="grid grid-cols-12 items-end gap-x-10 gap-y-14">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 font-display font-medium text-parchment lg:col-span-8"
            style={{
              fontSize: "clamp(46px, 7.2vw, 112px)",
              lineHeight: 0.94,
              letterSpacing: "-0.025em",
              maxWidth: "16ch",
            }}
          >
            The gateway to{" "}
            <span className="italic text-foil-gradient" style={{ fontWeight: 400 }}>
              decentralized yield.
            </span>
          </motion.h2>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 lg:col-span-4"
          >
            <p
              className="max-w-[40ch] text-[17px] leading-[1.6] text-parchment/65"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Strate brings Pendle-style yield markets to Stellar. Built for RWAs. Built for composability. Built for you.
            </p>
            <div className="mt-10">
              <WaitlistForm />
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.32em] text-parchment/40">
                Testnet Q3 2026 ·{" "}
                <Link
                  href="#docs"
                  className="text-parchment/55 underline decoration-foil/40 underline-offset-4 transition-colors hover:text-foil"
                >
                  Read docs
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hairline + waitlist status row */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 flex items-center gap-4 border-t border-parchment/10 pt-6"
        >
          <span aria-hidden="true" className="block h-1.5 w-1.5 bg-foil" />
          <span className="num font-mono text-[10px] uppercase tracking-[0.28em] text-parchment/55">
            {position.toLocaleString("en-US")} on the waitlist · audit in progress · non-custodial
          </span>
        </motion.div>

        {/* Signature: a hand-set "Written by" line. Editorial touch that
            colophon-loving magazine readers expect. */}
        <div className="mt-16 grid grid-cols-12 items-end gap-x-10 gap-y-8 border-t border-parchment/8 pt-10">
          <div className="col-span-12 flex items-center gap-5 lg:col-span-5">
            <Wordmark size={32} color="parchment" />
            <span
              className="italic text-parchment/40"
              style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 14 }}
            >
              et alia
            </span>
          </div>

          <p
            className="col-span-12 max-w-prose text-[13px] leading-[1.7] text-parchment/45 lg:col-span-5"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Strate is non-custodial software in pre-mainnet. Smart contracts carry risk.
            Yields shown are observed, not guaranteed. Audit by{" "}
            <span className="text-parchment/65">OtterSec</span> in progress; report
            will be published before mainnet.
          </p>

          <div className="col-span-12 flex items-center gap-5 lg:col-span-2 lg:justify-end">
            <Link
              href="https://x.com/strate_xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-parchment/55 transition-colors hover:text-foil"
            >
              X
            </Link>
            <Link href="#" className="font-mono text-[10px] uppercase tracking-[0.28em] text-parchment/55 transition-colors hover:text-foil">
              Github
            </Link>
            <Link href="#" className="font-mono text-[10px] uppercase tracking-[0.28em] text-parchment/55 transition-colors hover:text-foil">
              Discord
            </Link>
          </div>
        </div>

        {/* Colophon line at the very bottom, tiny */}
        <p className="mt-10 font-mono text-[9.5px] uppercase tracking-[0.36em] text-parchment/25">
          Set in Fraunces &amp; JetBrains Mono · MMXXVI · Made between meetings in San Francisco and Bengaluru
        </p>
      </div>
    </footer>
  );
}
