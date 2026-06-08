"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

/**
 * The "alive" element: a live-styled market card visualizing the core
 * idea. PT rises toward par, YT decays to zero, and the two always sum
 * to one underlying. This is yield stripping drawn as a curve, the
 * Strate analog of a distribution-market bell curve.
 *
 * Curves are computed deterministically at module scope (no Date, no
 * random) so the render is stable. PT discount follows a continuous
 * yield model P(tau) = exp(-r * tau) over the remaining tenor; YT is
 * the residual 1 - P. Time runs left (today) to right (maturity).
 */

const W = 640;
const H = 300;
const PAD_L = 16;
const PAD_R = 16;
const PAD_T = 28;
const PAD_B = 28;
const N = 64;

// Implied rate and tenor for the illustrative XLM market.
const R = 0.052; // 5.2% implied
const TENOR_YEARS = 0.5; // ~6 months at launch

// y maps a price in [0,1] (well, [0.9,1.0] zoomed) to the plot band.
// We zoom the visible band to [0.90, 1.00] so the PT rise reads clearly,
// and draw YT on its own small-magnitude band mirrored at the bottom.
const PT_TOP = 0.9; // bottom of PT band shows 0.90
const plotW = W - PAD_L - PAD_R;
const plotH = H - PAD_T - PAD_B;

function ptAt(frac: number): number {
  // frac: 0 = today, 1 = maturity. tau shrinks to 0.
  const tau = TENOR_YEARS * (1 - frac);
  return Math.exp(-R * tau); // approaches 1.0 at maturity
}

function xAt(frac: number) {
  return PAD_L + frac * plotW;
}
// PT band: price 0.90..1.00 mapped to plot top..bottom-ish (upper 70%).
function yPt(price: number) {
  const t = (price - PT_TOP) / (1 - PT_TOP); // 0..1
  // upper region: from 86% down to 14% of plot height
  return PAD_T + (1 - t) * (plotH * 0.72) + plotH * 0.04;
}
// YT band: value 0..0.10 mapped to lower strip so it reads as "decaying
// to zero" along the floor.
function yYt(value: number) {
  const t = value / (1 - PT_TOP); // 0..1 over 0..0.10
  return PAD_T + plotH - t * (plotH * 0.24);
}

function buildPath(points: { x: number; y: number }[]) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

const samples = Array.from({ length: N + 1 }, (_, i) => {
  const frac = i / N;
  const pt = ptAt(frac);
  const yt = 1 - pt;
  return { frac, pt, yt };
});

const ptPath = buildPath(samples.map((s) => ({ x: xAt(s.frac), y: yPt(s.pt) })));
const ytPath = buildPath(samples.map((s) => ({ x: xAt(s.frac), y: yYt(s.yt) })));
// Area under PT down to the par line, for a faint fill.
const parY = yPt(1);
const ptArea =
  buildPath(samples.map((s) => ({ x: xAt(s.frac), y: yPt(s.pt) }))) +
  ` L${xAt(1).toFixed(1)} ${parY.toFixed(1)} L${xAt(0).toFixed(1)} ${parY.toFixed(1)} Z`;

const launch = samples[0];
const APP_MARKET = "https://strate-app.vercel.app/markets/xlm-2026-12";

