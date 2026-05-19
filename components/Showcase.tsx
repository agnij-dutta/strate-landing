"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type Card = {
  n: string;
  title: string;
  problem: string;
  body: string;
  detail: string;
  image: string;
  imageAlt: string;
  accent: string;
};

const cards: Card[] = [
  {
    n: "01",
    title: "Strip",
    problem: "Yield is trapped inside the wrapper.",
    body: "Tokenized treasuries accrue yield on Stellar today, but that yield cannot leave the asset. Strate cleaves the bond along its perforation: principal on one side, yield on the other.",
    detail:
      "Each becomes a freely tradeable token from the moment of the split. The contract is a Soroban primitive. Single transaction in, two SEP-41 tokens out. Recombine anytime before maturity to redeem the original.",
    image: "/split.png",
    imageAlt: "Macro of a perforated bond paper torn along its center.",
    accent: "Strate primitive · PT + YT",
  },
  {
    n: "02",
    title: "Lock",
    problem: "No fixed rates on Stellar today.",
    body: "Buy PT at a discount to par. Hold to maturity. Redeem one-for-one against the underlying. The return is fixed the instant you click.",
    detail:
      "No rate exposure, no surprises. The closest thing on-chain to a zero-coupon bond. Useful for treasuries that need a known payout date, lending desks that need duration to match liabilities, and traders who want to lock a rate when the curve looks rich.",
    image: "/pt-card.png",
    imageAlt: "A brass padlock with a parchment tag inscribed 1.00.",
    accent: "Principal Token · PT",
  },
  {
    n: "03",
    title: "Stream",
    problem: "No way to take a directional view on rates.",
    body: "Buy YT when the curve underprices yield. Capture every payment the underlying earns until maturity. Rates rise, you win. Rates fall, you take the loss without ever touching principal.",
    detail:
      "Yield exposure without buying the bond. Implied leverage on rates with bounded downside. Settle in stable terms, sell anytime the pool has depth. The instrument that the existing Stellar RWA stack has never had.",
    image: "/yt-card.png",
    imageAlt: "Fine gold dust streaming diagonally through a dark frame.",
    accent: "Yield Token · YT",
  },
];

export default function Showcase() {
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="markets" className="relative py-24 lg:py-32">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Editorial section opener. Asymmetric: tiny date-stamp top, then a
            magazine-style display headline that breaks the column rhythm. */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-3 flex items-baseline gap-4 font-mono text-[10px] uppercase tracking-[0.36em] text-foil/80"
        >
          <span>§ 02</span>
          <span className="block h-px flex-1 bg-foil/15" />
          <span className="text-parchment/40">Filed · MAY 2026</span>
        </motion.div>

        <div className="mb-14 grid grid-cols-12 items-end gap-x-10 gap-y-6 lg:mb-20">
          <div className="col-span-12 lg:col-span-8">
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 28, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-medium text-parchment"
              style={{
                fontSize: "clamp(38px, 5.5vw, 84px)",
                lineHeight: 0.96,
                letterSpacing: "-0.024em",
                maxWidth: "20ch",
              }}
            >
              <span className="num text-foil-gradient">$2B</span> of yield, locked.{" "}
              <span className="italic text-parchment/55" style={{ fontWeight: 400 }}>
                Three things you can do once we unbundle it.
              </span>
            </motion.h2>
          </div>

          {/* Right column with a drop cap on the body paragraph */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="col-span-12 lg:col-span-4"
          >
            <p
              className="dropcap text-[15px] leading-[1.65] text-parchment/65"
              style={{ fontFamily: "var(--font-fraunces), serif", maxWidth: "44ch" }}
            >
              Stellar has $2 billion in tokenized real-world assets.<sup className="ml-0.5 text-[10px] font-mono text-foil/80">1</sup> Every dollar of that yield is trapped inside the wrapper that issued it. Strate splits the bond into Principal Tokens and Yield Tokens. The three primitives below are what that unlock enables.
            </p>

            {/* Hanging citation. Editorial detail. */}
            <p className="mt-5 font-mono text-[10px] leading-[1.6] tracking-[0.04em] text-parchment/35">
              <span className="text-foil/70">1.</span> Messari, <em className="not-italic underline decoration-parchment/20 underline-offset-2">State of Stellar, Q1 2026</em>. RWA total includes Franklin BENJI, WisdomTree WTGXX, MoneyGram corridors, and Blend bUSDC pools.
            </p>
          </motion.div>
        </div>

        {/* Grid with click-to-expand. LayoutGroup syncs the layout transitions across all cards. */}
        <LayoutGroup id="showcase">
          <motion.div
            layout
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
            }}
            className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-4 lg:gap-5"
            transition={{ layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          >
            {cards.map((c, i) => (
              <FlipCard
                key={c.n}
                card={c}
                isExpanded={expanded === i}
                anyExpanded={expanded !== null}
                onToggle={() => setExpanded(expanded === i ? null : i)}
                reduced={!!reduced}
              />
            ))}
          </motion.div>
        </LayoutGroup>

        {/* Helper line below grid */}
        <p className="mt-8 flex items-center justify-between border-t border-parchment/8 pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-parchment/40">
            Click a card to expand · click again to collapse
          </span>
          <span className="num font-mono text-[10px] uppercase tracking-[0.32em] text-foil">
            {expanded !== null ? `0${expanded + 1} / 03` : "03 / 03"}
          </span>
        </p>
      </div>
    </section>
  );
}