export default function MarketWidget() {
  const reduced = useReducedMotion();

  return (
    <section className="relative bg-ink py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1100px] px-6 lg:px-10">
        {/* Section opener */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-foil/75">
            One asset, two futures
          </p>
          <h2
            className="mt-4 font-display font-medium text-parchment"
            style={{
              fontSize: "clamp(34px, 5vw, 68px)",
              lineHeight: 1.0,
              letterSpacing: "-0.024em",
              maxWidth: "20ch",
            }}
          >
            Yield was never{" "}
            <span className="italic text-foil-gradient" style={{ fontWeight: 400 }}>
              inseparable.
            </span>
          </h2>
        </motion.div>

        {/* The card */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border border-foil/25 bg-ink-deep/70 shadow-certificate"
          style={{ borderRadius: 3 }}
        >
          {/* card top bar */}
          <div className="flex items-center justify-between border-b border-foil/15 px-5 py-3 lg:px-7">
            <span className="flex items-center gap-2.5 font-mono text-[9.5px] uppercase tracking-[0.3em] text-parchment/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-strate/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-strate" />
              </span>
              Live · XLM-2026-12
            </span>
            <span className="num font-mono text-[9.5px] uppercase tracking-[0.28em] text-parchment/40">
              Mainnet · Matures Dec 2026
            </span>
          </div>

          {/* question + chart */}
          <div className="px-5 pb-5 pt-6 lg:px-7">
            <p
              className="text-[18px] text-parchment/90"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              What is principal worth without its yield?
            </p>

            <div className="relative mt-5">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full"
                role="img"
                aria-label="PT rising toward par while YT decays to zero over the life of the market."
              >
                {/* par line at 1.00 */}
                <line
                  x1={PAD_L}
                  x2={W - PAD_R}
                  y1={parY}
                  y2={parY}
                  stroke="rgba(245,241,232,0.18)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <text
                  x={W - PAD_R}
                  y={parY - 6}
                  textAnchor="end"
                  className="num"
                  fill="rgba(245,241,232,0.45)"
                  style={{ font: "500 10px var(--font-jetbrains), monospace", letterSpacing: "0.1em" }}
                >
                  PAR · 1.00
                </text>

                {/* faint PT fill */}
                <motion.path
                  d={ptArea}
                  fill="rgba(201,169,97,0.10)"
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />

                {/* YT decay curve */}
                <motion.path
                  d={ytPath}
                  fill="none"
                  stroke="rgba(245,241,232,0.55)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                />

                {/* PT rise curve */}
                <motion.path
                  d={ptPath}
                  fill="none"
                  stroke="#C9A961"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                />

                {/* curve labels */}
                <text
                  x={xAt(0.5)}
                  y={yPt(ptAt(0.5)) - 12}
                  className="num"
                  fill="#C9A961"
                  style={{ font: "500 11px var(--font-jetbrains), monospace", letterSpacing: "0.08em" }}
                >
                  PT → par
                </text>
                <text
                  x={xAt(0.5)}
                  y={yYt(1 - ptAt(0.5)) + 18}
                  className="num"
                  fill="rgba(245,241,232,0.6)"
                  style={{ font: "500 11px var(--font-jetbrains), monospace", letterSpacing: "0.08em" }}
                >
                  YT → 0
                </text>

                {/* today / maturity ticks */}
                <text
                  x={PAD_L}
                  y={H - 8}
                  fill="rgba(245,241,232,0.4)"
                  style={{ font: "500 9px var(--font-jetbrains), monospace", letterSpacing: "0.12em" }}
                >
                  TODAY
                </text>
                <text
                  x={W - PAD_R}
                  y={H - 8}
                  textAnchor="end"
                  fill="rgba(245,241,232,0.4)"
                  style={{ font: "500 9px var(--font-jetbrains), monospace", letterSpacing: "0.12em" }}
                >
                  MATURITY
                </text>
              </svg>
            </div>
          </div>

          {/* stat strip */}
          <div className="grid grid-cols-2 border-t border-foil/15 sm:grid-cols-4">
            <Stat label="Implied APY" value="5.21%" accent />
            <Stat label="PT price" value={launch.pt.toFixed(4)} />
            <Stat label="YT price" value={launch.yt.toFixed(4)} />
            <Stat label="Maturity" value="2026-12-06" />
          </div>

          {/* footer action */}
          <Link
            href={APP_MARKET}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border-t border-foil/15 px-5 py-4 transition-colors hover:bg-foil/[0.05] lg:px-7"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-parchment/55 transition-colors group-hover:text-parchment">
              Open this market on mainnet
            </span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 12 12"
              fill="none"
              className="text-foil transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </Link>
        </motion.div>

        {/* three-column gloss, Kaido-style */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3">
          <Gloss
            label="The split"
            title="Principal is a shape."
            body="Buy PT below par and hold to maturity. The discount is your fixed return, locked the instant you click. The closest thing on-chain to a zero-coupon bond."
          />
          <Gloss
            label="The yield"
            title="Yield is a bet."
            body="Buy YT when the curve underprices yield. Capture every payment until maturity, with leverage on the rate and your downside capped at what you paid."
          />
          <Gloss
            label="The sum"
            title="Always whole."
            body="One PT plus one YT is always one underlying before maturity. Recombine anytime to redeem. The conservation law holds at every block."
          />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border-r border-foil/10 px-5 py-4 last:border-r-0 lg:px-7">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-parchment/45">
        {label}
      </p>
      <p
        className={`num mt-1.5 text-[20px] ${accent ? "text-foil" : "text-parchment/90"}`}
        style={{ fontFamily: "var(--font-jetbrains), monospace" }}
      >
        {value}
      </p>
    </div>
  );
}

function Gloss({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="font-mono text-[9.5px] uppercase tracking-[0.32em] text-foil/70">
        {label}
      </p>
      <h3
        className="mt-3 font-display text-[22px] text-parchment"
        style={{ letterSpacing: "-0.01em" }}
      >
        {title}
      </h3>
      <p
        className="mt-2.5 text-[14.5px] leading-[1.6] text-parchment/60"
        style={{ fontFamily: "var(--font-fraunces), serif" }}
      >
        {body}
      </p>
    </div>
  );
}