/* ====================== One card ====================== */

function FlipCard({
  card,
  isExpanded,
  anyExpanded,
  onToggle,
  reduced,
}: {
  card: Card;
  isExpanded: boolean;
  anyExpanded: boolean;
  onToggle: () => void;
  reduced: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-200, 200], [4, -4]), {
    stiffness: 150,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, [-200, 200], [-4, 4]), {
    stiffness: 150,
    damping: 22,
  });

  function onMove(e: React.MouseEvent) {
    if (reduced || isExpanded) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  // When another card is expanded, this one fully collapses out of the grid.
  const hidden = anyExpanded && !isExpanded;

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {!hidden && (
        <motion.article
          ref={ref}
          layout
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onClick={onToggle}
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
          style={{
            rotateX: reduced || isExpanded ? 0 : rx,
            rotateY: reduced || isExpanded ? 0 : ry,
            transformPerspective: 1200,
            gridColumn: isExpanded ? "1 / -1" : "auto",
          }}
          transition={{
            layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            default: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className={`group relative flex cursor-pointer flex-col overflow-hidden border bg-ink-deep transition-colors duration-500 ${
            isExpanded
              ? "border-foil/60 shadow-[0_24px_80px_-24px_rgba(201,169,97,0.40)]"
              : "border-parchment/12 hover:border-foil/50"
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle();
            }
          }}
        >
      {/* Foil corner accent */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-20 h-12 w-12"
        animate={{ opacity: isExpanded ? 1 : 0 }}
        whileHover={!isExpanded ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4 }}
      >
        <span className="absolute right-3 top-3 h-px w-7 bg-foil" />
        <span className="absolute right-3 top-3 h-7 w-px bg-foil" />
      </motion.div>

      {/* Foil radial glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        animate={{ opacity: isExpanded ? 1 : 0 }}
        whileHover={!isExpanded ? { opacity: 1 } : undefined}
        transition={{ duration: 0.7 }}
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,169,97,0.18) 0%, rgba(201,169,97,0) 70%)",
        }}
      />

      {/* Image */}
      <motion.div
        layout
        className={`relative w-full overflow-hidden ${isExpanded ? "h-72 lg:h-96" : "h-44 sm:h-52"}`}
        transition={{ layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
      >
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes={isExpanded ? "100vw" : "(min-width: 768px) 33vw, 100vw"}
          className={`object-cover transition-transform duration-1000 ease-out ${
            isExpanded ? "scale-105" : "group-hover:scale-[1.06]"
          }`}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,24,47,0.10) 0%, rgba(7,24,47,0) 30%, rgba(7,24,47,0) 60%, rgba(7,24,47,0.9) 100%)",
          }}
        />
        <span
          className="num absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.32em] text-foil"
          style={{ textShadow: "0 1px 0 rgba(0,0,0,0.6)" }}
        >
          {card.n}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div layout className="relative z-[2] flex flex-1 flex-col gap-4 p-6 lg:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foil/85">
          {card.problem}
        </p>

        <motion.h3
          layout
          className="font-display font-medium text-parchment"
          style={{
            fontSize: isExpanded ? "clamp(40px, 4.5vw, 64px)" : "clamp(28px, 2.6vw, 40px)",
            lineHeight: 1.0,
            letterSpacing: "-0.018em",
            transition: "font-size 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <span className="relative inline-block">
            {card.title}
            <span
              aria-hidden="true"
              className={`absolute -bottom-1 left-0 block h-[2px] w-full origin-left bg-foil transition-transform duration-700 ease-out ${
                isExpanded ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </span>
        </motion.h3>

        <p
          className="text-[14.5px] leading-[1.6] text-parchment/70"
          style={{ fontFamily: "var(--font-fraunces), serif" }}
        >
          {card.body}
        </p>

        {/* Expanded extra content fades in */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div aria-hidden="true" className="h-px w-32 bg-foil" />
              <p
                className="text-[15px] leading-[1.65] text-parchment/65"
                style={{ fontFamily: "var(--font-fraunces), serif", maxWidth: "60ch" }}
              >
                {card.detail}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foil">
                {card.accent}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer row */}
        <div className="mt-auto flex items-center justify-between border-t border-parchment/10 pt-5">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.32em] text-parchment/40">
            {isExpanded ? "Collapse" : `Primitive ${card.n}`}
          </span>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-foil">
            {isExpanded ? "Close" : "Open"}
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              className={`transition-transform duration-500 ${isExpanded ? "rotate-45" : "rotate-0"}`}
            >
              <path
                d="M6 2v8M2 6h8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </div>
      </motion.div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}
